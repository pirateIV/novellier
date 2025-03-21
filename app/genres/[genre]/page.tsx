import { notFound } from "next/navigation";
import { genres, getGenres } from "@/lib/books";
import { gql } from "@apollo/client";
import { Subject as SubjectResponse, Work } from "@/shared/types";
import { getSubjects } from "@/lib/api/openLibrary";
import Image from "next/image";
import Link from "next/link";

const getBookLink = (work: Work) => {
  // prettier-ignore
  return `/books/${work.key.replace("/works/", "")}?title=${encodeURIComponent(work.title)}&book_cover_id=${work.cover_id}`;
};

export async function generateStaticParams() {
  const genres = await getGenres();

  return genres.map((genre) => ({
    genre: genre.slug,
  }));
}

const SUBJECT_DATA = gql`
  query Subject($subject: String!) {
    subject(subject: $subject) {
      work_count
      # works {
      #   cover_id
      #   description
      #   first_publish_year
      #   authors: {
      #     name
      #   }[]
      # }
    }
  }
`;

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

  // const {
  //   data: { subject },
  // } = await client.query<{ subject: SubjectResponse }>({
  //   query: SUBJECT_DATA,
  //   variables: { subject: genre },
  // });
  // console.log(subject);
  const subjectData = await getSubjects(genre);
  console.log(subjectData);

  return (
    <div className="px-7 py-5">
      <h1 data-view-transition="page-title" className="mb-5 text-2xl">
        {name}
      </h1>
      <p className="font-worksans text-sm text-zinc-300 whitespace-pre-line">
        {description}
      </p>

      <div className="mt-5">
        {subjectData.map(({ works, works_count }) => (
          <div
            key={works.key}
            className="relative flex gap-4 p-3 rounded-lg hover:bg-white/5"
          >
            <Image
              src={`https://covers.openlibrary.org/b/id/${works.cover_id}-M.jpg`}
              className="rounded-md"
              height={200}
              width={100}
              alt={`${works.title} image`}
            />
            <div className="flex-1">
              <h3 className="mb-2">{works.title}</h3>
              <p className="font-worksans text-sm line-clamp-2 dark:text-gray-400">
                {works.description ? (
                  typeof works.description === "string" ? (
                    works.description
                  ) : (
                    works.description?.value
                  )
                ) : (
                  <em>No description available...</em>
                )}
              </p>

              <div className="mt-2">
                <p className="text-right text-[13px]">
                  by{" "}
                  <span className="w-full font-medium text-sky-400">
                    {works.authors[0].name}
                  </span>
                </p>
              </div>
            </div>
            <span className="absolute inset-0">
              <Link href={getBookLink(works)} className="flex size-full"/>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
