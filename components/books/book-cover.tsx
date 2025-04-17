"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BookResponse } from "@/lib/graphql/types";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { Link2Icon, Pencil } from "lucide-react";

type BookCoverProps = {
  id: string;
  book:
    | BookResponse
    | {
        title: string;
        description: string | undefined;
        book_review: {
          id: string | null;
          has_review: boolean;
        };
        author: {
          name: string;
          authorId: string;
        };
      };
};

const PLACEHOLDER_IMAGE = "/placeholder.svg";

const BookCover = ({ id, book }: BookCoverProps) => {
  const searchParams = useSearchParams();
  const bookCoverId = searchParams.get("book_cover_id");

  // Construct review URL with URLSearchParams for proper encoding
  const newReviewURl = new URL(`/books/${id}/review`, window.location.origin);
  newReviewURl.search = new URLSearchParams({
    title: book?.title,
    author: book.author?.name,
    author_id: book.author?.authorId,
    ...(bookCoverId && { book_cover: bookCoverId }),
  }).toString();

  const url = new URL(window.location.href);
  const { id: reviewId, has_review: hasReview } = book.book_review;
  const reviewUrl = hasReview
    ? `${url.pathname}/${reviewId}`
    : newReviewURl.href;

  const imageUrl = bookCoverId
    ? `https://covers.openlibrary.org/b/id/${bookCoverId}-L.jpg`
    : PLACEHOLDER_IMAGE;

  const blurDataUrl = bookCoverId
    ? `https://covers.openlibrary.org/b/id/${bookCoverId}-S.jpg`
    : undefined;

  useEffect(() => {
    if (bookCoverId) {
      localStorage.setItem("last_book_cover", bookCoverId);
    }
  }, [searchParams]);

  return (
    <div className="w-full col-span-full md:col-span-3">
      <div className="bg-zinc-50 rounded-lg overflow-hidden shadow-xs shadow-gray-300 dark:bg-zinc-900/40 dark:shadow-zinc-950 w-64 mx-auto md:w-auto aspect-[2/3] relative">
        <Image
          className="object-cover book"
          src={imageUrl}
          blurDataURL={blurDataUrl}
          alt={`Cover of ${book?.title}`}
          priority
          fill
        />
      </div>
      <div className="w-9/12 mx-auto sm:w-full mt-4">
        <Button
          size="lg"
          className="rounded-full w-full bg-orange-500 hover:bg-orange-500 hover:brightness-90  text-white"
          asChild
        >
          <Link href={`${id}/reviews`}>See all Reviews</Link>
        </Button>
        <div className="mt-2 flex justify-center">
          {hasReview ? (
            <Button variant="ghost" className="text-blue-500 font-medium">
              <span>
                <Link2Icon className="size-3.5 sm:size-4" />
              </span>
              See your review
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-primary rounded-full"
            >
              <Link className="flex items-center" href={reviewUrl}>
                {<Pencil className="h-4 w-4 mr-2" />}
                Write a review
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCover;
