import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen fixed inset-0 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 flex flex-col items-center justify-center overflow-hidden z-[200]">
      <h1 className="text-2xl mb-4">Failed to load resource.</h1>
      <p className="text-sm text-red-500">Book not found, invalid <span className="font-medium italic">id</span></p>
    </div>
  );
};

export default NotFound;
