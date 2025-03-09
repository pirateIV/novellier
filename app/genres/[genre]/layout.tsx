import React from "react";
import { Link } from "next-view-transitions";

const GenreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <Link href="/genres" className="text-3xl text-sky-400 font-medium hover:underline genre">
          Genres
        </Link>
      </header>
      {children}
    </div>
  );
};

export default GenreLayout;
