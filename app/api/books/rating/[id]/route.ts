import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "Missing or invalid id" },
      { status: 404 }
    );
  }
  try {
    await dbConnect();

    const book = await Book.findOne({ bookId: id }).populate(
      "reviews",
      "rating"
    );

    if (!book) {
      return NextResponse.json({ averageRating: 0, totalRatings: 0 });
    }

    const totalReviews =
      (book.reviews.length > 0 ? book.reviews.length : 0) || 0;
    const totalRatings = book.reviews.reduce(
      (acc: number, review: { rating: number }) => acc + review.rating,
      0
    );

    const averageRating =
      totalReviews > 0
        ? ((totalRatings / totalReviews).toFixed(1))
        : 0;

    return NextResponse.json({
      averageRating,
      totalReviews,
    });
  } catch (error) {
    return NextResponse.json({ error, averageRating: 0, totalRatings: 0 });
  }
}
