import React from "react";

interface GenreHeaderProps {
  name: string;
  description: string;
}

const GenreHeader = ({ name, description }: GenreHeaderProps) => {
  return (
    <>
      <h1 className="mb-5 text-2xl text-gray-950 dark:text-white">{name}</h1>
      <p className="font-worksans font-medium text-sm text-gray-600 dark:font-normal dark:text-slate-300 whitespace-pre-line">
        {description}
      </p>
    </>
  );
};

export default GenreHeader;
