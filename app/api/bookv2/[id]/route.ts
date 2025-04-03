import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchBookAndAuthorData } from "@/services/bookService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  console.log({ id });
  const token = (await cookies()).get("token")?.value;

  if (!id) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }

  try {
    const data = await fetchBookAndAuthorData(id);

    if (!data) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching book data:", error);
    return NextResponse.json(
      { error: "Failed to fetch book data" },
      { status: 500 }
    );
  }
}
