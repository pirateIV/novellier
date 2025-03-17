import React from "react";
import Image from "next/image";
import BookReviewForm from "./book-review-form";
import { Button } from "@/components/ui/button";

const BookReviewsPlaceholder = () => {
  return (
    <div className="flex flex-col justify-center items-center p-8 text-center mt-2 bg-gray-50 rounded-lg border border-gray-200 border-dashed group dark:bg-zinc-900/55 dark:border-zinc-700">
      <Image
        src="/reviews.png"
        height="80"
        width="80"
        alt="review image"
        className="opacity-10 dark:invert group-hover:opacity-20"
      />
      <div className="mt-4">
        <h3 className="font-medium">No Reviews</h3>
        <p className="mb-7 text-sm text-gray-700 dark:text-zinc-300">
          No reviews yet. Share your thoughts on this book!
        </p>

        <BookReviewForm>
        <Button className="group-2 border-t border-t-blue-500 bg-blue-600 rounded-sm dark:text-white hover:bg-blue-700 hover:brightness-90">
          Write a Review{" "}
          <span className="text-indigo-200 transition-transform group-2-hover:translate-x-0.5">
            &rarr;
          </span>
        </Button>
        </BookReviewForm>
      </div>
    </div>
  );
};

export default BookReviewsPlaceholder;
