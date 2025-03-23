import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";
import User from "@/shared/models/User";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const token = getTokenFromCookies(req);
    const user = await getUserFromToken(token!);

    if (!id) {
      return NextResponse.json(
        { error: "Missing or invalid review ID" },
        { status: 404 }
      );
    }

    const reviews = await Review.find({ bookId: id }).populate("reviewer");
    // const users = await Promise.all([
    //   ...reviews.map(
    //     async (review) =>
    //       await User.findById(review.reviewer).select(
    //         "-username -email -password -books -createdAt -updatedAt"
    //       )
    //   ),
    // ]);

    const hasReviewAvailable = !!reviews.find((review) =>
      user.reviews.includes(review.id)
    );
    const totalReviews = reviews.length * 5;
    const averageReviews = (
      reviews.reduce((acc, review) => acc + review.rating, 0) / 5
    ).toFixed(1);

    return NextResponse.json({ reviews, hasReviewAvailable, averageReviews });
  } catch (error) {
    return NextResponse.json(error);
  }
}
