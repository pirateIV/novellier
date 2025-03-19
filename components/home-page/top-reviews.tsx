import React from "react";
import { Star } from "lucide-react";

const TopReviews = () => {
  return (
    <div className="col-span-7">
      <div className="relative">
        <div className="bg-slate-100 absolute -left-[100vw] -top-[100vw] -right-[100vw] bottom-0 -z-10 border-b border-b-slate-200 hidden lg:block dark:bg-white/5 dark:border-b-neutral-900"></div>
        <figure className="mx-auto max-w-xl relative text-center lg:max-w-none lg:pb-14 lg:pl-20 lg:text-left">
          <div className="flex justify-center items-center gap-1 lg:justify-start">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className="size-4 text-amber-500 fill-amber-500"
                />
              ))}
          </div>
          <blockquote className="px-2 mt-2 lg:px-0">
            <p className="font-sans font-semibold line-clamp-3 text-balance md:text-lg md:line-clamp-none">
              “J.K. Rowling masterfully deepens the wizarding world in this
              book. The introduction of Dementors, Patronuses, and Hogsmeade
              added so much magic to the series.”
            </p>
          </blockquote>
          <figcaption className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            <p>
              <strong className="relative before:[content:'—_'] text-blue-600 font-semibold dark:text-sky-400">
                Benjamin Abolade
              </strong>
              , <span>Creator</span>
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default TopReviews;
