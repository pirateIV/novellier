import React from "react";

const BooksRelated = () => {
  return (
    <div>
      {/* <div className="pt-8 mt-12 border-t">
        <h2 className="mb-6 text-2xl font-semibold">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Link href={`/book/${i}`} key={i} className="group">
              <div className="aspect-[2/3] bg-gray-100 rounded-md overflow-hidden relative mb-2">
                <Image
                  src={`/api/placeholder/150/${200 + i * 10}`}
                  alt={`Related book ${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-medium transition-colors group-hover:text-zinc-600">
                {
                  [
                    "Distant Horizons",
                    "Midnight Whispers",
                    "Golden Echoes",
                    "Starlight Path",
                  ][i - 1]
                }
              </h3>
              <p className="text-xs text-gray-500">
                {
                  [
                    "Sarah Parker",
                    "Michael Torres",
                    "Emily Williams",
                    "David Chen",
                  ][i - 1]
                }
              </p>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default BooksRelated;
