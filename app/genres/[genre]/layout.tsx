import React from "react";
const GenreLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full min-h-screen">{children}</div>;
};

export default GenreLayout;
