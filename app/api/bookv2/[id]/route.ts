import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { defaultGenres } from "@/lib/api/openLibrary";
import { Book, Review } from "@/shared/models";

type BookStats = {
  content: string;
  bookId: string;
  rating: number;
  reviewer: string;
  book: string;
  user: string;
  helpful: Map<string, boolean>;
};

function getBookStats(bookStats: BookStats) {}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = req.nextUrl.searchParams.get("user");

  try {
    await dbConnect();

    const [bookResponse, bookStats] = await Promise.all([
      await fetch(`https://openlibrary.org/works/${id}.json`),
      await Book.findOne({ bookId: id }).populate("reviews", "rating"),
    ]);

    const book = await bookResponse.json();

    const authorId = book.authors[0].author.key.replace("/authors/", "");

    const authorResponse = await fetch(
      `https://openlibrary.org/authors/${authorId}.json`
    );
    const author = await authorResponse.json();

    const hasBookReview = user ? !!(await Review.findOne({
      bookId: id,
      reviewer: user,
    })) : false;

    let stats = {};
    if (!bookStats) {
      stats = { averageRating: 0, totalReviews: 0 };
    } else {
      const totalReviews =
        (bookStats?.reviews.length > 0 ? bookStats?.reviews.length : 0) || 0;
      const totalRatings = bookStats.reviews.reduce(
        (acc: number, review: { rating: number }) => acc + review.rating,
        0
      );
      const averageRating =
        totalReviews > 0 ? (totalRatings / totalReviews).toFixed(1) : 0;

      stats = { averageRating, totalReviews };
    }

    const filteredGenres = book.subjects.filter((subject: string) =>
      defaultGenres.includes(subject)
    );

    const jsonResponse = {
      author: { authorId, name: author.name },
      stats,
      title: book.title,
      authorsCount: book.authors.length,
      hasBookReview,
      description: book.description?.value || book.description,
      links: book.links || [],
      subjects: filteredGenres,
      characters: book?.subject_people?.slice(0, 5) || [],
      first_publish_date: book.first_publish_date
        ? book.first_publish_date.toString()
        : "",
    };
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    });
  }
}
