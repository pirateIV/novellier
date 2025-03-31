import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <nav>
        <div></div>
        <div></div>
      </nav>

      <div className="mx-auto max-w-4xl mt-10 mb-8">
        <h1 className="font-[family-name:Magic_Alphabet] text-transparent text-6xl font-extrabold tracking-tight text-balance bg-gradient-to-br from-amber-100 via-amber-600 to-pink-400 bg-clip-text">
          Discover, Discuss, and Dive into Your Next Great Read
        </h1>
        <p className="mx-24 mt-4 text-lg text-gray-500">
          Join a community of passionate readers, explore new books, share your
          insights, and find your next great read with trusted reviews.
        </p>

        <div className="flex justify-center gap-6 mt-6 sm:mt-10">
          <button className="p-1 flex bg-gray-100 rounded-full outline-gray-300 outline transition hover:scale-105 active:scale-[1.02]">
            <Link
              href="/"
              className="text-sm font-medium bg-amber-500 text-white py-2.5 px-6 rounded-full hover:brightness-105 "
            >
              Get Started
            </Link>
          </button>
        </div>
      </div>

      <footer>
        <div className="px-10 py-5 mt-5 text-sm text-zinc-700 border-t">
          <span>
            © <span className="font-medium text-zinc-900">TBR</span>(To Be Read)
          </span>
          <span className="mx-2">·</span>
          <span>
            A home for readers like you. Built by{" "}
            <Link
              href="https://github.com/pirateIV"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              target="_blank"
            >
              @pirateIV
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
