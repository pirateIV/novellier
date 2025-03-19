import { notFound } from "next/navigation";
import { genres, getBooksByGenre, getGenres } from "@/lib/books";

export async function generateStaticParams() {
  const genres = await getGenres();

  return genres.map((genre) => ({
    genre: genre.slug,
  }));
}

const GenrePage = async ({
  params,
}: {
  params: Promise<{ genre: string }>;
}) => {
  const { genre } = await params;
  const books = await getBooksByGenre(genre);

  const genreData = genres.find((g) => g.slug === genre);
  if (!genreData) {
    return notFound();
  }

  const { name, description } = genreData;

  return (
    <div>
      <h1 data-view-transition="page-title" className="text-2xl font-sans mb-5">
        {name}
      </h1>
      <p className="text-sm text-zinc-300 whitespace-pre-line">{description}</p>

      {JSON.stringify(books)}
    </div>
  );
};

export default GenrePage;
