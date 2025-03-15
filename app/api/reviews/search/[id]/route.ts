import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  _: any,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;

    console.log({ id });

    // const book = await Book.findOne({ bookId: id });
    const reviews = await Review.find({ bookId: id });

    // console.log({ reviews });

    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json(error);
  }
}
