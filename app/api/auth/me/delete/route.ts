import { getUserFromToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import { Book, Review, User } from "@/shared/models";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import Genre from "@/shared/models/Genre";
import { NextResponse } from "next/server";

export async function DELETE() {
  const token = (await cookies()).get("token")?.value;

  const user = await getUserFromToken(token!);

  const userId = user._id;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();

    // 1. Delete all reviews by this user
    const userReviews = await Review.find({ reviewer: userId }).session(
      session
    );

    // Update books that reference these reviews
    await Book.updateMany(
      { reviews: { $in: userReviews.map((r) => r._id) } },
      { $pull: { reviews: { $in: userReviews.map((r) => r._id) } } },
      { session }
    );

    // Update genre counts for each review
    for (const review of userReviews) {
      if (review.genres && review.genres.length > 0) {
        await Genre.updateMany(
          { _id: { $in: review.genres } },
          { $inc: { total_times_rated: -1 } },
          { session }
        );
      }
    }

    // Actually delete the reviews
    await Review.deleteMany({ reviewer: userId }).session(session);

    // 2. Handle books created by this user (if applicable)
    // Assuming books have a 'user' field indicating the creator
    await Book.deleteMany({ user: userId }).session(session);

    // 3. Finally, delete the user
    await User.findByIdAndDelete(userId).session(session);
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
