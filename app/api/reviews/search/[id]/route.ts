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

    // const token = (await cookies()).get("token")?.value; - For testing on (postman)
    const token = getTokenFromCookies(req);
    const user = await getUserFromToken(token!);

    console.log({ token });

    if (!id) {
      return NextResponse.json(
        { error: "Missing or invalid review ID" },
        { status: 404 }
      );
    }

    const reviews = await Review.find({ bookId: id }).populate(
      "reviewer",
      "-password -books -email"
    );
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
    const totalReviews = reviews.length;
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating =
      totalReviews > 0 ? (totalRatings / totalReviews).toFixed(1) : 0;

    return NextResponse.json({ reviews, hasReviewAvailable, averageRating });
  } catch (error) {
    return NextResponse.json(error);
  }
}
