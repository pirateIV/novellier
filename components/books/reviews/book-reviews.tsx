"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { apiClient } from "@/lib/axios";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import BookReviewsHeader from "./book-reviews-header";
import BookReviewsPlaceholder from "./book-reviews-placeholder";
import { Loader, PenLine, Star } from "lucide-react";
import Link from "next/link";
import BookReviewForm from "./book-review-form";

// Helper component to render a single review
const ReviewItem = ({ review }: { review: any }) => {
  return (
    <div key={review?.id}>
      <div className="relative flex items-start py-4 space-x-4 hover:bg-gray-50 dark:hover:bg-white/[.04] p-2 rounded-lg">
        <div className="avatar-fallback size-10 overflow-hidden rounded-full border shrink-0">
          <Image
            src={null}
            alt={review?.user?.name}
            height="100"
            width="100"
            className="size-full bg-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-gray-900 dark:text-white">
            {review?.reviewer?.fullName}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "size-3 flex items-center justify-center text-amber-500",
                      i < review?.rating ? " *:fill-amber-500" : ""
                    )}
                  >
                    <Star />
                  </div>
                ))}
            </div>
            <span>&middot;</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(new Date(review?.createdAt))}
            </p>
          </div>
          <div className="mt-2">
            <p className="flex-1 text-gray-700 w-fit dark:text-gray-300 text-sm font-medium font-sans">
              {review?.content}
            </p>
          </div>
        </div>
        <span className="absolute inset-0">
          <Link className="size-full" href={`/reviews/${review?.id}`} />
        </span>
      </div>
    </div>
  );
};

// Main component
const BookReviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(`/reviews/search/${params.id}`);
        setReviews(response.data?.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [params.id]);

  const reviewCount = reviews?.length || 0;

  console.log(reviews)

  if (error) {
    return (
      <div className="pt-8 mt-12 border-t">
        <BookReviewsHeader reviews={0} />
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="pt-8 mt-12 border-t">
      <BookReviewsHeader reviews={reviewCount} />

      {isLoading ? (
        <div className="text-center py-12 flex justify-center">
            <Loader className="animate-spin"/>
        </div>
      ) : reviews?.length > 0 ? (
        <div className="relative rounded-(--card-radius) outline dark:outline-zinc-800 -outline-offset-1 p-(--card-padding) [--card-padding:--spacing(3)] [--card-radius:var(--radius-4xl)] bg-gray-50/30 dark:bg-neutral-900/50">
          <div className="divide-y p-3 bg-background rounded-[calc(var(--card-radius)-var(--card-padding))] shadow-xs shadow-gray-900/10 outline dark:outline-zinc-800">
            {reviews.map((review) => (
              <ReviewItem key={review?.id} review={review} />
            ))}
          </div>
          <BookReviewForm>
            <Button
              size="icon"
              className="mt-3 text-xs w-fit px-3 ml-auto absolute bottom-5 right-5"
            >
              <PenLine />
              Review
            </Button>
          </BookReviewForm>
        </div>
      ) : (
        <BookReviewsPlaceholder />
      )}
    </div>
  );
};

export default BookReviews;
