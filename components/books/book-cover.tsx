"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useBookContext } from "@/context/BookContext";

const BookCover = () => {
  const { book } = useBookContext();
  const searchParams = useSearchParams();
  const bookCoverId = searchParams.get("book_cover_id");

  const imageUrl = `https://covers.openlibrary.org/b/id/${bookCoverId}`;

  return (
    <div className="w-full md:w-1/3 md:order-1">
      <div className="bg-zinc-50 rounded-lg overflow-hidden shadow-xs shadow-gray-300 dark:bg-zinc-900/40 dark:shadow-zinc-950 aspect-[2/3] relative">
        <Image
          className="object-cover"
          src={bookCoverId ? `${imageUrl}-L.jpg` : "/placeholder.svg"}
          blurDataURL={`${imageUrl}-S.jpg`}
          alt={`Cover of ${book?.title}`}
          fill
        />
      </div>
    </div>
  );
};

export default BookCover;
