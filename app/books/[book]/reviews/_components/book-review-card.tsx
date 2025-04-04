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
// import StarRating from "./star-rating" // Using your existing StarRating component

// Types based on the provided JSON data
type Review = {
  id: string;
  content: string;
  rating: number;
  reviewer: { firstName: string; lastName: string; fullName: string };
  book: string;
  bookId: string;
  createdAt: string;
  updatedAt: string;
};

type BookReviewCardProps = {
  review: Review;
};

export default function BookReviewCard({ review }: BookReviewCardProps) {
  // Format the date to a readable format
  const formattedDate = formatDate(new Date(review.createdAt));

  // Truncate long review content with "Read more" option
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isLongContent = review.content.length > 280;

  const displayContent =
    isExpanded || !isLongContent
      ? review.content
      : `${review.content.substring(0, 280)}...`;

  return (
    <Card className="overflow-hidden pb-0 mb-4 bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
      <CardHeader className="flex flex-row justify-between items-start p-4 pt-0 pb-0">
        <div className="flex items-center gap-3">
          <Avatar className={cn("w-10 h-10", getRandomColor(review.reviewer.firstName[0]))}>
            <AvatarFallback className="text-sm font-medium text-neutral-600 dark:text-neutral-300 bg-transparent">
              {review.reviewer.firstName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {review.reviewer.fullName}
              </p>
              <Badge
                variant="outline"
                className="h-5 px-2 text-xs font-normal text-neutral-500 rounded-full dark:text-neutral-400 dark:border-neutral-700"
              >
                Verified Reader
              </Badge>
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
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-neutral-600 dark:text-neutral-400"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Reply
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-neutral-600 dark:text-neutral-400"
        >
          Report
        </Button>
      </CardFooter>
    </Card>
  );
}
