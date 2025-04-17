import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import Review from "@/shared/models/Review";
import dbConnect from "@/lib/db";
// import { apiClient } from "@/lib/axios";
import { cookies } from "next/headers";

export interface ReviewStats {
  _id: string;
  genre: string;
  genreId: string;
  user_times_rated: number;
  user_average: number;
  total_times_rated: number;
  total_average: number;
}

export async function GET(req: NextRequest) {
  const token = getTokenFromCookies(req);
  // const userId = (await cookies()).get("user_id")?.value;
 

  if (!token) {
    console.log("token not found!");
    return NextResponse.json({ error: "authentication failed" });
  }

  try {
    await dbConnect();

    const userData = await getUserFromToken(token);
    if (!userData) {
      return NextResponse.json({ error: "authentication failed", userData });
    }
//  const { data } = await apiClient.get<{ reviews: ReviewStats[] }>(
//     "/genres/create?user=" + userId
//   );
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
      totalReviews > 0 ? (noOfRatings / totalReviews).toFixed(1) : 0;

    const user = {
      ...userData._doc,
      totalReviews,
      totalRatings,
      noOfRatings,
      averageRating,
      // reviews: data.reviews
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "authentication failed" },
      { status: 401 }
    );
  }
}
