"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookContext } from "@/context/BookContext";
import { apiClient } from "@/lib/axios";

const reviewSchema = z.object({
  content: z.string().min(1, "Your review must not be empty"),
  rating: z.number().min(1, "Rating must be at least 1"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;
import { DialogTrigger } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Form, FormField } from "../../ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Textarea } from "../../ui/textarea";

const BookReviewForm = ({
  children,
  bookId = "",
}: {
  children: React.ReactNode;
  bookId?: string;
}) => {
  const params = useParams();
  const { author, book } = useBookContext();
  const form = useForm({
    resolver: zodResolver<ReviewFormData>(reviewSchema),
    defaultValues: {
      content: "",
      rating: 3,
    },
  });

  const rating = form.watch("rating");
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const onSubmit = async (values: ReviewFormData) => {
    try {
      const response = await apiClient.post("/reviews/add", {
        review: values,
        book: {
          bookId: params.id || bookId,
          author: author.name,
          authorId: author.authorId,
          title: book.title,
        },
        path: window.location.pathname,
      });

      // if (response.data) {
      //   revalidatePath(window.location.pathname);
      // }

      // if (response.data.data) {
      //   window.location.reload();
      // }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    form.reset();
  };

  const submitting = form.formState.isSubmitting;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[495px]">
        <DialogHeader>
          <DialogTitle>Add a Review</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            What do you think about this book?
          </DialogDescription>
          <div>
            <h1 className="font-semibold text-center mt-2 font-sans dark:text-white text-base">
              {book.title}
            </h1>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* <div className="grid items-center gap-2">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  name="username"
                  value="@benabolade"
                  className="col-span-full inset-ring disabled:inset-ring-gray-700 disabled:placeholder:text-gray-500 disabled:cursor-not-allowed"
                  disabled
                />
              </div> */}

              <div className="flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "text-2xl",
                      (hoverRating ?? rating) > i
                        ? "text-amber-500"
                        : "text-gray-300"
                    )}
                    onClick={() => form.setValue("rating", i + 1)}
                    onMouseOver={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(null)}
                  >
                    {(hoverRating ?? rating) > i ? "★" : "☆"}
                  </button>
                ))}
              </div>

              <div className="grid items-center gap-2">
                <Label htmlFor="username" className="text-right">
                  Review
                </Label>
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <Textarea
                      className="w-full text-sm border row-span-6 min-h-56"
                      placeholder="Your feedback help others decide what books to read."
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="font-semibold"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookReviewForm;
