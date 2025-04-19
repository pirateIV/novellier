"use client";

import { useParams } from "next/navigation";
import { Loader2, BookOpen } from "lucide-react";
import BookReviewsList from ".";
import { useBookReviews } from "@/lib/hooks/use-book-review";
import { Icons } from "@/components/icons";

const BookReviewsPage = () => {
  const params = useParams() as { book: string };

  const { bookReviews, isLoading, error, pagination, handlePaginationChange } =
    useBookReviews({
      bookId: params.book,
      initialLimit: 3,
      initialPage: 1,
      initialSortBy: "newest",
    });

  if (isLoading && !bookReviews) {
    return (
      <div className="min-h-[calc(100vh-55px)] w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center space-y-4">
          {/* <BookOpen className="w-16 h-16 text-amber-500 mx-auto animate-pulse" /> */}
          <Icons.WhatDoYouThink className="animate-pulse mx-auto fill-neutral-500"/>
          <div className="flex items-center gap-2 justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
              Loading book reviews...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-55px)] w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center space-y-4">
          {/* <BookOpen className="w-16 h-16 text-red-500 mx-auto" /> */}
          <Icons.WhatDoYouThink className="mx-auto fill-neutral-500"/>
          <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
            Oops! Something went wrong
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Failed to load book reviews. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border-t border-t-amber-400 bg-amber-600 text-white rounded-md hover:brightness-90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-55px)] w-full">
      <div className="container mx-auto">
        <BookReviewsList
          bookReviews={bookReviews}
          onPaginationChange={handlePaginationChange}
          currentPagination={pagination}
        />
      </div>
    </div>
  );
};

export default BookReviewsPage;