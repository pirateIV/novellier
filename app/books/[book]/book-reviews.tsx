import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen } from "lucide-react";
import type { BookResponse } from "@/lib/graphql/types";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import StarRating from "@/shared/components/StarRating";

const BookReviews = ({
  id,
  search,
  bookData,
  totalReviews,
}: {
  id: string;
  search: { book_cover_id: string };
  bookData: BookResponse;
  totalReviews: number;
}) => {
  const hasReviews = totalReviews > 0;
  const averageRating = bookData.stats?.averageRating || 0;

  return (
    <section aria-labelledby="reviews-heading" className="pt-8 mt-12 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2
          id="reviews-heading"
          className="text-2xl font-semibold tracking-tight font-sans"
        >
          Community Reviews
        </h2>
        <div className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full dark:bg-secondary">
          <span className="font-bold">{totalReviews || 0}</span>{" "}
          <span className="text-gray-500 dark:text-gray-300">
            {totalReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      {!hasReviews ? (
        <div className="py-10 text-center bg-gray-50 dark:bg-secondary/30 rounded-lg">
          <div className="p-3 bg-white/5 rounded-full mx-auto inline-block">
            <i className="size-20 mx-auto">
              <Icons.WhatDoYouThink />
            </i>
          </div>
          <p className="text-gray-500 font-libre text-xl font-medium dark:text-gray-400 mb-4">
            What do <i>you</i> think?
          </p>
          <Link
            href={`/books/${id}/review?title=${bookData.title}&author=${bookData.author?.name}&book_cover=${search.book_cover_id}`}
          >
            <Button className="rounded-full">Write a review</Button>
          </Link>
        </div>
      ) : (
        <>
          {averageRating && (
            <div className="mb-8 p-6 bg-gray-50 dark:bg-secondary/30 rounded-lg">
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-1">{averageRating}</div>
                  <div className="flex items-center gap-1">
                   <StarRating rating={averageRating}/>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Link
            href={`/books/${id}/reviews`}
            className={cn(
              "block transition-all duration-300 hover:shadow-lg",
              "bg-gradient-to-r from-gray-50 to-white dark:from-secondary/30 dark:to-secondary/10",
              "rounded-xl overflow-hidden border hover:border-primary/20"
            )}
          >
            <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-white/5">
                <i className="*:size-12 mx-auto">
                  <Icons.WhatDoYouThink />
                </i>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold mb-2">
                  Read {totalReviews} Community Reviews
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Discover what other readers think about this book.
                </p>

                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {["Insightful", "Critical", "Thoughtful", "Detailed"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="group flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  <span>View all</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/20 border-t flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <BookOpen className="h-4 w-4" />
                <span>Most recent reviews first</span>
              </div>

              <div className="text-sm text-primary font-medium">
                See all reviews
              </div>
            </div>
          </Link>

          {/* <div className="mt-6 flex justify-center">
            <Link
              href={`/books/${id}/review?title=${bookData.title}&author=${bookData.author.name}&book_cover=${search.book_cover_id}`}
            >
              <Button variant="ghost" size="sm" className="text-primary">
                <Pencil className="h-4 w-4 mr-2" />
                Write your own review
              </Button>
            </Link>
          </div> */}
        </>
      )}
    </section>
  );
};

export default BookReviews;
