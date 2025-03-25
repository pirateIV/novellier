import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import Review from "@/shared/models/Review";

export async function GET(req: NextRequest) {
  const token = getTokenFromCookies(req);

  console.log("token", token);
  console.log({ token });
  if (!token) {
    console.log("token not found!");
    return NextResponse.json({ error: "authentication failed" });
  }

  try {
    const userData = await getUserFromToken(token);
    if (!userData) {
      return NextResponse.json({ error: "authentication failed", userData });
    }

    // List of user reviews
    const userReviews = await Review.find({ reviewer: userData.id });

    // User review statistics
    const totalReviews = userReviews.length;
    const totalRatings = totalReviews * 5;
    const noOfRatings = userReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating =
      totalReviews > 0
        ? parseFloat((noOfRatings / totalReviews).toFixed(1))
        : 0;

    const user = {
      ...userData._doc,
      totalReviews,
      totalRatings,
      noOfRatings,
      averageRating,
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "authentication failed" },
      { status: 401 }
    );
  }
}
