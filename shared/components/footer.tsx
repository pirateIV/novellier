import Link from "next/link";
import React from "react";

const Footer = () => {
  const isAuthenticated = true;
  
  return (
    <footer className="p-6 text-sm text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-background">
      <div className="mx-auto max-w-6xl flex justify-between">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Book Club
          </span>
          <span className="mx-2">&middot;</span>
          <span>
            A home for readers like you. Built by{" "}
            <Link
              href="https://github.com/pirateIV"
              className="font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-500/70"
              target="_blank"
            >
              @pirateIV
            </Link>
          </span>
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
  );
};

export default Footer;
