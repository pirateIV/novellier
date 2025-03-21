import React from "react";
import Link from "next/link";
import { Star, StarIcon } from "lucide-react";
import { format } from "date-fns";
import { apiClient } from "@/lib/axios";
import client from "@/lib/apollo-client";
import { GET_BOOK_DATA } from "@/lib/graphql/queries";
import { getBookCoverId } from "@/lib/api/openLibrary";
import Image from "next/image";

const ReviewsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const response = await apiClient.get(`/reviews/${id}`);
    const { review } = response.data;

    const bookResult = await client.query({
      query: GET_BOOK_DATA,
      variables: { id: review.bookId },
    });

    const book = bookResult.data.book;
    const coverId = await getBookCoverId(review.bookId);

    console.log(review, bookResult);

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
            <Image
              src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
              width="100"
              height="175"
              alt={`${book.title}'s cover`}
            />
            <div>
              <h2 className="mb-4 text-2xl font-semibold">{book.title}</h2>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="size-3 text-amber-500 fill-amber-500"
                    />
                  ))}
                  {[...Array(5 - review.rating)].map((_, index) => (
                    <StarIcon key={index} className="size-3 text-gray-500" />
                  ))}
                  <span className="text-xs text-gray-400">
                    ({review.rating}/5)
                  </span>
                </div>
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

            <div className="mt-3 text-sm text-gray-400">
              <span>
                {new Date(review.createdAt).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                })}
              </span>
              <span className="mx-2">&middot;</span>
              <span>{format(new Date(review.createdAt), "MMMM dd, yyyy")}</span>
            </div>
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
