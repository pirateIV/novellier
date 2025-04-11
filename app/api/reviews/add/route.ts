import { getUserFromToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import User from "@/shared/models/User";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface ReviewResponse {
  review: {
    content: string;
    rating: number;
  };
  book: {
    bookId: string;
    author: string;
    authorId: any;
    reviewer: string;
    title: string;
  };
  path: string;
}

export async function POST(req: NextRequest, {searchParams}: {searchParams: {userID: string}}) {
  const reviewResponse = (await req.json()) as ReviewResponse;
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 400 });  
  }

  await dbConnect();

  try {
    const user = await getUserFromToken(token);

    const { review, book, path } = reviewResponse;

    let foundBook = await Book.findOne({ bookId: book.bookId });
    if (!foundBook) {
      foundBook = await Book.create({ ...book }).catch((err) =>
        console.log(err)
      );
    }

    const newReview = new Review({
      ...review,
      book: foundBook.id,
      bookId: book.bookId,
      reviewer: user.id,
    });
    await newReview.save();

    foundBook = await Book.findByIdAndUpdate(
      foundBook.id,
      { $push: { reviews: newReview.id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      user.id,
      { $push: { reviews: newReview.id } },
      { new: true }
    );
    await foundBook.save();

    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({ foundBook, newReview });

    // // console.log(reviewResponse);

    // let bookId = book.bookId;
    // let existingBook = await Book.findOne({ bookId });

    // const newBook = existingBook ? existingBook : new Book({ ...book });
    // await newBook.save();

    // const newReview = new Review({
    //   ...review,
    //   user: user._id,
    //   book: newBook._id,
    //   bookId,
    // });

    // await newReview.save();

    // await Book.findByIdAndUpdate(
    //   newBook._id,
    //   { $push: { reviews: newReview._id } },
    //   { new: true }
    // );

    // return NextResponse.json({ newBook, newReview });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
