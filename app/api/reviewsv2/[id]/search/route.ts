import dbConnect from "@/lib/db";
import { Review } from "@/shared/models";
import Book from "@/shared/models/Book";
import { NextRequest, NextResponse } from "next/server";

interface ReviewsSearchParams {
  page?: string;
  sortBy?: "newest" | "oldest" | "highest" | "lowest";
  limit?: string;
}

function updateSortOpts(sortBy?: ReviewsSearchParams["sortBy"]) {
  const sortOptions: { [key: string]: 1 | -1 } = {};
  switch (sortBy) {
    case "newest":
      sortOptions.createdAt = -1;
      break;
    case "oldest":
      sortOptions.createdAt = 1;
      break;
    case "highest":
      sortOptions.rating = -1;
      break;
    case "lowest":
      sortOptions.rating = 1;
      break;
    default:
      sortOptions.createdAt = -1; // Default sort by newest
  }
  return sortOptions;
}

function extractSearchParamsValues(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("limit") || "10"))
  ); // Cap at 50
  const sortBy = searchParams.get("sortBy") as ReviewsSearchParams["sortBy"];
  return { page, limit, sortBy };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const { page, limit, sortBy } = extractSearchParamsValues(searchParams);

    if (!id) throw new Error("Book ID is required");

    const sortOptions = updateSortOpts(sortBy);
    const filter = { bookId: id };
    const skip = (page - 1) * limit;

    await dbConnect();

    // Parallelize independent queries
    const [totalReviews, reviews, book, ratingDist] = await Promise.all([
      Review.countDocuments(filter),
      Review.find(filter)
        .sort(sortOptions)
        .select("content createdAt rating")
        .populate({
          path: "reviewer",
          select: "firstName lastName createdAt helpful",
        })
        .skip(skip)
        .limit(limit),
      Book.findOne(filter).select("title author"),
      Review.aggregate([
        { $match: filter },
        { $group: { _id: "$rating", count: { $sum: 1 } } },
        { $project: { _id: 0, rating: "$_id", count: 1 } },
      ]),
    ]);

    // Format rating distribution
    let distribution = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
    ratingDist.forEach(({ rating, count }) => {
      if (rating >= 1 && rating <= 5) {
        distribution[rating.toString() as keyof typeof distribution] = count;
      }
    });

    const totalPages = Math.ceil(totalReviews / limit);
    const hasNextPage = skip + reviews.length < totalReviews;

    let totalRatings = 0;
    let sumRatings = 0;

    Object.entries(distribution).forEach(([rating, count]) => {
      const ratingValue = parseInt(rating);
      totalRatings += count;
      sumRatings += ratingValue * count;
    });

    const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;

    return NextResponse.json({
      book,
      reviews,
      totalReviews,
      averageRating,
      ratingDistribution: distribution,
      page: { current: page, totalPages, hasNextPage },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Could not get reviews",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
