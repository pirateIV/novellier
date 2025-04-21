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
import { apiClient } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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
  onUpdate?: (updatedReview: any) => void;
};

const BookReviewDialog = forwardRef<BookReviewDialogRef, BookReviewDialogProps>(
  ({ review, onUpdate }, ref) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit" | "delete">("create");
    const [isLoading, setIsLoading] = useState(false);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const router = useRouter();

    const form = useForm<ReviewFormValues>({
      resolver: zodResolver(reviewFormSchema),
      defaultValues: {
        rating: review?.rating || 0,
        content: review?.content || "",
      },
    });

    const rating = form.watch("rating");
    const displayRating = hoverRating !== null ? hoverRating : rating;
    const ratingLabels = ["Terrible", "Poor", "Average", "Good", "Excellent"];
    const ratingLabel =
      displayRating !== null && displayRating > 0
        ? ratingLabels[displayRating - 1]
        : "Select rating";

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
          const response = await apiClient.put(
            `/reviews/${review?._id ||review?.id}`,
            values
          );
          toast.success("Review updated successfully!");
          console.log(response?.data)
          onUpdate(response?.data)
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
        const reviewPost = await apiClient.delete(
          `/reviews/delete/${review._id}`
        );
        console.log({ reviewPost });
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
              <div className="flex items-center justify-between">
                <DialogTitle>
                  {mode === "create" ? "Write a Review" : "Edit Review"}
                </DialogTitle>
                {/* <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r shrink-0 from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Share your thoughts
                </motion.div> */}
              </div>
              <DialogDescription>
                Share your thoughts about this book with other readers.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                key={star}
                                onClick={() => field.onChange(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(null)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={cn(
                                    "h-10 w-10 transition-all duration-200",
                                    displayRating !== null &&
                                      star <= displayRating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  )}
                                />
                              </motion.button>
                            ))}
                          </div>
                          <motion.div
                            animate={{
                              opacity:
                                displayRating && displayRating > 0 ? 1 : 0,
                              y: displayRating && displayRating > 0 ? 0 : 10,
                            }}
                            className="h-6"
                          >
                            {displayRating && displayRating > 0 && (
                              <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                                {ratingLabel}
                              </span>
                            )}
                          </motion.div>
                        </div>
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
                          placeholder="What did you think about this book? What did you like or dislike? Would you recommend it to others?"
                          className="min-h-[120px] resize-none w-full p-3 rounded-lg text-sm bg-neutral-900/70 border border-neutral-800 outline-none focus:inset-ring-2 focus:inset-ring-orange-500 focus:border-transparent"
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
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6"
                  >
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
