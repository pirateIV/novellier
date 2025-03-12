"use client";

import React from "react";
import Image from "next/image";
import { z } from "zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { Textarea } from "@headlessui/react";
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

const reviewSchema = z.object({
  review: z.string().min(1, "Your review must not be empty"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const BookReviews = () => {
  const form = useForm({
    resolver: zodResolver<ReviewFormData>(reviewSchema),
    defaultValues: {
      review: "",
    },
  });

  const onSubmit = (value: ReviewFormData) => {
    console.log(value);
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    name="username"
                    className="col-span-full inset-ring disabled:inset-ring-gray-500 disabled:placeholder:text-gray-400 disabled:cursor-not-allowed"
                    disabled
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Form {...form}>
                    <form
                      className="col-span-full"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <Label htmlFor="username" className="text-right">
                        Review
                      </Label>
                      <FormField
                        name="review"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea
                            className="w-full border rounded-lg"
                            rows={5}
                            {...field}
                          />
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default BookReviews;
