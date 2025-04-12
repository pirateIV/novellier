import { getUserFromToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import User from "@/shared/models/User";
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

export async function POST(req: NextRequest) {
  const reviewResponse = (await req.json()) as ReviewResponse;
  const token = req.cookies.get("token")?.value;
  const userID = req.nextUrl.searchParams.get("userId");

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 400 });
  }

  await dbConnect();

  try {
    const user = await getUserFromToken(token);

    const { review, book, path } = reviewResponse;

    let foundBook = await Book.findOne({ bookId: book.bookId });
    if (!foundBook) {
      foundBook = await Book.create({ ...book }).catch((err) =>
        console.log(err)
      );
    }

    // Check if user has existing review
    const existingReview = await Review.findOne({ 
      bookId: book.bookId, 
      reviewer: user.id // Use user.id instead of userID from params
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "User already has a review for this book", existingReview },
        { status: 400 }
      );
    }

    const newReview = new Review({
      ...review,
      book: foundBook.id,
      bookId: book.bookId,
      reviewer: user.id,
    });
    await newReview.save();

    foundBook = await Book.findByIdAndUpdate(
      foundBook.id,
      { $push: { reviews: newReview.id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      user.id,
      { $push: { reviews: newReview.id } },
      { new: true }
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