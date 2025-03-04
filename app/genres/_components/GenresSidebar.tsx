import React from 'react'
import Link from "next/link"
import { genres } from '@/lib/books'

const GenresSidebar = () => {
  return (
    <aside>
    <div className="sticky top-8">
      <h4 className="!font-[family-name:(var(--font-mono))] pb-4 border-b text-xs">
        BROWSE
      </h4>

      <div className="grid grid-cols-2 pt-6 gap-2">
        {genres.map((genre) => (
          <Link
            key={genre.slug}
            href={`/genres/${genre.slug}`}
            className="text-sky-400 text-sm hover:underline"
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
