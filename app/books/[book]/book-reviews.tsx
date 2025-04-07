"use client";

import { formatDate } from "@/shared/utils";
import StarRatingList from "@/shared/components/StarRatingList";
import { cn } from "@/lib/utils";
import { getRandomColor } from "@/lib/helpers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { BookResponse, ReviewsResponse } from "@/lib/graphql/types";
import { Review } from "@/shared/types";

const BookReviews = ({
  id,
  reviews,
  bookData,
  totalReviews,
}: {
  id: string;
  reviews: Review[];
  bookData: BookResponse;
  totalReviews: number;
}) => {
  return (
    <div className="pt-8 mt-12 border-t">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold tracking-tight font-sans">
          Community Reviews
        </h3>
        <div className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full dark:bg-secondary">
          <span className="font-bold">{totalReviews || 0}</span>{" "}
          <span className="text-gray-500 dark:text-gray-300">
            {totalReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      {bookData.stats.totalReviews === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No reviews yet. Be the first to review this book!
          </p>
        </div>
      ) : (
        <div className="divide-y divide-y-zinc-800">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="relative p-4 first-of-type:rounded-t-lg last-of-type:rounded-b-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={cn(
                    "size-10 shrink-0 rounded-full border flex items-center justify-center",
                    getRandomColor(review.reviewer.firstName)
                  )}
                >
                  <span className="text-sm font-medium text-white">
                    {review.reviewer.fullName.charAt(0)}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {review.reviewer.fullName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <StarRatingList rating={review.rating} />
                    <span className="text-gray-400 dark:text-gray-500">·</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {bookData.stats.totalReviews > 0 && (
        <div className="flex justify-center mt-6">
          <Link href={`/books/${id}/reviews`}>
            <Button variant="outline" className="flex items-center gap-2">
              View all reviews
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookReviews;
