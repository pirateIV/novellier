"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Send, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

type BookData = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
};

export default function NewReviewForm({
  bookId,
  bookData,
}: {
  bookId: string;
  bookData: BookData;
}) {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const bookCoverId = searchParams.get("book_cover");

  const displayRating = hoverRating !== null ? hoverRating : rating;
  const ratingLabels = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  const ratingLabel =
    displayRating !== null ? ratingLabels[displayRating - 1] : "Select rating";

    console.log({searchParams})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast("Rating required", {
        description: "Please select a rating before submitting your review",
        // variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // This would be your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Review submitted!", {
        description: "Thank you for sharing your thoughts",
      });

      // Redirect back to the book page
      router.push(`/books/${bookId}`);
    } catch (error) {
      toast("Something went wrong", {
        description: "Your review couldn't be submitted. Please try again.",
        // variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Link
        href={`/books/${bookId}`}
        className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to book
      </Link>

      <div className="grid md:grid-cols-[300px_1fr] gap-8 bg-gradient-to-br  rounded-xl p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r  rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <Image
                src={`https://covers.openlibrary.org/b/id/${bookCoverId}-L.jpg`}
                alt={bookData.title}
                width={240}
                height={360}
                className="rounded-lg shadow-md object-cover"
                style={{viewTransitionName: "book-cover"}}
              />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-bold text-center">
            {bookData.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {bookData.author}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Write Your Review</h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Share your thoughts
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Rating
              </label>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          "h-10 w-10 transition-all duration-200",
                          displayRating !== null && star <= displayRating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        )}
                      />
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  animate={{
                    opacity: displayRating ? 1 : 0,
                    y: displayRating ? 0 : 10,
                  }}
                  className="h-6"
                >
                  {displayRating && (
                    <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                      {ratingLabel}
                    </span>
                  )}
                </motion.div>
              </div>
            </div>

            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium mb-2"
              >
                Your Review
              </label>
              <Textarea
                id="review"
                placeholder="What did you think about this book? What did you like or dislike? Would you recommend it to others?"
                rows={6}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full resize-none bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-500">
                {reviewText.length}/2000 characters
              </p>
            </div>

            <div className="flex justify-end">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || !rating}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Review
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-medium mb-4">Review Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            Focus on your experience with the book and why you did or didn't
            enjoy it
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            Avoid spoilers or use spoiler warnings when discussing key plot
            elements
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            Be respectful and constructive in your criticism
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            Your review will be visible to the community after submission
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
