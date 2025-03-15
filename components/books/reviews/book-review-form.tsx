import React, { useState } from "react";
import { useParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookContext } from "@/context/book-context";
import { apiClient } from "@/lib/axios";

const reviewSchema = z.object({
  content: z.string().min(1, "Your review must not be empty"),
  rating: z.number().min(1, "Rating must be at least 1"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;
import { DialogTrigger } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
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

const BookReviewForm = () => {
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
          bookId: params.id,
          author: author.name,
          authorId: author.authorId,
          title: book.title,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    form.reset();
  };

  const submitting = form.formState.isSubmitting;
  return (
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
                      className="w-full text-sm border row-span-6 min-h-24"
                      placeholder="Write your review here..."
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
