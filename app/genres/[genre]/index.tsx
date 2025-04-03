"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, notFound, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "@/lib/api/openLibrary";
import { genres } from "@/lib/books";
import GenreHeader from "@/components/genres/GenreHeader";
import GenreBookList from "@/components/genres/GenreBookList";
import { SkeletonLoader } from "../_components/loader";

const GenrePageData = () => {
  const { genre } = useParams() as { genre: string };
  const params = useSearchParams();
  const genreData = genres.find((g) => g.slug === genre);

  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);

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
