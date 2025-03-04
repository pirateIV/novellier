import Link from "next/link";
import React from "react";

const GenreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <Link href="/genres" className="text-sm text-sky-400 font-medium hover:underline">
          Genres
        </Link>
      </header>
      {children}
    </div>
  );
};

export default GenreLayout;
