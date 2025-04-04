"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { reviewsMockResponse } from "./data";
import { Button } from "@/components/ui/button";
import StarRating from "@/shared/components/StarRating";

const BookReviewsList = () => {
  const params = useParams() as { book: string };
  const bookID = params.book;

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

  console.log(ratingDistribution);

  const averageRating = calculateAverageRating();

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">A Tale of Two Cities</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          by&nbsp;
          <span className="text-gray-200 font-medium">Charles Dickens</span>
        </p>
      </div>

      <Card className="mb-8 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 p-0">
        <CardHeader className="border-b border-neutral-100 p-4 dark:border-neutral-800">
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
              <Button className="mt-4 h-10">Write a Review</Button>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star, i) => {
                const count = ratingDistribution[5 - star];
                let percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={star} className="flex items-center gap-2">
                    <div className="w-8 text-right text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {star} ★
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-800">
                      <div
                        className="h-full border-t border-t-amber-400 bg-amber-500 rounded-full"
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
    </div>
  );
};

export default BookReviewsList;
