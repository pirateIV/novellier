import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { history } from "@/lib/books";
import GenresSidebar from "./_components/GenresSidebar";

const GenresPage = () => {
  return (
    <div className="relative grid md:grid-cols-[auto_300px] gap-8 p-8">
      <div>
        <div className="relative rounded-xl overflow-hidden mb-10">
          {/* <div className="bg-[url('https://wordpress.susqu.edu/engl390/files/2018/02/pastedImage.png')] bg-cover bg-center h-64 z-0 rounded-2xl"></div> */}
          <div className="bg-[url('https://jasonlouro.ghost.io/content/images/2023/10/Dark-Fantasy-Castle-Setting.webp')] bg-cover bg-center h-64 z-0 rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-zinc-800/30 z-10"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 z-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Genres
            </h1>
            <p className="max-w-xl text-lg text-white/70">
              Discover new books across different genres and expand your reading
              horizons.
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-slate-300 dark:bg-zinc-900 p-3 rounded-md mt-6">
          <div className="relative">
            <Input
              placeholder="Find a genre by name..."
              className="w-full ps-10 focus:!ring-0"
              aria-label="Search genres"
            />
            <button
              className="absolute flex items-center justify-center h-full inset-y-0 left-3 text-zinc-300 focus-visible:text-white"
              aria-label="Search"
            >
              <Search size="17" />
            </button>
          </div>
        </div>

        <div className="mt-7">
          <div className="py-3">
            <h4 className=" text-sm font-semibold pb-3 border-b mb-4">
              HISTORY & BIOGRAPHY
            </h4>

            <div className="flex flex-wrap items-center gap-3">
              {history.map((h) => (
                <div key={h.title} className="bg-zinc-900">
                  <Image
                    src={h.imageUrl}
                    width={150}
                    height={250}
                    alt={h.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GenresSidebar />
    </div>
  );
};

export default GenresPage;
