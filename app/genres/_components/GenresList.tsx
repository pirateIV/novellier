import React from "react";
import Image from "next/image";

type GenreListProps = {
  title: string;
  genre: Array<{
    title: string;
    author: string;
    imageUrl: string;
    rating: string;
    publicationYear: string;
    description: string;
  }>;
};

const GenreList = ({ title, genre }: GenreListProps) => {
  return (
    <div className="py-3">
      <h4 className=" text-sm font-semibold pb-3 border-b mb-4">{title}</h4>
      <div className="flex flex-wrap items-center gap-3">
        {genre.map((h) => (
          <div key={h.title} className="relative bg-zinc-900 w-36 h-52">
            <Image fill src={h.imageUrl} alt={h.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
