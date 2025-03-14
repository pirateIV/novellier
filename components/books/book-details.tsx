"use client";

import Image from "next/image";
import { useBookContext } from "@/context/book-context";
import { Badge } from "../ui/badge";
import BookResources from "./book-resources";
import BookDescription from "./book-description";

const BookDetails = () => {
  const { book, author } = useBookContext();
  const { description, subjects, first_publish_date, links, title } = book;

  const genre = subjects[0];

  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h1>

      <div className="flex items-center gap-2 mb-3 text-gray-600">
        <div className="avatar-fallback size-9 relative rounded-full border-2 border-zinc-200 dark:border-zinc-500">
          <Image
            src={`https://covers.openlibrary.org/a/olid/${author.authorId}-S.jpg`}
            width="36"
            height="36"
            className="size-full object-cover rounded-full"
            alt={`image of ${author.name}`}
          />
        </div>{" "}
        <span className="font-medium text-indigo-600 dark:text-sky-400">
          {author.name}
        </span>
      </div>

      <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-6 font-medium">
        <div className="flex items-center gap-2.5">
          <span className="text-zinc-900 dark:text-zinc-300">
            {first_publish_date}
          </span>
          <span>&middot;</span>
        </div>
        <Badge variant="secondary">{genre}</Badge>
        <span>&middot;</span>
        <div className="flex items-center gap-1">
          <span className="text-amber-600 text-base">☆</span>
          <span className="text-zinc-900 dark:text-zinc-300">4.7</span>
        </div>
      </div>

    </>
  );
};

export default BookDetails;
