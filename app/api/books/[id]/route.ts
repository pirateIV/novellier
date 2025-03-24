import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  _: any,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Missing or invalid id" },
      { status: 404 }
    );
  }
  try {
    await dbConnect();
    const book = await Book.findById(id).populate("reviews", "rating");

    const totalReviews = book.reviews.length;
    const totalRatings = book.reviews.reduce(
      (acc: number, review: { rating: number }) => acc + review.rating,
      0
    );

    const averageRating = (totalRatings / totalReviews).toFixed(1);

    return NextResponse.json({ book, averageRating });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
