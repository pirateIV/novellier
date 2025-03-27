// import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
// import Review from "@/shared/models/Review";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // const token = req.cookies.get("token")?.value;
  // const user = await getUserFromToken(token!);

  // console.log({ token });

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

    console.log(book);

    const totalReviews =
      (book.reviews.length > 0 ? book.reviews.length : 0) || 0;
    const totalRatings = book.reviews.reduce(
      (acc: number, review: { rating: number }) => acc + review.rating,
      0
    );

    // const reviews = await Review.find({ bookId: id });

    // const hasReviewAvailable = !!reviews.find((review) =>
    //   user.reviews.includes(review.id)
    // );

    const averageRating =
      totalReviews > 0 ? (totalRatings / totalReviews).toFixed(1) : 0;

    return NextResponse.json({
      averageRating,
      totalReviews,
      // hasReviewAvailable,
    });
  } catch (error) {
    return NextResponse.json({ error, averageRating: 0, totalRatings: 0 });
  }
}
