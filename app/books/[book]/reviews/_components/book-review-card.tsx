"use client";

import React from "react";
import { MessageSquare, ThumbsUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/shared/components/StarRating";
import { cn } from "@/lib/utils";
import { getRandomColor } from "@/lib/helpers";
import { formatDate } from "@/shared/utils";

type Review = {
  id: string;
  content: string;
  rating: number;
  reviewer: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  book: string;
  bookId: string;
  createdAt: string;
  updatedAt: string;
};

type BookReviewCardProps = {
  review: Review;
};

function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export default function BookReviewCard({ review }: BookReviewCardProps) {
  const formattedDate = formatDate(new Date(review.createdAt));
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isLongContent = review.content.length > 280;

  const displayContent =
    isExpanded || !isLongContent
      ? review.content
      : `${review.content.substring(0, 280)}...`;

  const userID = getCookieValue("user_id");
  const isUserReview = userID === review.reviewer.id; // Check if this is the user's review

  return (
    <Card className="overflow-hidden pb-0 mb-4 bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
      <CardHeader className="flex flex-row justify-between items-start p-4 pt-0 pb-0">
        <div className="flex items-center gap-3">
          <Avatar
            className={cn(
              "w-10 h-10",
              getRandomColor(review.reviewer.firstName[0])
            )}
          >
            <AvatarFallback className="text-sm font-medium text-neutral-600 dark:text-neutral-300 bg-transparent">
              {review.reviewer.firstName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {review.reviewer.fullName}
              </p>
              {isUserReview && (
                <Badge
                  variant="default"
                  className="h-5 px-2 text-xs font-normal rounded-full"
                >
                  Your Review
                </Badge>
              )}
              {!isUserReview && (
                <Badge
                  variant="outline"
                  className="h-5 px-2 text-xs font-normal text-neutral-500 rounded-full dark:text-neutral-400 dark:border-neutral-700"
                >
                  Verified Reader
                </Badge>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          {displayContent}
        </p>
        {isLongContent && (
          <Button
            variant="link"
            className="h-auto p-0 text-xs font-medium text-neutral-600 dark:text-neutral-400"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Read more"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-3 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-neutral-600 dark:text-neutral-400"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            Helpful
          </Button>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          {isUserReview && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-red-500"
            >
              Delete
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-neutral-600 dark:text-neutral-400"
          >
            Report
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
