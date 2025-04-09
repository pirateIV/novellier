"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/axios";
import { useBookReviews } from "@/lib/hooks/use-book-review";
import { getCookieValue } from "@/lib/user";
import { cn } from "@/lib/utils";
import type { Review } from "@/shared/types";
import { Pencil, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useImperativeHandle, useRef, useState } from "react";

export interface BookReviewDialogRef {
  openDialog: ({ mode }: { mode: "edit" | "delete" }) => void;
  closeDialog: () => void;
}

const BookReviewDialog = React.forwardRef<
  BookReviewDialogRef,
  {
    review: Review;
    onSave?: (review: { rating: number; content: string }) => void;
    onDelete?: () => void;
    actionMode?: "edit" | "delete";
  }
>(({ review, onSave, onDelete, actionMode }, ref) => {
  const params = useParams() as { book: string };
  const { updateOptimisticReview } = useBookReviews({ bookId: params.book });

  const [rating, setRating] = useState(review?.rating || 0);
  const [reviewText, setReviewText] = useState(review?.content || "");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [mode, setMode] = useState<"edit" | "delete">(actionMode || "edit");
  const [editMode, setEditMode] = useState<boolean>(false);

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleOpen = ({ mode }: { mode: "edit" | "delete" }) => {
    setMode(mode);
    dialogRef.current?.showModal();
  };

  useImperativeHandle(ref, () => ({
    openDialog: handleOpen,
    closeDialog: handleClose,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (onSave) {
    //   onSave({ rating, content: reviewText });
    // }
    // handleClose();
    console.log();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    handleClose();
  };

  const userID = getCookieValue("user_id");

  const handleEdit = async () => {
    console.log(userID);
    const updatedReviewData = { ...review, content: reviewText, rating };
    updateOptimisticReview(updatedReviewData);
    // console.log({ content: reviewText, rating});
    handleClose();
    const data = await apiClient.put(
      `/reviews/${review.id}`,
      updatedReviewData
    );
    console.log(data);
  };

  return (
    // <div className="flex items-center justify-center fixed inset-0">
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-xl fixed inset-1/2 -translate-1/2 bg-white dark:bg-neutral-900 w-full max-w-md p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
          Review Management
        </h2>

        <Tabs
          defaultValue="edit"
          value={mode}
          onValueChange={(value) => setMode(value as "edit" | "delete")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              <span>Edit Review</span>
            </TabsTrigger>
            <TabsTrigger value="delete" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              <span>Delete Review</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[5, 4, 3, 2, 1].map((_, i) => (
                    <button
                      key={i}
                      className={cn(
                        "text-2xl",
                        (hoverRating ?? rating) > i
                          ? "text-amber-500"
                          : "text-gray-300"
                      )}
                      onClick={() => setRating(i + 1)}
                      onMouseOver={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(null)}
                    >
                      {(hoverRating ?? rating) > i ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="reviewText"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Your Review
                </label>
                <textarea
                  id="reviewText"
                  name="reviewText"
                  rows={4}
                  className="w-full text-sm p-3 border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y"
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="outline"
                  className="h-9 text-sm font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-sm font-medium bg-amber-600 hover:bg-amber-600/80 text-white"
                  onClick={() => handleEdit()}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="delete" className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-100 dark:border-red-800">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">
                Delete Review
              </h3>
              <p className="text-red-700 dark:text-red-400 mb-4 text-[15px]">
                Are you sure you want to delete this review? This action cannot
                be undone.
              </p>

              <div className="flex flex-col space-y-2">
                <div className="bg-white dark:bg-neutral-800 p-3 rounded-md border border-neutral-200 dark:border-neutral-700">
                  <div className="flex mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        className={cn(
                          "text-2xl",
                          rating > i ? "text-amber-500" : "text-gray-300"
                        )}
                        // onClick={() => setRating(i + 1)}
                        // onMouseOver={() => setHoverRating(i + 1)}
                        // onMouseLeave={() => setHoverRating(null)}
                      >
                        {rating > i ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm line-clamp-3">
                    {reviewText || "No review content"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="outline"
                  className="h-9 text-sm font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleDelete}
                  variant="destructive"
                  className="h-9 text-sm font-medium"
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </dialog>
    // </div>
  );
});

BookReviewDialog.displayName = "BookReviewDialog";

export default BookReviewDialog;
