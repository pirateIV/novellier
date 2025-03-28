"use client";

import { MDXProvider } from "@mdx-js/react";
import { components } from "@/lib/mdx";
import { useState } from "react";
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
          !showMore ? "-space-y-16" : "-space-y-2"
        )}
      >
        <div
          className="font-worksans [&_a]:text-blue-500 [&_a]:underline [&_em]:text-sky-500 [&_strong]:text-gray-700 dark:[&_strong]:text-gray-100"
          dangerouslySetInnerHTML={{ __html: descriptionDisplay }}
        />
        {canShowMore && (
          <div
            className={cn(
              "pt-18 text-center flex items-center justify-center gap-1 bg-gradient-to-b from-white/70 to-white dark:from-neutral-950/70 dark:to-neutral-950",
              !showMore ? "group-hover:scale-105 transition-transform" : "pt-5"
            )}
            style={{viewTransitionName: "see-more"}}
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
