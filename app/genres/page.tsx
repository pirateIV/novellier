import client from "@/lib/apollo-client";
import { GET_BOOKS_DATA } from "@/lib/graphql/queries";
import GenreList from "./_components/GenresList";

const GenresPage = async () => {
  const { data, error } = await client.query({
    query: GET_BOOKS_DATA,
    fetchPolicy: "cache-first",
  });

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="w-full flex justify-start flex-col p-4 md:p-8">
          <div>
            <h1 className="mb-4 text-2xl font-semibold tracking-tight text-pretty dark:text-white sm:text-4xl">
              Explore <span className="genre">Genres</span>
            </h1>
            <p className="max-w-xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Discover new books across different genres and expand your reading
              horizons.
            </p>
          </div>

          <div>
            <>
              {data.genre.map((genre: any) => (
                <GenreList key={genre.key} title={genre.name} genre={genre} />
              ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenresPage;
