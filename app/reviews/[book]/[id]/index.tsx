import React from "react";
import Link from "next/link";
import { apiClient } from "@/lib/axios";
import client from "@/lib/apollo-client";
import { GET_BOOK_DATA } from "@/lib/graphql/queries";
import { getBookCoverId } from "@/lib/api/openLibrary";
import BookCover from "@/components/reviews/BookCover";
import RatingStars from "@/components/reviews/RatingStars";
import ReviewMeta from "@/components/reviews/ReviewMeta";
import type { Book, BookData, Params, Review } from "@/shared/types";

async function fetchReviewData(id: string) {
  const response = await apiClient.get(`/reviews/${id}`);
  return (await response.data.review) as Review;
}

async function fetchBookData(review: Review) {
  const bookResult = await client.query<{ book: Book }>({
    query: GET_BOOK_DATA,
    variables: { id: review.bookId },
  });
  const coverId = await getBookCoverId(review.bookId);
  return {
    book: bookResult.data.book,
    coverId,
  };
}

const ReviewsPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;

  try {
    const review = await fetchReviewData(id);
    const { book, coverId }: BookData = await fetchBookData(review);

    return (
      <div className="w-full min-h-screen flex flex-col items-center p-6">
        <div className="max-w-2xl relative p-5">
          <div className="mb-4">
            <Link
              href={`/books/${review.bookId}?title=${book.title}&book_cover_id=${coverId}`}
              className="text-sm group"
            >
              <span className="text-gray-400">&larr;</span>{" "}
              <span className="group-hover:underline">Back to book</span>
            </Link>
          </div>
          <div className="flex items-start gap-5">
            <BookCover coverId={coverId} title={book.title} />
            <div>
              <h2 className="mb-4 text-2xl font-semibold">{book.title}</h2>
              <div className="mb-4">
                <RatingStars rating={review.rating} />
              </div>
            </div>
          </div>
          <div className="pt-5">
            <p className="font-sans">{review.content}</p>

            <div className="text-sm text-right text-gray-400">
              by{" "}
              <span className="font-medium text-indigo-600 dark:text-sky-400">
                {review.reviewer.fullName}
              </span>
            </div>
            <ReviewMeta review={review} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching review or book data:", error);
    return (
      <div className="w-full min-h-screen flex justify-center items-center p-6">
        <p className="text-red-500">Error loading review.</p>
      </div>
    );
  }
};

export default ReviewsPage;
