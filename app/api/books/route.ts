import { NextResponse } from "next/server";
import Book from "@/shared/models/Book";

export async function GET() {
  try {
    const books = await Book.find({});
    const booksCount = await Book.countDocuments();
    return NextResponse.json({ books, booksCount });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
