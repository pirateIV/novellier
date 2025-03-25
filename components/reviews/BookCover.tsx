import React from "react";
import Image from "next/image";

function getBookCover(id: string) {
  return `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
}

const BookCover = ({ coverId, title }: { coverId: string; title: string }) => {
  return (
    <div className="p-2 shrink-0 supports-[backdrop-blur]:bg-white/60 border-white/90">
      <Image
        height="100"
        width="175"
        alt={`Image of ${title}`}
        src={getBookCover(coverId)}
        className="rounded-md"
      />
    </div>
  );
};

export default BookCover;
