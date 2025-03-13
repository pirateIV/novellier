"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form, FormField } from "../ui/form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

const reviewSchema = z.object({
  review: z.string().min(1, "Your review must not be empty"),
  rating: z.number().min(1, "Rating must be at least 1"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const BookReviews = () => {
  const form = useForm({
    resolver: zodResolver<ReviewFormData>(reviewSchema),
    defaultValues: {
      review: "",
      rating: 1,
    },
  });

  const rating = form.watch("rating");
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const onSubmit = async (value: ReviewFormData) => {
    const { review, rating } = value;
    // await Book.create({ review, rating });
  };

  return (
    <div className="pt-8 mt-12 border-t">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Community Reviews</h2>
        <div className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full dark:bg-secondary">
          <span className="font-bold">0</span>{" "}
          <span className="text-gray-300">review(s)</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200 group dark:bg-zinc-900/55 dark:border-zinc-700">
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

          <Dialog>
            <DialogTrigger asChild>
              <Button className="group-2 border-t border-t-blue-500 bg-blue-600 rounded-sm dark:text-white hover:bg-blue-700 hover:brightness-90">
                Write a Review{" "}
                <span className="text-indigo-200 transition-transform group-2-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a Review</DialogTitle>
                <DialogDescription className="dark:text-gray-300">
                  What do you think about this book?
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-2">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        name="username"
                        value="@benabolade"
                        className="col-span-full inset-ring disabled:inset-ring-gray-700 disabled:placeholder:text-gray-500 disabled:cursor-not-allowed"
                        disabled
                      />
                    </div>

                    <div className="flex justify-end">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          className={`text-white ${
                            (hoverRating ?? rating) > i
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                          onClick={() => form.setValue("rating", i + 1)}
                          onMouseOver={() => setHoverRating(i + 1)}
                          onMouseLeave={() => setHoverRating(null)}
                        >
                          &#9733;
                        </button>
                      ))}
                    </div>

                    <div className="grid items-center gap-2">
                      <Label htmlFor="username" className="text-right">
                        Review
                      </Label>
                      <FormField
                        name="review"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea
                            className="w-full  text-sm border"
                            placeholder="Write your review here..."
                            rows={7}
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit" className="font-semibold">
                      Add review
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default BookReviews;
