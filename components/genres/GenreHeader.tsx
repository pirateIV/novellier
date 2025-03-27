"use client";

import React, { useState } from "react";

interface GenreHeaderProps {
  name: string;
  description: string;
}

const GenreHeader = ({ name, description }: GenreHeaderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxCharsLength = 650;
  const isLongDescription = description.length > maxCharsLength;

  const descriptionDisplay =
    isExpanded || !isLongDescription
      ? description
      : `${description.slice(0, maxCharsLength)}...`;

  const handleToggle = () => setIsExpanded(!isExpanded);
  return (
    <>
      <div className="relative mb-5 flex flex-col before:h-px before:w-[200vw] before:absolute before:-inset-x-1/2 before:bottom-0 before:bg-slate-950/[.07] dark:before:bg-white/10 after:h-px after:w-[200vw] after:absolute after:-inset-x-1/2 after:top-0 after:bg-slate-950/[.07] dark:after:bg-white/10">
        <h1 className="text-3xl font-semibold text-gray-950 dark:text-white">
          {name}
        </h1>
      </div>
      <p className="text-sm font-medium text-pretty text-gray-600 dark:font-normal dark:text-slate-300">
        {descriptionDisplay}
      </p>
      {isLongDescription && (
        <button
          onClick={handleToggle}
          className="text-sm text-blue-500 active:underline"
          aria-label={`${isExpanded} ? "Show less" : "Show More"`}
        >
          {isExpanded ? "Show less" : "Show More"}
        </button>
      )}
    </>
  );
};

export default GenreHeader;
