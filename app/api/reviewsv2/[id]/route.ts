import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new Response("Missing or invalid id", { status: 400 });
  }

  try {
    await dbConnect();

    const [result] = await Review.aggregate([
      { $match: { bookId: id } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          sumRatings: { $sum: "$rating" },
        },
      },
      {
        $project: {
          _id: 0,
          totalReviews: 1,
          averageRating: {
            $cond: [
              { $eq: ["$totalReviews", 0] },
              "0.0",
              // prettier-ignore
              { $toString: { $round: [{ $multiply: [{ $divide: ["$sumRatings", { $multiply: ["$totalReviews", 5] }] }, 5] }, 1] } },
            ],
          },
        },
      },
    ]);

    // Set cache headers for the response
    const headers = new Headers();
    headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );

    const response = result || { totalReviews: 0, averageRating: "0.0" };

    return NextResponse.json({ ...response }, { headers });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
