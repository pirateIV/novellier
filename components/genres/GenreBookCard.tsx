import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Work } from "@/shared/types";
import BookReviewForm from "@/components/books/reviews/book-review-form";
import { BookProvider } from "@/context/BookContext";
import { Button } from "../ui/button";
import { PenLine } from "lucide-react";

// Utility functions
const getBookId = (key: string) => key.replace("/works/", "");

const getBookLink = ({ key, title, cover_id }: Work) =>
  `/books/${getBookId(key)}?title=${encodeURIComponent(
    title
  )}&book_cover_id=${cover_id}`;

const mapWorkToBookContext = (work: Work) => ({
  book: {
    title: work.title,
    description: work.description
      ? typeof work.description === "string"
        ? work.description
        : work.description.value
      : "",
  },
  author: {
    name: work.authors[0]?.name || "Unknown Author",
    authorId: work.authors[0]?.key
      ? work.authors[0].key.replace("/authors/", "")
      : "unknown",
  },
});

// Main Component
const GenreBookCard = ({ book: bookData }: { book: Work }) => {
  const { book, author } = mapWorkToBookContext(bookData);
  const hasDescription = !!bookData.description;

  return (
    // <BookProvider book={book} author={author}>
      <div className="relative flex gap-2 p-1 py-2 transition-colors group dark:hover:bg-white/5 first-of-type:rounded-t-lg hover:bg-gray-100 last-of-type:rounded-b-lg md:gap-6 md:p-3 sm::gap-4">
        <div className="relative flex-shrink-0 rounded-md bg-zinc-50 dark:bg-zinc-800 w-[100px] h-40">
          <Image
            fill
            className="object-cover rounded-md "
            src={`https://covers.openlibrary.org/b/id/${bookData.cover_id}-M.jpg`}
            blurDataURL={`https://covers.openlibrary.org/b/id/${bookData.cover_id}-S.jpg`}
            placeholder="blur"
            alt={`${bookData.title} cover`}
            priority
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="text-sm flex-1 font-libre font-semibold line-clamp-2 dark:font-normal md:text-[17px] xs:text-base">
                  {bookData.title}
                </h3>
                {hasDescription && (
                  <Button
                  // <BookReviewForm bookId={getBookId(bookData.key)}>
                      className="invisible text-xs group-hover:visible md:text-sm z-10"
                      variant="link"
                      size="sm"
                    >
                      <PenLine className="size-4 mr-1" />
                      Review
                      {/* </BookReviewForm> */}
                    </Button>
                )}
              </div>
              <p className="font-worksans mt-1 text-xs line-clamp-5 lg:line-clamp-4 text-gray-600 dark:text-gray-400 md:text-sm xs:text-sm">
                {hasDescription ? (
                  typeof bookData.description === "string" ? (
                    bookData.description
                  ) : (
                    bookData.description?.value
                  )
                ) : (
                  <em>No preview available...</em>
                )}
              </p>
            </div>

            <p className="mt-2 text-xs text-right md:text-sm">
              by{" "}
              <span className="font-medium text-indigo-600 dark:text-sky-400">
                {bookData.authors[0]?.name || "Unknown"}
              </span>
            </p>
          </div>
        </div>

        {/* Overlay Link */}
        <span
          className={cn(
            "absolute inset-0",
            !hasDescription && "cursor-not-allowed"
          )}
        >
          {hasDescription && (
            <Link href={getBookLink(bookData)} className="absolute inset-0" />
          )}
        </span>
      </div>
    // </BookProvider>
  );
};

export default GenreBookCard;
