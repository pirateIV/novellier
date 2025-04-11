import dbConnect from "@/lib/db";
import { Review } from "@/shared/models";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: // searchParams,
  {
    params: Promise<{ id: string }>;
    // searchParams: Promise<{ userID: string }>;
  }
) {
  const { id } = await params;
  const { userID } = await req.json();
  // console.log(req.json());
  console.log({ userID });
  try {
    await dbConnect();

    const review = await Review.findById(id);

    if (review.helpful.has(userID)) {
      review.helpful.delete(userID);
    } else {
      review.helpful.set(userID, true);
    }

    review.helpfulCount = review.helpful.size;
    await review.save();

    revalidatePath(`/books/${review.bookId}/reviews/${id}`);

    return NextResponse.json({ review, userID });
  } catch (error) {
    console.log({
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
