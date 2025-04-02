"use client";

import React from "react";
import BookReviewItem from "./book-review-item";
import BookReviewForm from "./book-review-form";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Review } from "@/shared/types";

const BookReviewList = ({
  id,
  reviewList,
  reviewUser,
  onDelete,
}: {
  id: string;
  reviewList: Review[];
  reviewUser: { hasReviewAvailable: boolean; reviewId: string | null };
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      <div>
        <div className="divide-y divide-slate-950/[.07] dark:divide-white/10">
          {reviewList.map((review: any) => (
            <BookReviewItem
              key={review?.id}
              review={review}
              onDelete={() => onDelete(review?.id)}
              isUserReview={review?.id === reviewUser?.reviewId}
            />
          ))}
        </div>
        {!reviewUser.hasReviewAvailable && (
          <BookReviewForm>
            <Button
              size="icon"
              className={cn(
                "ml-auto w-fit fixed font-medium right-20 bottom-5 px-3 mt-3 text-xs"
              )}
            >
              <PenLine />
              Review
            </Button>
          </BookReviewForm>
        )}
      </div>
    </>
  );
};

export default BookReviewList;
