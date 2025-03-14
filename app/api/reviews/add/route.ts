import { getUserByToken } from "@/app/shared/utils";
import dbConnect from "@/lib/db";
import Book from "@/shared/models/Book";
import Review from "@/shared/models/Review";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const reviewResponse = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" });
  }

  await dbConnect();
  console.log("db connected");

  try {
    const user = await getUserByToken(token);

    if (!user) {
      return NextResponse.json({ error: "No user found" });
    }

    if (!reviewResponse) {
      return NextResponse.json(
        { error: "No review provided" },
        { status: 400 }
      );
    }

    const { review, book } = reviewResponse;

    console.log(reviewResponse);

    const newBook = new Book({
      ...book,
    });
    const newReview = new Review({
      ...review,
      bookId: book.bookId,
    });

    user.totalReviews += 1;
    user.reviews.push(newReview._id);
    user.books.push(newBook._id);
    await user.save();

    console.log("starting...", { user });

    newReview.user = user._id;
    newReview.book = newBook._id;
    await newReview.save();

    newBook.reviews.push(newReview._id);
    await newBook.save();

    console.log({ newReview, newBook, user });

    // const review = await Review.create({
    //   ...reviewResponse,
    //   user: user._id,
    // });

    // const book = await Book.create({

    // })

    // user.totalReview += 1;
    // user.books.push(review.book);
    // await user.save();

    return NextResponse.json({ newReview, newBook, user });
  } catch (error) {
    return NextResponse.json(error);
  }
}
