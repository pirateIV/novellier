import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, MessageSquare } from "lucide-react";
import { BookResponse } from "@/lib/graphql/types";
import { Review } from "@/shared/types";

const BookReviews = ({
  id,
  search,
  bookData,
  totalReviews,
}: {
  id: string;
  search: { book_cover_id: string };
  reviews: Review[];
  bookData: BookResponse;
  totalReviews: number;
}) => {
  console.log({search})
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

      {bookData.stats.totalReviews === 0 && (
        <div className="py-10 text-center bg-gray-50 dark:bg-secondary/30 rounded-lg">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No reviews yet. Be the first to share your thoughts!
          </p>
          <Link
            href={`/books/${id}/reviews/new?book_cover=${search.book_cover_id}`}
          >
            <Button>Write a review</Button>
          </Link>
        </div>
      )}

      {bookData.stats.totalReviews > 0 && (
        <div className="flex justify-center mt-8">
          <Link href={`/books/${id}/reviews`}>
            <Button variant="outline" className="flex items-center gap-2">
              View all {totalReviews} reviews
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookReviews;
