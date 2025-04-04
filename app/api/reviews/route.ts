import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";
import { headers } from "next/headers";
import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import jwt from "jsonwebtoken";
import User from "@/shared/models/User";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  await dbConnect();
  // const token = reqHeaders?.split("")[1];

  // console.log({ token });
  // await dbConnect();
  try {
    const decoded = jwt.verify(token || "", process.env.JWT_SECRET!);
    const { id } = decoded as { id: string };

    let filter = {};
    let page = 1;
    let limit = 10;

    const reviews = await Review.find({ reviewer: id });

    const allBooksReviewed = reviews.map((review) => review.bookId);
    // const totalRatingPerBooks = allBooksReviewed.map(async (book) => {
    //   const review = await Review.find({ bookId: book });
    //   return review
    // });
    const totalReviews = await Promise.all(
      allBooksReviewed.map(async (book) => {
        const reviews = await Review.find({ bookId: book });
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce(
          (acc, review) => acc + Number(review.rating),
          0
        );
        const averageRating = ((totalRating * 5) / totalReviews / 5).toFixed(1);

        return {
          book,
          averageRating,
          totalRating,
          totalReviews,
          reviews,
        };
      })
    );

    // const firstbookReview = await Review.findOne({
    //   bookId: allBooksReviewed[0],
    // });
    // const reviews = await Review.find({});
    return NextResponse.json({ allBooksReviewed, totalReviews });
  } catch (error) {
    return NextResponse.json\(\{error: error instanceof Error \? error\.message : String\(error\)\}, \{status: 500\}\);
  }
}
