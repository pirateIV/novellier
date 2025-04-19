"use client";

import React from "react";
import { Icons } from "../icons";
import { BookResponse } from "@/lib/graphql/types";

const BookResources = ({
  book,
}: {
  book:
    | BookResponse
    | {
        title: string;
        description: string | undefined;
      };
}) => {
  const { title } = book;
  const links = "links" in book ? book.links : undefined;
  return (
    <div className="relative -mx-3 sm:mx-0 p-3 mb-4 sm:p-4 sm:mb-6 bg-gray-50 sm:rounded-lg border border-dashed border-gray-200 dark:bg-neutral-900 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <h4 className="mb-2 font-medium text-zinc-950 dark:text-foreground">
          External Resources
        </h4>

        <div className="flex items-start gap-4">
          <button
            title="View in Wikipedia"
            className="p-1 -mt-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
            onClick={() =>
              window.open(
                `https://en.wikipedia.org/wiki/${title.replace(/ /g, "_")}`
              )
            }
          >
            <Icons.Wikipedia className="size-4 sm:size-5 fill-black dark:fill-white" />
          </button>
          <button
            title="Google search"
            className="p-1 -mt-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
            onClick={() =>
              window.open(`https://www.google.com/search?q=${title}`)
            }
          >
            <Icons.Google className="size-4 sm:size-[18px] fill-black dark:fill-white" />
          </button>
        </div>
      </div>
      {links && links.length > 0 ? (
        <ul className="space-y-2 mt-1">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px]  sm:text-sm text-zinc-600 dark:text-zinc-300"
              >
                <Icons.Link className="shrink-0 size-3.5 sm:size-4" />
                <span className="text-blue-600 dark:text-blue-500 hover:underline font-medium">
                  {link.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center text-sm text-gray-600 group dark:text-zinc-300">
          <Icons.LinkSlash
            strokeWidth="2"
            className="size-8 text-gray-300 dark:text-neutral-600 group-hover:text-neutral-400"
          />
          <span className="mt-1">No external links available </span>
        </div>
      )}
    </div>
  );
};

export default BookResources;
