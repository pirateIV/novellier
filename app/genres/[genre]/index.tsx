"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, notFound, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBook, getSubjects } from "@/lib/api/openLibrary";
import { genres } from "@/lib/books";
import GenreHeader from "@/components/genres/GenreHeader";
import GenreBookList from "@/components/genres/GenreBookList";

const SkeletonLoader = () => (
  <>
    {Array(6)
      .fill(null)
      .map((_, i) => (
        <div
          key={i}
          className="flex gap-4 py-2 p-1 md:p-3 animate-pulse divide-y divide-slate-950/[.07] dark:divide-white/10"
        >
          <div className="h-40 w-[100px] shrink-0 rounded-md bg-gradient-to-r skeleton"></div>
          <div className="min-h-full flex flex-col flex-1 gap-6">
            <div className="skeleton w-2/4 h-6 bg-gradient-to-r rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="skeleton w-full h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-full h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-full h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-8/12 h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-1/6 h-3 self-end mt-4 bg-gradient-to-r rounded-sm"></div>
            </div>
          </div>
        </div>
      ))}
  </>
);

const GenrePageData = () => {
  const { genre } = useParams() as { genre: string };
  const params = useSearchParams();
  const genreData = genres.find((g) => g.slug === genre);

  const [totalPages, setTotalPages] = useState(1);

  if (!genreData) {
    return notFound();
  }

  const { name, description } = genreData;
  const {
    data: subjectData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["genreSubjects", genre],
    queryFn: () => getSubjects(genre),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const limit = 20;
    console.log(subjectData);

    let totalPages = subjectData?.work_count
      ? Math.ceil(subjectData?.work_count / limit)
      : 1;

    setTotalPages(totalPages);
  }, [subjectData]);

  return (
    <div className="max-w-full px-2 py-5 md:px-7 sm:px-4">
      <GenreHeader name={name} description={description} />
      <Suspense fallback={null}>
        {isLoading ? (
          <div className="mt-5">
            <SkeletonLoader />
          </div>
        ) : (
          // @ts-ignore
          <GenreBookList books={subjectData} refetch={refetch} />
        )}
      </Suspense>
    </div>
  );
};

export default GenrePageData;
