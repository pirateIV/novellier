import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";
import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const token = (await cookies()).get("token")?.value;
    // const token = getTokenFromCookies(req);
    console.log({token})
    const user = await getUserFromToken(token!);

    if (!id) {
      return NextResponse.json(
        { error: "Missing or invalid review ID" },
        { status: 404 }
      );
    }

    const allReviews = await Review.find({ bookId: id }).populate({
      path: "reviewer",
      select: "firstName lastName fullName ID",
    });

    const userReview = allReviews.find((review) =>
      user.reviews.includes(review.id)
    );

    const reviewUser = {
      hasReviewAvailable: !!userReview,
      reviewId: userReview?.id || null,
    };

    const limitedReviews = allReviews.slice(0, Math.max(3, allReviews.length));

    const totalReviews = allReviews.length;
    const totalRatings = allReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating =
      totalReviews > 0 ? (totalRatings / totalReviews).toFixed(1) : 0;

    return NextResponse.json({
      reviews: limitedReviews,
      totalReviews,
      reviewUser,
      averageRating,
    });
  } catch (error) {
    return NextResponse.json\(\{error: error instanceof Error \? error\.message : String\(error\)\}, \{status: 500\}\);
  }
}
