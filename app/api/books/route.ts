import { NextResponse } from "next/server";
import Book from "@/shared/models/Book";

export async function GET() {
  try {
    const books = await Book.find({});
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({error: error instanceof Error ? error.message : String(error)}, {status: 500});
  }
}
