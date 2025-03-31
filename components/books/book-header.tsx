"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BookResponse } from "@/lib/graphql/types";

const BookHeader = ({
  book,
}: {
  book:
    | BookResponse
    | {
        title: string;
        description: string | undefined;
      };
}) => {

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="inline-flex items-center gap-1">
        <span className="dark:text-gray-400">←</span>
        <Link
          href="/genres"
          className="text-[13px] md:text-sm font-medium text-zinc-900 dark:text-white hover:underline md:font-semibold"
        >
          Back to Genres
        </Link>
      </div>
      <div>
        <button
          className="flex items-center gap-1 text-[13px] md:text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline md:font-semibold"
          onClick={() =>
            window.open(`https://www.google.com/search?q=${book.title}`)
          }
        >
          <span className="text-gray-400">
            <ExternalLink className="size-[15px]" />
          </span>
          Search the internet
        </button>
      </div>
    </div>
  );
};

export default BookHeader;
