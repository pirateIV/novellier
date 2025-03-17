import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { history } from "@/lib/books";
import GenresSidebar from "./_components/GenresSidebar";
import GenreList from "./_components/GenresList";
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Error from "next/error";

const GET_GENRE_DATA = gql`
  query Genre {
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
  const { data, error } = await client.query({
    query: GET_GENRE_DATA,
    fetchPolicy: "cache-first",
  });

  console.log({ data });
  return (
    <div className=" grid md:grid-cols-[1fr_50px_250px_50px] gap-8 p">
      <div className="pt-12 mx-auto max-w-4xl">
        <div className="relative rounded-xl overflow-hidden mb-10">
          <div className="flex flex-col justify-center z-20">
            <h1 className="text-6xl tracking-tight dark:text-white mb-4 text-pretty">
              Explore Genres
            </h1>
            <p className="max-w-xl text-lg text-gray-600 dark:text-gray-500">
              Discover new books across different genres and expand your reading
              horizons.
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="rounded-md mt-6">
          <div className="relative group border-b pb-1">
            <Input
              placeholder="Find a genre by name..."
              className="w-full ps-10 focus:!outline-none focus:!ring-none focus:!border-none shadow-none"
              aria-label="Search genres"
            />
            <button
              className="absolute flex items-center justify-center h-full inset-y-0 left-3 dark:text-zinc-300 dark:focus-visible:text-white"
              aria-label="Search"
            >
              <Search size="17" />
            </button>
          </div>
        </div>

        <div className="mt-7">
          {data.genre.map((genre: any) => (
            <GenreList key={genre.key} title={genre.name} genre={genre} />
          ))}
        </div>
      </div>
      {/* <div className="row-span-full max-sm:hidden text-gray-950/5 border-x border-x-current bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div> */}
      <GenresSidebar />
    </div>
  );
};

export default GenresPage;
