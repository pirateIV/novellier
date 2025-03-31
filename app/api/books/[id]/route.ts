import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import { NextResponse } from "next/server";

export async function GET(
  _: any,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Missing or invalid id" },
      { status: 400 }
    );
  }
  try {
    dbConnect().then(async () => {
      // const book = await Book.findById(id).populate("reviews", "rating");
      const book = await Book.findOne({ bookId: id }).populate(
        "reviews",
        "rating"
      );

      const totalReviews = book.reviews.length;
      const totalRatings = book.reviews.reduce(
        (acc: number, review: { rating: number }) => acc + review.rating,
        0
      );

      const averageRating = (totalRatings / totalReviews).toFixed(1);

      return NextResponse.json({ book, averageRating });
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
