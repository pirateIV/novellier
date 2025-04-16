import { getUserFromToken } from "@/app/shared/utils";
import { defaultGenres } from "@/lib/api/openLibrary";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import User from "@/shared/models/User";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface ReviewPayload {
  reviews: {
    content: string;
    rating: number;
    userId: string;
  }[];
  book: {
    bookId: string;
    author: string;
    authorId: any;
    title: string;
  };
  path?: string;
}

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as ReviewPayload;
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ error: "Token not found" }, { status: 401 });
//   }

  await dbConnect();

  try {
    // const requestingUser = await getUserFromToken(token);
    const { reviews, book, path } = payload;

    // Validate payload
    if (!book.bookId || !book.title || !book.author) {
      return NextResponse.json(
        { error: "Missing required book details" },
        { status: 400 }
      );
    }

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { error: "No reviews provided" },
        { status: 400 }
      );
    }

    for (const review of reviews) {
      if (!review.content || !review.rating || !review.userId) {
        return NextResponse.json(
          { error: "Each review must include content, rating, and userId" },
          { status: 400 }
        );
      }
    }

    // Fetch users for the provided userIds
    const userIds = reviews.map((review) => review.userId);
    const users = await User.find({ _id: { $in: userIds } });

    if (users.length !== reviews.length) {
      return NextResponse.json(
        { error: "One or more user IDs are invalid" },
        { status: 404 }
      );
    }

    // Check if the book exists, create it if not
    let foundBook = await Book.findOne({ bookId: book.bookId });
    let bookGenres: string[] = [];

    if (!foundBook) {
      const bookResponse = await fetch(
        `https://openlibrary.org/works/${book.bookId}.json`
      );
      if (!bookResponse.ok) {
        return NextResponse.json(
          { error: "Failed to fetch book details from Open Library" },
          { status: 400 }
        );
      }
      const bookData = await bookResponse.json();
      bookGenres =
        bookData.subjects
          ?.filter((subject: string) => defaultGenres.includes(subject))
          .slice(0, 3) || [];

      foundBook = await Book.create({
        ...book,
        genres: [],
      });
    } else {
      bookGenres = foundBook.genres || [];
    }

    // Ensure genres exist in Genre collection
    const genreDocs = await Promise.all(
      bookGenres.map(async (genreName: string) => {
        let genreDoc = await mongoose
          .model("Genre")
          .findOne({ genre: genreName });
        if (!genreDoc) {
          genreDoc = await mongoose
            .model("Genre")
            .create({ genre: genreName, total_times_rated: 0 });
        }
        return genreDoc._id;
      })
    );

    // Create reviews for each user
    const createdReviews = [];
    for (const reviewData of reviews) {
      const user = users.find((u) => u._id.toString() === reviewData.userId);
      if (!user) continue; // Shouldn't happen due to prior validation

      // Check for existing review
      const existingReview = await Review.findOne({
        bookId: book.bookId,
        reviewer: user._id,
      });

      if (existingReview) {
        continue; // Skip if user already reviewed this book
      }

      // Create the new review
      const newReview = new Review({
        content: reviewData.content,
        rating: reviewData.rating,
        book: foundBook._id,
        bookId: book.bookId,
        reviewer: user._id,
        genres: genreDocs,
      });
      await newReview.save();

      // Update book and user
      await Promise.all([
        Book.findByIdAndUpdate(
          foundBook._id,
          { $push: { reviews: newReview._id } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          user._id,
          { $push: { reviews: newReview._id } },
          { new: true }
        ),
      ]);

      createdReviews.push(newReview);
    }

    // Update genre counts
    if (createdReviews.length > 0) {
      await Promise.all(
        genreDocs.map(async (genreId: mongoose.Types.ObjectId) => {
          await mongoose
            .model("Genre")
            .findByIdAndUpdate(
              genreId,
              { $inc: { total_times_rated: createdReviews.length } },
              { new: true }
            );
        })
      );
    }

    // Revalidate cache
    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      message: `Successfully created ${createdReviews.length} reviews for the book`,
      book: foundBook,
      reviews: createdReviews,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}