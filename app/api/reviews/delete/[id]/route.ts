import { getUserFromToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import User from "@/shared/models/User";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await params;
  // const token = getTokenFromCookies(req);
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await getUserFromToken(token);
    // const { path } = await req.json();

    // return NextResponse.json({ path });

    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.reviewer.toString() !== user.id.toString()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await Book.findByIdAndUpdate(
      review.book,
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      user.id,
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    await Review.findByIdAndDelete(reviewId);

    // if (path) {
    //   revalidatePath(path);
    // }

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
