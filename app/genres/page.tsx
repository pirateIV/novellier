import React from "react";
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import GenreList from "./_components/GenresList";
import GenresSidebar from "./_components/GenresSidebar";

const GET_BOOKS_DATA = gql`
  query Books {
    genre {
      key
      name
      works {
        key
        title
        authors {
          name
        }
        cover_id
      }
    }
  }
`;

const GenresPage = async () => {
  const { data } = await client.query({
    query: GET_BOOKS_DATA,
  });

  // console.log(data)


  return (
    <>
      <div className="max-w-[1440px] grid md:grid-cols-[auto_50px_350px] mx-auto">
        <div className="p-8">
          <div>
            <h1 className="text-6xl tracking-tight dark:text-white mb-4 text-pretty">
              Explore <span className="genre">Genres</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-600 dark:text-white/70">
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
        <div className="col-start-2 row-span-full max-sm:hidden text-gray-950/5 border-x border-x-current bg-fixed bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
      </div>
    </>
  );
};

export default GenresPage;
