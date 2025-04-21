"use client";

import React from "react";
import { SearchX } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-55px)]">
      <div className="-mt-14 mx-auto max-w-[290px] text-center">
        <SearchX className="size-10 text-amber-500 mx-auto brightness-50" />
        <h1 className="mt-6 text-2xl">Review not found</h1>
        <p className="text-sm text-gray-400 mt-2">
          This review doesn't exist or might have been deleted
        </p>
      </div>
    </div>
  );
};

export default Error;
