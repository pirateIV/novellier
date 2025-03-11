import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Work = {
  key: string;
  title: string;
  authors: {
    name: string;
  }[];
  cover_id: string;
};

type GenreListProps = {
  key: string;
  name: string;
  works: Work[];
};

const GenreList = ({
  title,
  genre,
}: {
  title: string;
  genre: GenreListProps;
}) => {
  // const href = `/books/${genre.key.replace("/works/", "")}`;

  return (
    <div className="py-6">
      {/* Section Title */}
      <h4 className="capitalize text-lg font-bold pb-3 border-b border-neutral-200 mb-6">
        {title}
      </h4>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genre.works.map((work: Work) => (
          <div
            key={work.key}
            className="group relative flex flex-col items-center text-center"
          >
            {/* Book Cover */}
            <div className="relative w-full h-[180px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                width={100}
                height={180}
                src={`https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`}
                blurDataURL={`https://covers.openlibrary.org/b/id/${work.cover_id}-S.jpg`}
                className="object-cover w-full h-full"
                placeholder="blur"
                alt={`Cover of ${work.title}`}
              />
              {/* Overlay Link */}
              <Link
                href={`/books/${work.key.replace(
                  "/works/",
                  ""
                )}?title=${encodeURIComponent(work.title)}`}
                className="absolute inset-0 z-10"
                aria-label={`View details of ${work.title}`}
              />
            </div>

            <p
              className={cn(
                "text-sm font-semibold mt-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200",
                `[view-transition-name:book-${work.key.replace("/works/", "")}]`
              )}
            >
              {work.title}
            </p>
            <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
              {work.authors[0]?.name || "Unknown Author"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
