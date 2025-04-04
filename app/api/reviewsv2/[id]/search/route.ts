import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";
import { LucideMonitorPause } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

interface ReviewsSearchParams {
  page?: string;
  sortBy?: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { page, sortBy } = Object.fromEntries(
    req.nextUrl.searchParams
  ) as ReviewsSearchParams;

  // Sets page default to 1 if not provided
  let currentPage = parseInt(page || "1");
  let limit = 3;

  let filter: { bookId: string; [key: string]: any } = { bookId: id };

  let sortOptions: { [key: string]: any } = {};
  if (sortBy) {
    sortOptions.createdAt = sortBy === "desc" ? -1 : 1;
  } 

  try {
    await dbConnect();

    const totalReviews = await Review.countDocuments(filter);
    const totalPages = Math.ceil(totalReviews / limit);
    const hasNextPage = currentPage * limit < totalReviews;

    // If there is no next page, set the current page to 1
    currentPage = currentPage > totalPages ? 1 : currentPage;

    const reviews = await Review.find(filter)
      .sort(sortOptions)
      .select("createdAt")
      .populate({
        path: "reviewer",
        select: "firstName lastName createdAt",
      })
      .skip((currentPage - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      reviews,
      totalReviews,
      page: { current: currentPage, totalPages, hasNextPage },
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
