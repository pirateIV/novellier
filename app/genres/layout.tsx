import React from "react";

const GenreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ps-8 mx-auto">
      {children}
      <div className="w-[110px] row-span-full max-sm:hidden top-0 text-gray-950/5 border-x border-x-current bg-fixed bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
    </div>
  );
};

export default GenreLayout;
