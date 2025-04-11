"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
// import { useBookContext } from "@/context/BookContext";
import { BookResponse } from "@/lib/graphql/types";

const BookCover = ({book}: {book: BookResponse | {
  title: string;
  description: string | undefined;
}}) => {
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
    </div>
  );
};
  
export default BookCover;
