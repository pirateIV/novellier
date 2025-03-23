"use client";

import React from "react";
import BookReviewItem from "./book-review-item";
import BookReviewsPlaceholder from "./book-reviews-placeholder";
import BookReviewForm from "./book-review-form";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

const BookReviewList = ({ reviews }: { reviews: any }) => {
  return (
    <>
      {reviews?.length > 0 ? (
        <div>
          <div className="divide-y divide-slate-950/[.07] dark:divide-white/10">
            {reviews.map((review: any) => (
              <BookReviewItem key={review?.id} review={review} />
            ))}
          </div>
          <BookReviewForm>
            <Button
              size="icon"
              className="ml-auto w-fit absolute font-medium right-5 bottom-5 px-3 mt-3 text-xs"
            >
              <PenLine />
              Review
            </Button>
          </BookReviewForm>
        </div>
      ) : (
        <BookReviewsPlaceholder />
      )}
    </>
  );
};

export default BookReviewList;
