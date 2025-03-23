import { notFound } from "next/navigation";
import { genres, getGenres } from "@/lib/books";
import { gql } from "@apollo/client";
import { Subject as SubjectResponse, Work } from "@/shared/types";
import { getSubjects } from "@/lib/api/openLibrary";

import GenreHeader from "@/components/genres/GenreHeader";
import GenreBookCard from "@/components/genres/GenreBookCard";

// export async function generateStaticParams() {
//   const genres = await getGenres();

//   return genres.map((genre) => ({
//     genre: genre.slug,
//   }));
// }

const GenrePage = async ({
  params,
}: {
  params: Promise<{ genre: string }>;
}) => {
  const { genre } = await params;
  const genreData = genres.find((g) => g.slug === genre);
  if (!genreData) {
    return notFound();
  }

  const { name, description } = genreData;
  const subjectData = await getSubjects(genre);

  return (
    <div className="px-7 py-5">
      <GenreHeader name={name} description={description} />
      <div className="mt-5 divide-y divide-slate-950/[.07] dark:divide-white/10">
        {subjectData ? (
          subjectData.map(({ works }: SubjectResponse) => (
            <GenreBookCard key={works.key} works={works} />
          ))
        ) : (
          <div className="p-5 text-center">Could not get data...</div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
