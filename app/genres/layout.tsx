import React from "react";

const GenreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex px-8 mx-auto">
      {children}
    </div>
  );
};

export default GenreLayout;
