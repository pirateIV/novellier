import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen fixed inset-0 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 flex flex-col items-center justify-center overflow-hidden z-[200]">
      <h1>Invalid Book id!</h1>
    </div>
  );
};

export default NotFound;
