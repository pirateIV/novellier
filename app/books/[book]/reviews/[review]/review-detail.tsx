"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/shared/utils";
import { Link } from "next-view-transitions";
import {
  Star,
  ThumbsUp,
  Share2,
  Flag,
  Edit,
  Trash2,
  ArrowLeft,
  MessageSquare,
  Check,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Review } from "../_components/book-review-card";
import useGetParams from "./useGetParams";
import { getCookieValue } from "@/lib/user";
import { getRandomColor } from "@/lib/helpers";
import { apiClient } from "@/lib/axios";

type ReviewDetailProps = {
  bookID: string;
  reviewID: string;
  review: Review;
};

export default function ReviewDetail({
  bookID,
  reviewID,
  review,
}: ReviewDetailProps) {
  // const userID = getCookieValue("user_id");
  const [userID, setUserID] = useState("");

  const isAuthor = review?.reviewer?.id === userID;

  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
  // Update your useState initialization to check if user already voted
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(
    review.helpful?.has?.(userID)
  );

  console.log({ review });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { title, author, bookCover } = useGetParams();

  useEffect(() => {
    setUserID(getCookieValue("user_id")!);
  }, []);

  useEffect(() => {
    if (userID) {
      setHasMarkedHelpful(review.helpful[userID] || false);
    }
  }, [userID, review.helpful]);

  console.log({ hasMarkedHelpful });

  // useEffect(() => {
  //   const helpful = review.helpful[userID];
  // console.log({helpful})
  //   if (helpful) {
  //     setHasMarkedHelpful(helpful);
  //   } else {
  //     setHasMarkedHelpful(false)
  //   }
  // }, [review]);

  // const helpful = review.helpful.size || 0;

  // console.log({ hasMarkedHelpful, helpful: review.helpful[userID] });

  const handleMarkHelpful = async () => {
    if (!userID) return;

    const oldCount = helpfulCount;
    const markedHelpful = hasMarkedHelpful;

    setHasMarkedHelpful(!hasMarkedHelpful);
    setHelpfulCount((count: number) =>
      hasMarkedHelpful ? count - 1 : count + 1
    );

    try {
      const { data } = await apiClient.post(`/reviewsv2/${reviewID}/helpful`, {
        userID,
      });

      // Update with actual server response
      if (data?.review) {
        setHelpfulCount(data.review.helpfulCount);
        setHasMarkedHelpful(data.review.helpful[userID]);
      }

      if (hasMarkedHelpful) {
        toast("Marked as helpful", {
          description: "Thank you for your feedback!",
        });
      }
    } catch (error) {
      setHelpfulCount((count: number) =>
        hasMarkedHelpful ? count - 1 : count + 1
      );
      setHasMarkedHelpful(!hasMarkedHelpful);
      toast("Something went wrong", {
        description: "Could not mark review as helpful",
      });
    }
  };

  const handleDeleteReview = async () => {
    if (!isAuthor) return;

    setIsDeleting(true);
    try {
      // This would be your actual API call
      // await fetch(`/api/reviews/${review._id}`, { method: 'DELETE' })

      toast("Review deleted", {
        description: "Your review has been successfully deleted",
      });

      // // Redirect back to the book page
      // window.location.href = `/books/${bookID}`;
    } catch (error) {
      toast("Something went wrong", {
        description: "Could not delete your review",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleShareReview = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Review of ${title} by ${
            `${review.reviewer?.firstName} ${review.reviewer?.lastName}` ||
            "Anonymous"
          }`,
          text: review.content?.substring(0, 100) + "...",
          url: window.location.href,
        })
        .catch(() => {
          // Fallback if share fails
          copyToClipboard();
        });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied", {
      description: "Review link copied to clipboard",
    });
  };

  const handleReportReview = () => {
    toast("Report submitted", {
      description: "Thank you for helping keep our community safe",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href={`/books/${bookID}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to book
        </Link>

        {!isAuthor && userID && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleReportReview}
                className="cursor-pointer"
              >
                <Flag className="mr-2 h-4 w-4" />
                Report review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/books/${bookID}/reviews/${review._id}/edit`}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit review
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-500 cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Card className="overflow-hidden bg-transparent border-y-0 rounded-none">
        <CardContent className="px-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border">
              {/*  {review.reviewer?.profileImage ? (
                <AvatarImage
                  src={review.reviewer.profileImage}
                  alt={review.reviewer.fullName || "User"}
                />
              ) : (
                )}
                */}
              <AvatarFallback
                className={getRandomColor(review.reviewer?.firstName)}
              >
                {review.reviewer?.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="font-semibold font-inter text-[15px]">
                    {review.reviewer?.fullName || "Anonymous"}
                  </h2>
                  <time
                    className="font-medium text-gray-400 text-xs"
                    dateTime={review.createdAt}
                  >
                    {formatDate(review.createdAt)}
                  </time>
                  {review.updatedAt !== review.createdAt && (
                    <span className="text-xs ml-1">
                      (Edited on {formatDate(review.updatedAt)})
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {review.content}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="px-4  flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {!isAuthor && userID && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 hover:bg-white/5 ${
                  hasMarkedHelpful ? "text-blue-500 hover:text-blue-500" : ""
                }`}
                onClick={handleMarkHelpful}
                disabled={!userID}
              >
                <ThumbsUp
                  className={`h-4 w-4 ${
                    hasMarkedHelpful
                      ? "fill-blue-500 text-blue-500"
                      : "text-gray-300"
                  }`}
                />
                <span
                  className={
                    hasMarkedHelpful ? "text-blue-500" : "text-gray-300"
                  }
                >
                  Helpful ({helpfulCount})
                </span>
              </Button>
            )}

            {isAuthor && (
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>
                  {helpfulCount} {helpfulCount === 1 ? "person" : "people"}{" "}
                  found this helpful
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleShareReview}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            {isAuthor && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/books/${bookID}/reviews/${review._id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* <div className="bg-gray-50 dark:bg-gray-800/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-medium">About this book</h3>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={bookCover || "/placeholder.svg?height=120&width=80"}
            alt={title!}
            className="w-20 h-30 object-cover rounded-md shadow-sm"
          />

          <div>
            <h4 className="font-semibold">{title || "Book Title"}</h4>
            <p className="text-sm text-gray-500">{author || "Author Name"}</p>
            <Link
              href={`/books/${bookID}`}
              className="text-sm text-primary hover:underline mt-2 inline-block"
            >
              View book details
            </Link>
          </div>
        </div>
      </div> */}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your review. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReview}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
