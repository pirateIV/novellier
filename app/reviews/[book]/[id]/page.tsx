import React from "react";
import Link from "next/link";
import { Review } from "@/shared/types";
import { apiClient } from "@/lib/axios";
import client from "@/lib/apollo-client";
import type { Book } from "@/lib/books";
import { getBookCoverId } from "@/lib/api/openLibrary";
import { GET_BOOK_DATA } from "@/lib/graphql/queries";
import BadgeGroup from "@/shared/components/badge-group";
import BookCover from "@/components/reviews/BookCover";
import Header from "../../_components/header";

function getBookCover(id: string) {
  return `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
}

function getBookLink(bookId: string, title: string, coverId: string) {
  return `/books/${bookId}?title=${title}&book_cover_id=${coverId}`;
}

async function fetchReviewData(id: string) {
  const response = await apiClient.get<{ review: Review }>(`/reviews/${id}`);
  return response.data;
}

async function fetchBookData(id: string) {
  const bookResult = await client.query<{ book: Book }>({
    query: GET_BOOK_DATA,
    variables: { id },
  });
  const coverId = await getBookCoverId(id);
  return {
    book: bookResult.data.book,
    coverId,
  };
}

const ReviewPage = async ({
  params,
}: {
  params: Promise<{ book: string; id: string }>;
}) => {
  const { id } = await params;
  console.log(id);
  console.log(await params);

  try {
    const { review } = await fetchReviewData(id);
    const { book, coverId } = await fetchBookData(review?.bookId);

    const headerProps = {
      title: book.title,
      link: getBookLink(review.bookId, book.title, coverId),
      user: review.reviewer.fullName,
    };

    console.log(review, book);

    return (
      <div className="w-full min-h-screen">
        <div className="mx-auto max-w-4xl space-y-6 mt-5">
          <Header {...headerProps} />
          <div className="flex items-start gap-4">
            <BookCover coverId={coverId} title={book.title} />

            <div className="pl-3">
              <h1 className="text-2xl font-medium tracking-tight">
                {book.title}
              </h1>

              <BadgeGroup list={book.subjects} />

              <div className="mt-4">
                <p className="font-worksans text-sm line-clamp-3 dark:text-gray-500">
                  {book.description}
                </p>
                <p className="text-xs text-right">
                  <Link
                    href={headerProps.link}
                    className="mt-2 font-medium text-right text-blue-500 underline hover:no-underline"
                  >
                    View full description
                  </Link>
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-semibold mb-1">Review</h3>
                <p className="dark:text-gray-300 text-sm font-sans">
                  {review.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="w-full min-h-screen flex justify-center items-center p-6">
        <p className="text-red-500">Error loading review.</p>
      </div>
    );
  }
};

export default ReviewPage;
