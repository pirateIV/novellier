"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Quotes from "../shared/components/quotes";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const { href, name } = path.includes("sign-up")
    ? { href: "/sign-in", name: "Sign In" }
    : { href: "/sign-up", name: "Sign Up" };

  const heading = path.includes("sign-up") ? "Create an account" : "Sign in";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center">
      <nav className="fixed top-0 mt-1 py-5 px-10 w-full">
        <ul className="flex items-center gap-5 w-fit ml-auto *:*:text-sm font-medium">
          <li>
            <Link href={`/auth/${href}`}>{name}</Link>
          </li>
        </ul>
      </nav>
      <div className="min-w-sm">
        <div className="mb-8">
          <h3 className="text-2xl font-medium text-center">{heading}</h3>
        </div>
        {children}
        <Quotes />
      </div>
    </div>
  );
};

export default AuthLayout;
