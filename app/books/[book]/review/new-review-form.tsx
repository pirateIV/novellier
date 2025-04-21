"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Send, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";
import Guidelines from "./guideline";
import useGetParams from "../reviews/[review]/useGetParams";
import { apiClient } from "@/lib/axios";
import { getCookieValue } from "@/lib/user";
import { AxiosError } from "axios";

export default function NewReviewForm({ bookId }: { bookId: string }) {
  const router = useTransitionRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { title, author, authorId, bookCover } = useGetParams();

  useEffect(() => {
    setUserId(getCookieValue("user_id"));
  }, []);

  // if(!title || !author || !authorId || !bookCover) {
  //   router.back()
  // }

  const displayRating = hoverRating !== null ? hoverRating : rating;
  const ratingLabels = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  const ratingLabel =
    displayRating !== null ? ratingLabels[displayRating - 1] : "Select rating";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast("Rating required", {
        description: "Please select a rating before submitting your review",
      });
      return;
    }

    setIsSubmitting(true);
    const payload = {
      review: { content: reviewText, rating },
      book: { bookId, authorId, author, reviewer: userId, title },
    };

    try {
      const res = await apiClient.post(`/reviews/add`, payload);
      console.log(res.data);

      toast("Review submitted!", {
        description: "Thank you for sharing your thoughts",
      });

      if(res.data) {
        // router.push('/')
      }

      console.log({ context: reviewText, rating });

      // Redirect back to the book page
      // router.push(`/books/${bookId}`);
    } catch (error: AxiosError | any) {
      if (error?.response?.data?.error) {
        toast(error?.response?.data?.error, {
          description: "You have an existing review for this book",
        });
        return;
      }
      toast("Something went wrong", {
        description: "Your review couldn't be submitted. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-1"
        onClick={() =>
          router.push(
            `/books/${bookId}?title=${title}&book_cover_id=${bookCover}`
          )
        }
      >
        <span className="dark:text-gray-400">←</span>
        <span className="text-[13px] md:text-sm font-medium text-zinc-900 dark:text-white hover:underline md:font-semibold">
          Back to Book
        </span>
      </button>
      {/* <button
        onClick={() =>
          router.push(
            `/books/${bookId}?title=${title}&book_cover_id=${bookCover}`
          )
        }
        className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to book
      </button> */}

      <div className="grid md:grid-cols-[300px_1fr] gap-8 bg-gradient-to-br  rounded-xl p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r  rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <Image
                src={`https://covers.openlibrary.org/b/id/${bookCover}-L.jpg`}
                alt={title!}
                width={240}
                height={360}
                className="rounded-lg shadow-md object-cover book"
                priority
              />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-libre font-bold text-center">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {author}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Write Your Review</h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r shrink-0 from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Share your thoughts
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
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
              <textarea
                id="review"
                placeholder="What did you think about this book? What did you like or dislike? Would you recommend it to others?"
                rows={6}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="resize-none w-full p-3 rounded-lg !min-h-36 text-sm bg-neutral-900/70  border border-neutral-800 outline-none focus:inset-ring-2 focus:inset-ring-orange-500 focus:border-transparent"
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
                  disabled={isSubmitting || !rating || reviewText.length <= 4}
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

      <Guidelines />
    </div>
  );
}
