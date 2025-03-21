import React from "react";
import client from "@/lib/apollo-client";
import { GET_BOOKS_DATA } from "@/lib/graphql/queries";

import GenresSidebar from "./_components/GenresSidebar";
import GenreList from "./_components/GenresList";
import { Button } from "@/components/ui/button";

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
    return <div>Unable to load data. Please refresh the page.</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
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
      </div>
    </>
  );
};

export default GenresPage;
