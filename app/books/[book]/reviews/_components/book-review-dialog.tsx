"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/shared/components/StarRating";
import { apiClient } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(10).max(1000),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export type BookReviewDialogRef = {
  openDialog: (options: {
    mode: "create" | "edit" | "delete";
    review?: any;
  }) => void;
  closeDialog: () => void;
};

type BookReviewDialogProps = {
  review?: any;
};

const BookReviewDialog = forwardRef<BookReviewDialogRef, BookReviewDialogProps>(
  ({ review }, ref) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit" | "delete">("create");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ReviewFormValues>({
      resolver: zodResolver(reviewFormSchema),
      defaultValues: {
        rating: review?.rating || 0,
        content: review?.content || "",
      },
    });

    useImperativeHandle(ref, () => ({
      openDialog: (options) => {
        setMode(options.mode);
        if (options.mode !== "delete" && options.review) {
          form.reset({
            rating: options.review.rating,
            content: options.review.content,
          });
        }
        setOpen(true);
      },
      closeDialog: () => {
        setOpen(false);
      },
    }));

    const onSubmit = async (values: ReviewFormValues) => {
      setIsLoading(true);
      try {
        if (mode === "create") {
          await apiClient.post("/reviews", {
            ...values,
            bookId: review?.bookId,
          });
          toast.success("Review created successfully!");
        } else if (mode === "edit") {
          await apiClient.put(`/reviews/${review.id}`, values);
          toast.success("Review updated successfully!");
        }
        router.refresh();
        setOpen(false);
      } catch (error) {
        toast.error("Failed to submit review");
      } finally {
        setIsLoading(false);
      }
    };

    const handleDelete = async () => {
      setIsLoading(true);
      try {
        await apiClient.delete(`/reviews/${review.id}`);
        toast.success("Review deleted successfully!");
        router.refresh();
        setOpen(false);
      } catch (error) {
        toast.error("Failed to delete review");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {mode !== "delete" ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mode === "create" ? "Write a Review" : "Edit Review"}
              </DialogTitle>
              <DialogDescription>
                Share your thoughts about this book with other readers.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <StarRating
                          rating={field.value}
                          // onRatingChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts about this book..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Review"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Review</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this review? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Review"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    );
  }
);

BookReviewDialog.displayName = "BookReviewDialog";

export default BookReviewDialog;