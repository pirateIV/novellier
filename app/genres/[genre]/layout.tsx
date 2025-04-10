import React from "react";
const GenreLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full min-h-[calc(100vh-55px)]">{children}</div>;
};

export default GenreLayout;
