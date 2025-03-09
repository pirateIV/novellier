import React from 'react'
import Link from "next/link"
import { genres } from '@/lib/books'

const GenresSidebar = () => {
  return (
    <aside>
    <div className="sticky top-8 p-5">
      <h4 className="font-sans font-medium pb-4 border-b text-xs">
        BROWSE
      </h4>

      <div className="h-[85vh] overflow-y-scroll py-5 gap-2 bg-gray-50 borer-b">
        {genres.map((genre) => (
          <Link
            key={genre.slug}
            href={`/genres/${genre.slug}`}
            className="text-indigo-600 ps-5 py-2 hover:bg-gray-100 hover:border-y hover:border-y-gray-200 block font-medium dark:text-sky-400 text-sm transition"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  </aside>
  )
}

export default GenresSidebar
