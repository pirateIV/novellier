import React from "react";
import Link from "next/link";
import { genres } from "@/lib/books";
import { BookIcon, ChevronRight } from "lucide-react";

const GenresSidebar = () => {
  return (
    <aside className="ps-4">
      <div className="sticky top-6 py-5 bg-gray-50 rounded-xl border dark:border-white/10 dark:bg-zinc-900">
        <div className="flex items-center gap-2 ps-4 pb-4 border-b dark:border-white/10">
          <BookIcon className="size-4 text-zinc-900 dark:text-zinc-400" />
          <h4 className="font-sans text-xs font-medium">BROWSE</h4>
        </div>

        <div className="h-[85vh] overflow-y-scroll gap-2 p-3">
          {genres.map((genre) => (
            <Link
              key={genre.slug}
              href={`/genres/${genre.slug}`}
              className="group w-full inline-flex justify-between items-center py-2 ps-4 pe-3 text-sm font-medium text-indigo-600 rounded-md border border-transparent transition duration-300 dark:text-sky-400 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 hover:bg-gray-100 hover:border-gray-200"
            >
              {genre.name}
              <ChevronRight className="size-5 dark:text-zinc-700 dark:group-hover:text-zinc-400" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default GenresSidebar;
