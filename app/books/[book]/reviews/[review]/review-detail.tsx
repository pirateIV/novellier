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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRating from "@/shared/components/StarRating";
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
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Review } from "../_components/book-review-card";
import useGetParams from "./useGetParams";
import { getCookieValue } from "@/lib/user";
import { getRandomColor } from "@/lib/helpers";
import { apiClient } from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [userID, setUserID] = useState("");
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(review.content);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  const isAuthor = review?.reviewer?.id === userID;

  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);
  const [isMarkingHelpful, setIsMarkingHelpful] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const { title, author, bookCover } = useGetParams();

  useEffect(() => {
    setUserID(getCookieValue("user_id")!);
  }, []);

  useEffect(() => {
    if (userID && review.helpful) {
      setHasMarkedHelpful(!!review.helpful[userID]);
    }
  }, [userID, review.helpful]);

  const handleEditReview = async () => {
    if (!isAuthor || !userID) return;

    setIsSubmittingEdit(true);
    try {
      const { data } = await apiClient.put(`/reviewsv2/${reviewID}`, {
        content: editedContent,
        rating: editedRating,
      });

      toast("Review updated", {
        description: "Your changes have been saved",
      });

      // Refresh the page to show updated content
      window.location.reload();
    } catch (error) {
      toast("Something went wrong", {
        description: "Could not update your review",
      });
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleMarkHelpful = async () => {
    if (!userID) {
      toast("Sign in required", {
        description: "Please sign in to mark reviews as helpful",
      });
      return;
    }

    setIsMarkingHelpful(true);
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

      if (!hasMarkedHelpful) {
        toast("Marked as helpful", {
          description: "Thank you for your feedback!",
        });
      } else {
        toast("Removed helpful mark", {
          description: "Your feedback has been updated",
        });
      }
    } catch (error) {
      setHelpfulCount(oldCount);
      setHasMarkedHelpful(markedHelpful);
      toast("Something went wrong", {
        description: "Could not mark review as helpful",
      });
    } finally {
      setIsMarkingHelpful(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!isAuthor || !userID) return;

    setIsDeleting(true);
    try {
      await apiClient.delete(`/reviewsv2/${reviewID}`);

      toast("Review deleted", {
        description: "Your review has been successfully deleted",
      });

      // Redirect back to the book page
      window.location.href = `/books/${bookID}`;
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

  const handleReportReview = async () => {
    if (!userID) {
      toast("Sign in required", {
        description: "Please sign in to report reviews",
      });
      return;
    }

    setIsReporting(true);
    try {
      await apiClient.post(`/reviewsv2/${reviewID}/report`, {
        userID,
        reason: "inappropriate content",
      });

      toast("Report submitted", {
        description: "Thank you for helping keep our community safe",
      });
    } catch (error) {
      toast("Something went wrong", {
        description: "Could not submit your report",
      });
    } finally {
      setIsReporting(false);
    }
  };

  const isEdited = review.updatedAt > review.createdAt;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          className="inline-flex items-center font-semibold text-sm text-gray-100 hover:text-primary transition-colors"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </button>

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
                disabled={isReporting}
              >
                {isReporting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Reporting...
                  </>
                ) : (
                  <>
                    <Flag className="mr-2 h-4 w-4" />
                    Report review
                  </>
                )}
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
              <DropdownMenuItem
                onClick={() => setEditDialogOpen(true)}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit review
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

      <Card className="overflow-hidden border rounded-none sm:rounded-lg py-0.5 gap-3 bg-zinc-900/30 shadow-sm">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback
                className={getRandomColor(review.reviewer?.firstName)}
              >
                {review.reviewer?.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center">
                    <h2 className="font-semibold font-inter text-[15px]">
                      {review.reviewer.firstName} {review.reviewer.lastName}
                    </h2>
                    {isAuthor && (
                      <Badge variant="outline" className="ml-2 text-xs py-0">
                        You
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center flex-wrap gap-x-2 text-xs text-gray-500">
                    <time dateTime={review.createdAt}>
                      {formatDate(review.createdAt)}
                    </time>
                    {isEdited && (
                      <span className="text-xs">
                        (Updated {formatDate(review.updatedAt)})
                      </span>
                    )}
                  </div>
                </div>

                {review.rating && (
                  <div className="flex items-center">
                    <StarRating rating={review.rating} />
                    <span className="ml-2 text-sm font-medium">
                      {review.rating}/5
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">
                <p className="text-[13px] sm:text-sm leading-relaxed whitespace-pre-line break-words">
                  {review.content}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="px-3 sm:px-6 py-3">
          <div className="w-full flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              {!isAuthor ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${
                    hasMarkedHelpful ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={handleMarkHelpful}
                  disabled={!userID || isMarkingHelpful}
                >
                  {isMarkingHelpful ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <ThumbsUp
                      className={`h-4 w-4 ${
                        hasMarkedHelpful ? "fill-blue-500 text-blue-500" : ""
                      }`}
                    />
                  )}
                  <span>Helpful {helpfulCount > 0 && `(${helpfulCount})`}</span>
                </Button>
              ) : (
                <div className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-zinc-900 rounded-full py-1 px-3 flex items-center gap-2">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful ({helpfulCount})</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShareReview}
                className="text-gray-400 text-[13px] hover:text-gray-300"
              >
                <Share2 className="size-3.5" />
                Share
              </Button>

              {isAuthor && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditDialogOpen(true)}
                  className="text-gray-400 text-[13px] hover:text-gray-300"
                >
                  <Edit className="size-3.5" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Edit Review Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Edit Review</span>
              <button
                onClick={() => setEditDialogOpen(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                <StarRating
                  rating={editedRating}
                  onRatingChange={setEditedRating}
                  editable
                />
                <span className="text-sm text-muted-foreground">
                  {editedRating}/5
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Review
              </label>
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[200px]"
                placeholder="Share your thoughts about this book..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isSubmittingEdit}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditReview}
              disabled={isSubmittingEdit || !editedContent.trim()}
            >
              {isSubmittingEdit ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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