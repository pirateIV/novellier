"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/shared/components/StarRating";
import { SortAsc } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import BookReviewCard from "./_components/book-review-card";
import Pagination from "./_components/pagination";
import type { BookReviewsResponse } from "@/app/actions";
import { getCookieValue } from "@/lib/user";
import BookReviewDialog, {
  type BookReviewDialogRef,
} from "./_components/book-review-dialog";
import LoadingReviews from "./_components/loading-reviews";
import { cn } from "@/lib/utils";

type SortBy = "newest" | "oldest" | "highest" | "lowest";
type RatingList = "1" | "2" | "3" | "4" | "5";

const BookReviewsList = ({
  bookReviews,
  onPaginationChange,
  currentPagination,
}: {
  bookReviews: BookReviewsResponse | null;
  onPaginationChange: (newPagination: {
    page?: number;
    limit?: number;
    sortBy?: "newest" | "oldest" | "highest" | "lowest";
  }) => void;
  currentPagination: {
    page: number;
    limit: number;
    sortBy: "newest" | "oldest" | "highest" | "lowest";
  };
}) => {
  const { averageRating, book, ratingDistribution, reviews, totalReviews } =
    bookReviews || {
      averageRating: 0,
      book: { title: "", author: "", id: "" },
      ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
      reviews: [],
      totalReviews: 0,
    };

  const reviewDialogRef = useRef<BookReviewDialogRef>(null);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews || []);
  const [localTotalReviews, setLocalTotalReviews] = useState(totalReviews);

  // Sync with props
  useEffect(() => {
    if (reviews) {
      setLocalReviews(reviews);
    }
    setLocalTotalReviews(totalReviews);
  }, [reviews, totalReviews]);

  const userID = getCookieValue("user_id");
  const yourReview = localReviews?.find(
    (review) => review.reviewer._id === userID
  );
  const hasUserReview = !!yourReview;

  // Split reviews into user's review and others
  const { userReview, otherReviews } = useMemo(() => {
    const userReview = localReviews.find(
      (review) => review.reviewer._id === userID
    );
    const otherReviews = localReviews.filter(
      (review) => review.reviewer._id !== userID
    );
    return { userReview, otherReviews };
  }, [localReviews, userID]);

  // Handle review updates
  const handleReviewUpdate = (updatedReview: any) => {
    setLocalReviews((prevReviews) => {
      const newReviews = prevReviews.map((review) =>
        review._id === (updatedReview?._id || updatedReview?.id)
          ? { ...review, ...updatedReview }
          : review
      );
      return newReviews;
    });
    document
      .getElementById("reviews-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle review creation
  const handleReviewCreate = (newReview: any) => {
    setLocalReviews((prevReviews) => [newReview, ...prevReviews]);
    setLocalTotalReviews((prev) => prev + 1);
    setTimeout(() => {
      document
        .getElementById("reviews-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePageChange = (page: number) => {
    setIsChangingPage(true);
    onPaginationChange({ page });
    setTimeout(() => setIsChangingPage(false), 500);
  };

  const handlePageSizeChange = (size: number) => {
    setIsChangingPage(true);
    onPaginationChange({ limit: size, page: 1 });
    setTimeout(() => setIsChangingPage(false), 500);
  };

  const handleSortChange = (sortBy: SortBy) => {
    setIsChangingPage(true);
    onPaginationChange({ sortBy, page: 1 });
    setTimeout(() => setIsChangingPage(false), 500);
  };

  // Sort only other reviews, keeping user's review at top
  const sortedReviews = useMemo(() => {
    if (!otherReviews || otherReviews.length === 0)
      return userReview ? [userReview] : [];

    let sortedOtherReviews = [...otherReviews];

    switch (currentPagination.sortBy) {
      case "newest":
        sortedOtherReviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        sortedOtherReviews.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "highest":
        sortedOtherReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sortedOtherReviews.sort((a, b) => a.rating - b.rating);
        break;
    }

    return userReview
      ? [userReview, ...sortedOtherReviews]
      : sortedOtherReviews;
  }, [otherReviews, currentPagination.sortBy, userReview]);

  const totalPages = Math.ceil(localTotalReviews / currentPagination.limit);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-libre font-bold text-white">
          {book.title}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          by 
          <span className="font-medium text-sky-400">{book.author}</span>
        </p>
      </div>

      <Card className="p-0 mb-8 -mx-4 sm:-mx-0 rounded-none sm:rounded-xl bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader className="p-4 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Reader Reviews
          </h2>
        </CardHeader>
        <CardContent className="py-2 px-3 sm:p-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between sm:block">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-neutral-50">
                  {averageRating}
                </span>
                <div>
                  <StarRating rating={averageRating} />
                  <span className="mt-1 text-sm text-neutral-400">
                    {localTotalReviews} reviews
                  </span>
                </div>
              </div>
              <Button
                className="h-10 mt-4"
                onClick={() =>
                  reviewDialogRef.current?.openDialog({
                    mode: hasUserReview ? "edit" : "create",
                    review: yourReview,
                  })
                }
              >
                {hasUserReview ? "Edit your Review" : "Write a Review"}
              </Button>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const key = star.toString();
                const count = ratingDistribution[key as RatingList];
                const percentage =
                  localTotalReviews > 0
                    ? (Number(count) / localTotalReviews) * 100
                    : 0;

                return (
                  <div key={star} className="flex items-center gap-2">
                    <div className="w-8 text-sm font-medium text-right text-neutral-700 dark:text-neutral-300">
                      {star} ★
                    </div>
                    <div className="w-[95%] sm:w-full h-2 bg-neutral-800 rounded-full">
                      <div
                        className="h-full bg-amber-500 rounded-full border-t border-t-amber-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div>
                      <span className="text-sm text-neutral-500">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div
        id="reviews-section"
        className="mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
            Reviews
          </h3>
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            {localTotalReviews}
          </span>
        </div>

        <div className="flex gap-3">
          <Select
            value={currentPagination.sortBy}
            onValueChange={(value) => handleSortChange(value as SortBy)}
          >
            <SelectTrigger className="h-9 w-[160px] gap-1.5 text-sm">
              <SortAsc className="size-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-6 dark:bg-neutral-800" />

      <div className={cn("relative", isChangingPage && "brightness-50")}>
        {isChangingPage && <LoadingReviews message="Updating Reviews..." />}
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <BookReviewCard
              key={review._id}
              review={review}
              isUserReview={review.reviewer._id === userID}
            />
          ))
        ) : (
          <div className="text-center py-8 text-neutral-500">
            No reviews found. Be the first to leave a review!
          </div>
        )}
      </div>

      {localTotalReviews > 0 && (
        <Pagination
          currentPage={currentPagination.page}
          totalPages={totalPages}
          totalItems={localTotalReviews}
          pageSize={currentPagination.limit}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <BookReviewDialog
        ref={reviewDialogRef}
        review={yourReview}
        onUpdate={handleReviewUpdate}
        // onCreate={handleReviewCreate}
      />
    </div>
  );
};

export default BookReviewsList;
