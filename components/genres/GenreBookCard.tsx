"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Work } from "@/shared/types";
import BookReviewForm from "@/components/books/reviews/book-review-form";
import { BookProvider } from "@/context/BookContext";
import { Button } from "../ui/button";
import { PenLine } from "lucide-react";

const getBookId = (key: string) => {
  return key.replace("/works/", "");
};

const getBookLink = (work: Work) => {
  return `/books/${getBookId(work.key)}?title=${encodeURIComponent(
    work.title
  )}&book_cover_id=${work.cover_id}`;
};

const mapWorkToBookContext = (work: Work) => {
  const book = {
    title: work.title,
    description: work.description
      ? typeof work.description === "string"
        ? work.description
        : work.description.value
      : "",
  };

  const author = {
    name: work.authors[0]?.name || "Unknown Author",
    authorId: work.authors[0]?.key
      ? work.authors[0].key.replace("/authors/", "")
      : "unknown",
  };

  return { book, author };
};

const GenreBookCard = ({ works }: { works: Work }) => {
  const { book, author } = mapWorkToBookContext(works);

  //   TODO: maybe include the bookimage in the review
  return (
    <BookProvider book={book} author={author}>
      <div className="relative flex gap-4 p-3 group dark:hover:bg-white/5 first-of-type:rounded-t-lg hover:bg-gray-100 last-of-type:rounded-b-lg">
        <Image
          src={`https://covers.openlibrary.org/b/id/${works.cover_id}-M.jpg`}
          className="rounded-md"
          height={200}
          width={100}
          alt={`${works.title} image`}
        />
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="mb-2 font-semibold dark:font-normal">
                {works.title}
              </h3>
              {works.description && (
                <BookReviewForm bookId={getBookId(works.key)}>
                  <Button
                    className="relative invisible z-10 text-[13px] group-hover:visible"
                    variant="link"
                    size="sm"
                  >
                    <PenLine className="size-4" />
                    Review
                  </Button>
                </BookReviewForm>
              )}
            </div>
            <p className="font-worksans text-sm line-clamp-4 dark:text-gray-400">
              {works.description ? (
                typeof works.description === "string" ? (
                  works.description
                ) : (
                  works.description?.value
                )
              ) : (
                <em>No preview available...</em>
              )}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-end gap-2 text-[13px]">
            <p className="text-right">
              by{" "}
              <span className="w-full font-medium text-indigo-600 dark:text-sky-400">
                {works.authors[0]?.name || "Unknown"}
              </span>
            </p>
          </div>
        </div>
        <span
          className={cn(
            !works.description && "cursor-not-allowed",
            "absolute inset-0"
          )}
        >
          {works.description && (
            <Link href={getBookLink(works)} className="size-full flex" />
          )}
        </span>
      </div>
    </BookProvider>
  );
};

export default GenreBookCard;
