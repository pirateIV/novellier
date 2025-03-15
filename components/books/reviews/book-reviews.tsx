"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { apiClient } from "@/lib/axios";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import BookReviewsHeader from "./book-reviews-header";
import BookReviewsPlaceholder from "./book-reviews-placeholder";
import { PenLine } from "lucide-react";
import Link from "next/link";

const BookReviews = () => {
  const params = useParams();

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      console.log("getting data...");
      try {
        const data = (await apiClient.get(`/reviews/search/${params.id}`)).data;
        setReviews(data?.reviews);
        console.log(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, [params.id]);

  const reviewCount = reviews?.length > 0 ? reviews?.length : 0;

  return (
    <div className="pt-8 mt-12 border-t">
      <BookReviewsHeader reviews={reviewCount} />

      {reviews?.length > 0 ? (
        <div className="rounded-(--card-radius) outline -outline-offset-1 p-(--card-padding) [--card-padding:--spacing(3)] [--card-radius:var(--radius-4xl)] bg-gray-50/30">
          <div className="divide-y p-3 bg-background rounded-[calc(var(--card-radius)-var(--card-padding))] shadow-xs shadow-gray-900/10 outline">
            {reviews?.map((review) => (
              <div key={review?.id}>
                <div className="relative flex items-start py-4 space-x-4 hover:bg-gray-50">
                  <div className="avatar-fallback size-10 overflow-hidden rounded-full border">
                    <Image
                      src={review?.user?.avatar}
                      alt={review?.user?.name}
                      className="size-full bg-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      John Doe
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <div
                              className={cn(
                                "size-3 flex items-center justify-center",
                                i < review?.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300 fill-gray-300"
                              )}
                            >
                              ★
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
                      <p className="flex-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                        {review?.content}
                      </p>
                    </div>
                  </div>
                  <span className="absolute inset-0">
                    <Link className="size-full" href={`/reviews/${review?.id}`} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button size="icon" className="mt-3 text-xs w-full ml-auto">
            <PenLine />
            Review
          </Button>
        </div>
      ) : (
        <BookReviewsPlaceholder />
      )}
    </div>
  );
};

export default BookReviews;
