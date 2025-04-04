"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { reviewsMockResponse } from "./data";
import { Button } from "@/components/ui/button";
import StarRating from "@/shared/components/StarRating";
import { Filter, SortAsc } from "lucide-react";
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

type SortBy = "newest" | "oldest" | "highest" | "lowest";

const BookReviewsList = () => {
  const params = useParams() as { book: string };
  const bookID = params.book;

  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const { reviews, totalReviews } = reviewsMockResponse;

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / totalReviews;
  };

  const ratingDistribution = useMemo(() => {
    const distribution = [0, 0, 0, 0, 0];

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[5 - review.rating]++;
      }
    });

    return distribution;
  }, [reviews]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("reviews-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Sort review based on an selected option
  const sortedReviews = useMemo(() => {
    let reviewsArr = [...reviews];

    switch (sortBy) {
      case "newest":
        return reviewsArr.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return reviewsArr.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "highest":
        return reviewsArr.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return reviewsArr.sort((a, b) => a.rating - b.rating);
    }
  }, [reviews, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(totalReviews / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedReviews = sortedReviews.slice(
    startIndex,
    startIndex + pageSize
  );

  const averageRating = calculateAverageRating();

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">A Tale of Two Cities</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          by&nbsp;
          <span className="font-medium text-gray-200">Charles Dickens</span>
        </p>
      </div>

      <Card className="p-0 mb-8 bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader className="p-4 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Reader Reviews
          </h2>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-neutral-50">4.0</span>
                <div>
                  <StarRating rating={averageRating} />
                  <span className="mt-1 text-sm text-neutral-400">
                    8 reviews
                  </span>
                </div>
              </div>
              <Button className="h-10 mt-4">Write a Review</Button>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star, i) => {
                const count = ratingDistribution[5 - star];
                let percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={star} className="flex items-center gap-2">
                    <div className="w-8 text-sm font-medium text-right text-neutral-700 dark:text-neutral-300">
                      {star} ★
                    </div>
                    <div className="w-full h-2 bg-neutral-800 rounded-full">
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
            {totalReviews}
          </span>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Filter className="size-4" />
            Filter
          </Button>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortBy)}
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

      <div className="space-y-4">
        {paginatedReviews.map((review) => (
          <BookReviewCard key={review.id} review={review} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedReviews.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default BookReviewsList;
