import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/shared/models/User";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";
import Book from "@/shared/models/Book";

export async function POST(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
      id: string;
    };

    await dbConnect();

    const { bookId } = await req.json();

    // const user = await User.findById(decoded.id).select("-password -reviews");
    const reviews = await Review.find({ bookId });
    const book = await Book.find({ bookId });

    return NextResponse.json({reviews,book});
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
