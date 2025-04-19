"use client";

import { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { components } from "@/lib/mdx";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const BookDescription = ({ description }: { description: string }) => {
  const [showMore, setShowMore] = useState(false);
  const maxCharsLength = 410;

  const canShowMore = description.length > maxCharsLength;

  const descriptionDisplay = !showMore
    ? description.slice(0, maxCharsLength) + "..."
    : description;

  return (
    <MDXProvider components={components}>
      <div
        className={cn(
          "group flex flex-col",
          !showMore ? "-space-y-16" : "-space-y-2",
          !description && "space-y-0"
        )}
      >
        <div
          className="font-worksans text-base md:text-[17px] [&_a]:text-blue-500 [&_a]:underline [&_em]:text-sky-500 [&_strong]:text-neutral-700 dark:[&_strong]:text-gray-100"
          dangerouslySetInnerHTML={{ __html: descriptionDisplay }}
        />
        {!description && (
          <div className="font-worksans italic opacity-70">
            No description available...
          </div>
        )}
        {canShowMore && (
          <div
            className={cn(
              "pt-18 text-center backdrop-blur-[1px] scale-x-105 flex items-center justify-center gap-1 bg-gradient-to-b from-white/70 to-white dark:from-transparent to-60%% dark:to-neutral-950",
              !showMore ? "group-hover:scale-105 transition-transform" : "pt-5"
            )}
          >
            <span
              className="text-gray-800 dark:text-foreground font-medium cursor-pointer hover:underline"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "See Less" : "See More"}
            </span>
            <span>
              <ChevronDown size="18" />
            </span>
          </div>
        )}
      </div>
    </MDXProvider>
  );
};

export default BookDescription;
