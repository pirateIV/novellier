"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StarRatingList from "@/shared/components/StarRatingList";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { apiClient } from "@/lib/axios";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(date)
  );

const BookReviewItem = ({
  review,
  isUserReview = false,
  onDelete
}:
{
  review: any;
  isUserReview?: boolean;
  onDelete: () => void
}) => {
  const params = useParams() as { id: string };

  const handleEdit = () => {
    console.log("Edit review:", review.id);
  };

  return (
    <div className="relative flex items-start py-4 px-6 space-x-4 hover:bg-gray-50 dark:hover:bg-zinc-900 first-of-type:rounded-t-lg last-of-type:rounded-b-lg transition-colors">
      {/* Avatar */}
      <div className="size-10 shrink-0 rounded-full border bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {review.reviewer.fullName.charAt(0)}
        </span>
      </div>

      {/* Review Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {review.reviewer.fullName}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <StarRatingList rating={review.rating} />
              <span className="text-gray-400 dark:text-gray-500">·</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>

          {/* Dropdown for User Actions */}
          {isUserReview && (
            <div className="relative z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <EllipsisVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={handleEdit}
                    className="flex items-center gap-2 cursor-pointer text-[13px]"
                  >
                    <Pencil size={16} />
                    Edit Review
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 flex items-center gap-2 cursor-pointer text-[13px]"
                        onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
                      >
                        <Trash2 size={16} />
                        Delete Review
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Review</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete your review? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-6">
          {review.content}
        </p>
      </div>

      {/* Invisible Link Overlay */}
      <span className="absolute inset-0 z-0">
        <Link href={`/reviews/${params.id}`} className="block size-full" />
      </span>
    </div>
  );
};

export default BookReviewItem;
