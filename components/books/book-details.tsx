"use client";

import Image from "next/image";
import { useBookContext } from "@/context/BookContext";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";

const BookDetails = () => {
  const { book, author } = useBookContext();

  //@ts-ignore
  const { authors, subjects, first_publish_date, links, title } = book;
  // const genre = subjects.slice(0,3).map((sub: any) => sub).join(", ");

  return (
    <>
      <h1 className="mb-2 text-3xl sm:text-4xl font-medium tracking-tight md:text-5xl">
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
          {author.name}{" "}
          {authors.length > 1 && (
            <span className="text-gray-200 text-xs font-Medium">
              (+{authors.length - 1})
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-6 font-medium">
        {first_publish_date && (
          <div className="flex items-center gap-2.5">
            <span className="text-zinc-900 dark:text-zinc-300">
              {first_publish_date}
            </span>
            <span>&middot;</span>
          </div>
        )}
        <div className="*:not-first:border-l *:not-first:border-l-gray-300 *:dark:not-first:border-l-background">
          {subjects.slice(0, 3).map((sub: string) => (
            <Badge
              key={sub}
              variant="secondary"
              className="rounded-none first-of-type:rounded-l-sm last-of-type:rounded-e-sm"
            >
              {sub}
            </Badge>
          ))}
        </div>
        <span>&middot;</span>
        <div className="flex items-center gap-1">
          <span className="text-amber-600 text-base">
            <Star className="size-3 fill-amber-600" />
          </span>
          <span className="text-zinc-900 dark:text-zinc-300">
            4.7 <span className="text-zinc-400">(0)</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
