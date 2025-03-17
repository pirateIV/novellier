"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { useUserData } from "@/context/UserContext";
const HomePage = () => {
  const { isAuthenticated } = useUserData();
  console.log(isAuthenticated);

  return (
    <div className="min-h-full flex flex-col">
      <header className="lg-bg-transparent overflow-hidden bg-slate-100 dark:bg-background lg:px-5 lg:bg-transparent">
        <div className="mx-auto max-w-6xl isolate grid grid-cols-1 gap-y-16 pt-16 lg:grid-cols-12 lg:gap-y-0 lg:py-32">
          <div className="w-full flex col-span-full justify-center justify-self-center self-center lg:col-span-5 lg:row-span-3">
            <div className="relative shadow-lg shadow-gray-400 rounded-xl overflow-hidden w-64 mx-auto *:rounded-xl md:w-80 lg:w-auto dark:shadow-gray-950">
              <Image
                src="/hero.jpg"
                width="960"
                height="1024"
                className="w-full"
                alt="book cover"
                priority
              />
              <div className="[background-image:linear-gradient(to_bottom,rgba(0,0,0,0.2)_80%,#0a0a0a)] border-t-2 border-t-white/40 inset-shadow absolute inset-0 z-10 dark:border-t-white/20"></div>
            </div>
          </div>
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
                    “J.K. Rowling masterfully deepens the wizarding world in
                    this book. The introduction of Dementors, Patronuses, and
                    Hogsmeade added so much magic to the series.”
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
          <div className="relative col-span-7 py-16 bg-white dark:bg-transparent lg:py-0 lg:pl-20 lg:mt-16">
            <div className="mx-auto max-w-2xl px-4 lg:px-0">
              <h1 className="from-amber-600 to-gray-800 via-slate-950 font-sans text-3xl font-extrabold tracking-tighter text-balance text-transparent bg-clip-text bg-gradient-to-br dark:from-pink-500 dark:to-white dark:via-white lg:text-5xl md:text-4xl">
                Discover, Discuss, and Dive into Your Next Great Read
              </h1>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
                Join a community of passionate readers, explore new books, share
                your insights, and find your next great read with trusted
                reviews.
              </p>

              <div className="flex gap-6 mt-6 sm:mt-10">
                <button className="p-1 flex bg-gray-100 rounded-full outline-gray-300 outline transition duration-300 *:transition hover:scale-105 *:active:scale-[1.04] dark:bg-white/20 dark:outline-gray-400 dark:focus-within:ring-2 dark:focus-within:ring-gray-400">
                  <Link
                    href="/auth/sign-up"
                    className="text-sm shadow-xs shadow-gray-300 font-semibold outline -outline-offset-1 bg-white py-2.5 px-6 rounded-full hover:brightness-105 dark:text-gray-900 dark:bg-white dark:shadow-neutral-800"
                  >
                    Get Started
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <footer className="p-6 text-sm text-gray-600 bg-gray-100 dark:text-gray-200 dark:bg-black">
        <div className="mx-auto max-w-6xl flex justify-between">
          <p>
            © 2024 <span className="font-medium text-gray-800 dark:text-white">Book Club</span>
          </p>
          <nav className="flex gap-4">
            {isAuthenticated ? (
              <Link href="/me" className="hover:underline">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/sign-up" className="hover:underline">
                  Create Account
                </Link>
                <Link href="/auth/sign-in" className="hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
