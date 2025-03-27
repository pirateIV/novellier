"use client";

import { useParams, notFound } from "next/navigation";
import { genres } from "@/lib/books";
import GenreHeader from "@/components/genres/GenreHeader";
import GenreBookList from "@/components/genres/GenreBookList";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "@/lib/api/openLibrary";
import { Subject } from "@/shared/types";

const GenrePage = () => {
  const { genre } = useParams() as { genre: string };
  const genreData = genres.find((g) => g.slug === genre);

  if (!genreData) {
    return notFound();
  }

  const { name, description } = genreData;

  // Use React Query to fetch subject data
  const { data: subjectData = [], isLoading } = useQuery({
    queryKey: ['genreSubjects', genre], // Unique key for this query
    queryFn: () => getSubjects(genre),  // Fetch function
    staleTime: 5 * 60 * 1000,          // Data considered fresh for 5 minutes
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