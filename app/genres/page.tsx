import React from "react";
import client from "@/lib/apollo-client";
import { GET_BOOKS_DATA } from "@/lib/graphql/queries";

import GenresSidebar from "./_components/GenresSidebar";
import GenreList from "./_components/GenresList";

const GenresPage = async () => {
  let data: null | any = null;

  try {
    const result = await client.query({
      query: GET_BOOKS_DATA,
      fetchPolicy: "cache-first",
    });
    data = result.data;
  } catch (error) {
    console.error("error fetching data");
  }

  if (!data) {
    return <div>Unable to load data. Please try again later.</div>;
  }

  return (
    <>
      <div className="max-w-[1440px] grid md:grid-cols-[auto_50px_300px] mx-auto">
        <div className="p-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight dark:text-white mb-4 text-pretty">
              Explore <span className="genre">Genres</span>
            </h1>
            <p className="max-w-xl text-gray-600 dark:text-gray-400">
              Discover new books across different genres and expand your reading
              horizons.
            </p>
          </div>

          <div>
            {data.genre.map((genre: any) => (
              <GenreList key={genre.key} title={genre.name} genre={genre} />
            ))}
          </div>
        </div>
        <GenresSidebar />
        <div className="col-start-2 row-span-full max-sm:hidden text-gray-950/5 dark:text-white/10 border-x border-x-current bg-fixed bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
      </div>
    </>
  );
};

export default GenresPage;
