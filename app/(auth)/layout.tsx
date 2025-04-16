"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Quotes from "../shared/components/quotes";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const { href, name } = path.includes("sign-up")
    ? { href: "sign-in", name: "Sign In" }
    : { href: "sign-up", name: "Sign Up" };

  const heading = path.includes("sign-up") ? "Create an account" : "Sign in";

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-24 mt-20 md:justify-center md:pt-0 md:mt-0">
      <nav className="w-full flex items-center justify-between fixed top-0 px-10 py-5 mt-1">
        <div>
          <Link href="/" className="group *:group-hover:not-first:underline text-blue-500 text-sm font-semibold">
            <span className="dark:text-gray-400 mr-1">←</span> Back to home
          </Link>
        </div>
        <ul className="flex items-center gap-5 w-fit ml-auto *:*:text-sm font-semibold">
          <li>
            <Link href={`/auth/${href}`}>{name}</Link>
          </li>
        </ul>
      </nav>
      <div className="min-w-[90%] sm:min-w-sm">
        <div className="mb-8">
          <h3 className="text-xl font-medium text-center md:text-2xl">
            {heading}
          </h3>
        </div>
        {children}
        <Quotes />
      </div>
    </div>
  );
};

export default AuthLayout;
