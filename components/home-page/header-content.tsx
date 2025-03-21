import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const HeaderContent = () => {
  return (
    <div className="relative col-span-7 py-16 bg-white dark:bg-transparent lg:py-0 lg:pl-20 lg:mt-16">
      <div className="mx-auto max-w-2xl px-4 lg:px-0">
        <h1 className="from-amber-600 to-gray-800 via-slate-950 font-sans text-3xl font-extrabold tracking-tighter text-balance text-transparent bg-clip-text bg-gradient-to-br dark:from-pink-500 dark:to-white dark:via-white lg:text-5xl md:text-4xl">
          Discover, Discuss, and Dive into Your Next Great Read
        </h1>
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
          Join a community of passionate readers, explore new books, share your
          insights, and find your next great read with trusted reviews.
        </p>

        <div className="flex gap-4 mt-6 sm:mt-10">
          <button className="p-1 flex bg-gray-100 rounded-full outline-gray-300 outline transition duration-300 *:transition hover:scale-105 *:active:scale-[1.04] dark:bg-white/20 dark:outline-gray-400/50 dark:focus-within:ring-2 dark:focus-within:ring-gray-400">
            <Link
              href="/auth/sign-up"
              className="relative text-sm shadow-xs shadow-gray-300 font-semibold outline -outline-offset-1 btn-gradient py-2.5 px-6 rounded-full hover:brightness-105 dark:text-white dark:bg-white dark:shadow-neutral-800"
            >
              Get Started
            </Link>
          </button>
          <button className="p-1 flex hover:bg-white/5 rounded-full">
            <Link
              href="/auth/sign-in"
              className="py-2.5 px-6 hover:bg-white/10 text-sm font-semibold rounded-full"
            >
              Log in
            </Link>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
