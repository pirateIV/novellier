import React from "react";
import Image from 'next/image';

const BookCover = ({ coverId, title }: { coverId: string; title: string }) => {
  return (
    <Image
      src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
      width={100}
      height={175}
      alt={`${title}'s cover`}
    />
  );
};

export default BookCover;
