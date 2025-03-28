"use client";

import { Suspense } from "react";
import { useParams, notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "@/lib/api/openLibrary";
import { genres } from "@/lib/books";
import GenreHeader from "@/components/genres/GenreHeader";
import GenreBookList from "@/components/genres/GenreBookList";

const GenrePage = () => {
  const { genre } = useParams() as { genre: string };
  const genreData = genres.find((g) => g.slug === genre);

  if (!genreData) {
    return notFound();
  }

  const { name, description } = genreData;
  const { data: subjectData = [], isLoading } = useQuery({
    queryKey: ["genreSubjects", genre],
    queryFn: () => getSubjects(genre),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="px-2 sm:px-4 md:px-7 py-5 max-w-full">
      <GenreHeader name={name} description={description} />
      <Suspense
        fallback={<div className="p-5 text-center">Loading books...</div>}
      >
        {isLoading ? (
          <div className="p-5 text-center">Loading books...</div>
        ) : (
          <GenreBookList subjectData={subjectData} />
        )}
      </Suspense>
    </div>
  );
};

export default GenrePage;
