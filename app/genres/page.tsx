// "use client";

import Reac from "react";
import client from "@/lib/apollo-client";
import { GET_BOOKS_DATA } from "@/lib/graphql/queries";
import GenreList from "./_components/GenresList";
import { useQuery } from "@apollo/client";

const fetchData = async () => {
  return await client.query({
    query: GET_BOOKS_DATA,
    fetchPolicy: "cache-first",
  });
};

const GenresPage = async () => {
  // const [booksData, setBooksData] = useState([]);

  const { data, error, loading } = await client.query({
    query: GET_BOOKS_DATA,
    fetchPolicy: "cache-first",
  });
  // const { data, error, loading } = useQuery(GET_BOOKS_DATA);
  // const { data, loading } = await getClient().query({
  //   query: GET_BOOKS_DATA,
  //   context: {
  //     fetchOptions: { next: { revalidate: 60 } }, // Optional: Revalidate every 60s (ISR)
  //   },
  // });

  // if (!data || error) {
  //   return <div>Unable to load data. Please refresh the page.</div>;
  // }

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
            {loading ? (
              <div>loading...</div>
            ) : (
              <>
                {data.genre.map((genre: any) => (
                  <GenreList key={genre.key} title={genre.name} genre={genre} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GenresPage;
