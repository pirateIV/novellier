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

  const getPreviewLink = (work: Work) => {
    return `/books/${work.key.replace("/works/", "")}?title=${encodeURIComponent(
      work.title
    )}&book_cover_id=${work.cover_id}`;
  };

  const GenreList = ({
    title,
    genre,
  }: {
    title: string;
    genre: GenreListProps;
  }) => {
    return (
      <div className="py-3 sm:py-6">
        {/* Section Title */}
        <h4 className="capitalize sm:text-lg font-bold pb-3 border-b mb-6">
          {title}
        </h4>

        {/* Book Grid */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 xl:grid-cols-6 sm:gap-4">
          {genre.works.map((work: Work) => (
            <div
              key={work.key}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Book Cover */}
              <div className="relative w-full  h-44 sm:h-[220px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  width={100}
                  height={220}
                  src={`https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`}
                  blurDataURL={`https://covers.openlibrary.org/b/id/${work.cover_id}-S.jpg`}
                  className="object-cover w-full h-full"
                  placeholder="blur"
                  alt={`Cover of ${work.title}`}
                />
                {/* Overlay Link */}
                <Link
                  href={getPreviewLink(work)}
                  className="absolute inset-0 z-10"
                  aria-label={`View details of ${work.title}`}
                />
              </div>

              <p
                className={cn(
                  "text-[13px] sm:text-sm font-semibold font-libre mt-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200",
                  `[view-transition-name:book-${work.key.replace("/works/", "")}]`
                )}
              >
                {work.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-sky-400 line-clamp-1 mt-1">
                {work.authors[0]?.name || "Unknown Author"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default GenreList;
