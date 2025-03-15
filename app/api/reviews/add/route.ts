import { getUserByToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reviewResponse = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 400 });
  }

  await dbConnect();

  try {
    const user = await getUserByToken(token);

    const { review, book } = reviewResponse;
    // console.log(reviewResponse);

    let bookId = book.bookId;
    let existingBook = await Book.findOne({ bookId });

    const newBook = existingBook ? existingBook : new Book({ ...book });
    await newBook.save();

    const newReview = new Review({
      ...review,
      user: user._id,
      book: newBook._id,
      bookId,
    });

    await newReview.save();

    await Book.findByIdAndUpdate(
      newBook._id,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    return NextResponse.json({ newBook, newReview });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
