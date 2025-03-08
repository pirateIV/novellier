"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { BookFormValues } from "./add-book-form";

interface BookReviewSectionProps {
  form: UseFormReturn<BookFormValues>;
}

export function BookReviewSection({ form }: BookReviewSectionProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-4">Your Review</h2>

        <div className="space-y-5">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating*</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(Number.parseInt(value))
                  }
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white dark:bg-gray-950">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-muted-foreground ml-2">
                          1 - Poor
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★★</span>
                        <span className="text-muted-foreground ml-2">
                          2 - Fair
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★★★</span>
                        <span className="text-muted-foreground ml-2">
                          3 - Good
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="4">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★★★★</span>
                        <span className="text-muted-foreground ml-2">
                          4 - Very Good
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="5">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="text-muted-foreground ml-2">
                          5 - Excellent
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reviewContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your review of the book"
                    className="min-h-[220px] bg-white dark:bg-gray-950"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Share your thoughts about this book
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-4">Preview</h2>
        <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xl ${
                  star <= form.watch("rating")
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground italic">
            {form.watch("reviewContent") || "Your review will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
}
