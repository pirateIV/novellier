// @ts-nocheck

"use client";

import Link from "next/link";
import { apiClient, buildAuthHeaderToken } from "@/lib/axios";
import { baseURL } from "@/shared/config";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import BookReviewsHeader from "./book-reviews-header";
import BookReviewList from "./book-review-list";
import BookReviewsPlaceholder from "./book-reviews-placeholder";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { ReviewResponse } from "@/shared/types";

const BookReviews = ({
  id,
  token,
}: {
  id: string;
  token: string | undefined;
}) => {
  const [reviews, setReviews] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [optimisticReviews, setOptimisticReviews] = useOptimistic(
    reviews,
    (state, action: { type: string; id?: string }) => {
      switch (action.type) {
        case "delete":
          return state?.reviews.filter((review) => review.bookId !== action.id);
        default:
          return state;
      }
    }
  );

  const getReviews = async () => {
    const response = await fetch(baseURL + `/reviews/search/${id}`, {
      ...buildAuthHeaderToken(token),
      next: { tags: [`review-${id}`] },
    });
    const data = (await response.json()) as ReviewResponse;
    setReviews(data);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(`/reviews/delete/${id}`, {
        data: { path: window.location.pathname },
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const onDelete = async (id: string) => {
    startTransition(() => {
      setOptimisticReviews((state) => ({
        ...state,
        reviews: state?.reviews.filter((review) => review.bookId !== id),
      }));
    });
    await handleDelete(id);
    await getReviews();
  };

  useEffect(() => {
    try {
      getReviews();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  try {
    if (!reviews) {
      return <BookReviewsPlaceholder />;
    }

    // const { reviews: reviewList, reviewUser, totalReviews } = optimisticReviews?.reviews;

    const reviewListProps = {
      id,
      reviewList: optimisticReviews?.reviews,
      reviewUser: optimisticReviews?.reviewUser,
    };

    return (
      <div className="pt-8 mt-12 border-t">
        <BookReviewsHeader reviews={optimisticReviews?.totalReviews} />

        {/* {reviewList?.length > 0 && !loading ? ( */}
        <BookReviewList
          {...reviewListProps}
          reviewList={optimisticReviews?.reviews || []}
          reviewUser={
            optimisticReviews?.reviewUser || {
              hasReviewAvailable: false,
              reviewId: null,
            }
          }
          onDelete={onDelete}
        />
        {/* // ) : loading ? (
        //   <div className="py-5 text-center">loading...</div>
        // ) : (
        //   <BookReviewsPlaceholder />
        // )} */}

        <div className="flex items-center justify-center">
          <Button className="rounded-full px-3" asChild>
            <Link href={`/reviews/${id}`}>
              <span>
                <Icons.UserGroup />
              </span>
              See all Community Reviews ({optimisticReviews?.totalReviews || 0})
            </Link>
          </Button>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="pt-8 mt-12 border-t">
        <BookReviewsHeader reviews={0} />
        <div className="py-4 text-center text-red-500">
          Could not get reviews. Please reload.
        </div>{" "}
      </div>
    );
  }
};

export default BookReviews;
