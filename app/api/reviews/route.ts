import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";

export async function GET() {
  await dbConnect();
  try {
    const reviews = await Review.find({});
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(error);
  }
}
