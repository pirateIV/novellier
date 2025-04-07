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
  
  let limit = 3;

  try {
    await dbConnect();


    const reviews = await Review.find({ bookId: id })
      .populate({ path: "reviewer", select: "firstName lastName fullName" })
      .limit(limit);
    const totalReviews = await Review.countDocuments({ bookId: id });

    console.log({ reviews, id });

    return NextResponse.json({ reviews, totalReviews });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
