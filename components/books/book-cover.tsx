"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BookResponse } from "@/lib/graphql/types";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { Pencil } from "lucide-react";

const BookCover = ({
  id,
  book,
}: {
  id: string;
  book:
    | BookResponse
    | {
        title: string;
        description: string | undefined;
        author: {
          name: string;
          authorId: string;
        }
      };
}) => {
  // const { book } = useBookContext();
  const searchParams = useSearchParams();
  const bookCoverId = searchParams.get("book_cover_id");

  const imageUrl = `https://covers.openlibrary.org/b/id/${bookCoverId}`;

  return (
    <div className="w-full col-span-full md:col-span-3">
      <div className="bg-zinc-50 rounded-lg overflow-hidden shadow-xs shadow-gray-300 dark:bg-zinc-900/40 dark:shadow-zinc-950 w-64 mx-auto md:w-auto aspect-[2/3] relative">
        <Image
          className="object-cover book"
          src={bookCoverId ? `${imageUrl}-L.jpg` : "/placeholder.svg"}
          blurDataURL={`${imageUrl}-S.jpg`}
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
          <Link
            href={`/books/${id}/review?title=${book?.title}&author=${book.author.name}&author_id=${book.author.authorId}&book_cover=${bookCoverId}`}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-primary rounded-full"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Write a review
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
