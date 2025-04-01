"use client";

import React from "react";
import BookReviewItem from "./book-review-item";
import BookReviewsPlaceholder from "./book-reviews-placeholder";
import BookReviewForm from "./book-review-form";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/axios";
import client from "@/lib/apollo-client";

const BookReviewList = ({
  reviews,
  reviewUser,
}: {
  reviews: any;
  reviewUser: { hasReviewAvailable: boolean; reviewId: string };
}) => {
  // let [reviewsData, setReviewsData] = useState(reviews)

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(`/reviews/delete/${id}`, {
        data: { path: window.location.pathname },
      });

      client.refetchQueries({
        include: ["GET_BOOK_DATA", "GET_AUTHOR_DATA"],
      });
      // if (response.status === 200) {
      //   window.location.reload();
      // }
      console.log(response);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <>
      {reviews?.length > 0 ? (
        <div>
          <div className="divide-y divide-slate-950/[.07] dark:divide-white/10">
            {reviews.map((review: any) => (
              <BookReviewItem
                key={review?.id}
                review={review}
                onDelete={() => handleDelete(review?.id)}
                isUserReview={review?.id === reviewUser?.reviewId}
              />
            ))}
          </div>
          {/* {!reviewUser.hasReviewAvailable && (
            <BookReviewForm>
              <Button
                size="icon"
                className={cn(
                  "ml-auto w-fit absolute font-medium right-5 bottom-5 px-3 mt-3 text-xs"
                )}
              >
                <PenLine />
                Review
              </Button>
            </BookReviewForm> */}
          {/* )} */}
        </div>
      ) : (
        <BookReviewsPlaceholder />
      )}
    </>
  );
};

export default BookReviewList;
