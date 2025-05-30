"use client";

import React, { useRef } from "react";
import { ThumbsUp } from "lucide-react";
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
import { getCookieValue } from "@/lib/user";
import BookReviewDialog, { BookReviewDialogRef } from "./book-review-dialog";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

export type Review = {
  updatedAt: string;
  _id: string;
  id: string;
  content: string;
  rating: number;
  reviewer: {
    _id: boolean;
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  book: string;
  bookId: string;
  createdAt: string;
  helpful: { [key: string]: boolean };
  helpfulCount: number;
};

type BookReviewCardProps = {
  review: Review;
  onMarkHelpful: (reviewId: string, isHelpful: boolean) => void;
};

export default function BookReviewCard({
  review,
  onMarkHelpful,
}: BookReviewCardProps) {
  const { book } = useParams() as { book: string };
  const isMobile = useIsMobile();
  const formattedDate = formatDate(new Date(review.createdAt));
  const [isExpanded, setIsExpanded] = React.useState(false);

  const contentLength = isMobile ? 240 : 280;
  const isLongContent = review.content.length > contentLength;

  const displayContent =
    isExpanded || !isLongContent
      ? review.content
      : `${review.content.substring(0, contentLength)}...`;

  const userID = getCookieValue("user_id");
  const isUserReview = userID === review.reviewer.id || review.reviewer._id;
  const hasMarkedHelpful = userID ? review.helpful?.[userID] : false;

  console.log({ hasMarkedHelpful, isUserReview });

  const reviewDialogRef = useRef<BookReviewDialogRef>(null);

  const handleMarkHelpful = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userID) {
      toast("Sign in required", {
        description: "Please sign in to mark reviews as helpful",
      });
      return;
    }

    onMarkHelpful(review.id, !hasMarkedHelpful);
  };

  return (
    <Card className="overflow-hidden sm:-mx-0 rounded-none pb-0 border border-neutral-800/50 sm:first-of-type:rounded-t-xl sm:last-of-type:rounded-b-xl bg-transparent">
      <Link
        href={`/books/${book}/reviews/${review.id || review._id}`}
        className="space-y-2 md:space-y-4"
      >
        <CardHeader className="flex flex-row justify-between items-start p-4 pt-0 pb-0">
          <div className="flex items-center gap-3">
            <Avatar
              className={cn(
                "size-9 sm:size-10",
                getRandomColor(review.reviewer.firstName)
              )}
            >
              <AvatarFallback className="text-sm font-medium text-neutral-600 dark:text-neutral-300 bg-transparent">
                {review.reviewer.firstName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {review.reviewer.firstName} {review.reviewer.lastName}
                </p>
                {isUserReview && (
                  <Badge
                    variant="default"
                    className="h-5 px-2 text-xs font-normal rounded-full"
                  >
                    Your Review
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
        <CardContent className="px-4 sm:px-6">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {displayContent}
          </p>
          {isLongContent && (
            <Button
              variant="link"
              className="h-auto p-0 text-xs font-medium text-neutral-600 dark:text-neutral-400 relative z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between py-1.5 sm:p-3 border-t border-neutral-100 dark:border-neutral-800 dark:border-t-white/5">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-neutral-600 dark:text-neutral-400"
            onClick={handleMarkHelpful}
            disabled={isUserReview}
          >
            <ThumbsUp
              className={`h-3.5 w-3.5 ${
                hasMarkedHelpful ? "text-blue-500 fill-blue-500" : ""
              }`}
            />
          {isUserReview
            ? `${review?.helpful ? Object.values(review.helpful)?.length : 0} persons(s) found this helpful`
            : (
              <>
                Helpful
                <span className="-ml-1">
                  ({review?.helpful ? Object.values(review.helpful)?.length : 0})
                </span>
              </>
            )}
          </Button>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          {isUserReview && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs text-red-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                reviewDialogRef.current?.openDialog({ mode: "delete" });
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </CardFooter>

      {isUserReview && (
        <BookReviewDialog ref={reviewDialogRef} review={review} />
      )}
    </Card>
  );
}
