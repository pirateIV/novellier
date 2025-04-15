import { getUserFromToken } from "@/app/shared/utils";
import { defaultGenres } from "@/lib/api/openLibrary";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import User from "@/shared/models/User";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface ReviewResponse {
  review: {
    content: string;
    rating: number;
  };
  book: {
    bookId: string;
    author: string;
    authorId: any;
    reviewer: string;
    title: string;
  };
  path: string;
}

// In your POST route for adding a review
export async function POST(req: NextRequest) {
  const reviewResponse = (await req.json()) as ReviewResponse;
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 400 });
  }

  await dbConnect();

  try {
    const user = await getUserFromToken(token);
    const { review, book, path } = reviewResponse;

    // Check if the book exists, create it if not
    let foundBook = await Book.findOne({ bookId: book.bookId });
    let bookGenres = [];

    if (!foundBook) {
      // Fetch book details from Open Library API to get genres
      const bookResponse = await fetch(
        `https://openlibrary.org/works/${book.bookId}.json`
      );
      const bookData = await bookResponse.json();
      bookGenres =
        bookData.subjects
          ?.filter((subject: string) => defaultGenres.includes(subject))
          .slice(0, 3) || []; // Limit to 1–3 genres

      foundBook = await Book.create({
        ...book,
        genres: [], // We’ll update genres below
      });
    } else {
      // If book exists, use its genres (you may need to store genres in Book schema)
      bookGenres = foundBook.genres || []; // Assuming genres are stored in Book
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

    // Check for existing review
    const existingReview = await Review.findOne({
      bookId: book.bookId,
      reviewer: user.id,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "User already has a review for this book", existingReview },
        { status: 400 }
      );
    }

    // Create the new review with associated genres
    const newReview = new Review({
      ...review,
      book: foundBook.id,
      bookId: book.bookId,
      reviewer: user.id,
      genres: genreDocs, // Link genres to the review
    });
    await newReview.save();

    // Update the book with the new review
    foundBook = await Book.findByIdAndUpdate(
      foundBook.id,
      { $push: { reviews: newReview.id } },
      { new: true }
    );

    // Update the user with the new review
    await User.findByIdAndUpdate(
      user.id,
      { $push: { reviews: newReview.id } },
      { new: true }
    );

    // Increment total_times_rated for each genre
    await Promise.all(
      genreDocs.map(async (genreId: mongoose.Types.ObjectId) => {
        await mongoose
          .model("Genre")
          .findByIdAndUpdate(
            genreId,
            { $inc: { total_times_rated: 1 } },
            { new: true }
          );
      })
    );

    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({ foundBook, newReview });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
