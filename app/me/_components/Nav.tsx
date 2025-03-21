import React from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { BookOpen } from "lucide-react";

const Nav = () => {
  return (
    <div className="flex items-center gap-2 fixed z-50 bg-neutral-100 dark:bg-zinc-950  border border-zinc-300 dark:border-zinc-800 px-2 py-1 rounded-full top-5 inset-x-0 m-auto w-fit  transition-[width,colors_0.35s_cubic-bezier(0.68,-0.55,0.27,1.55)] ">
      <Link href="/" className="p-1  rounded-full hover:bg-gray-300 dark:hover:bg-zinc-700">
        <Icons.HomeIcon />
      </Link>
      <Link href="/genres" className="p-1  rounded-full hover:bg-gray-300 dark:hover:bg-zinc-700">
        <BookOpen className="size-5"/>
      </Link>
      <Link
        href="/"
        className="group inline-flex *:shrink-0 w-7 whitespace-nowrap overflow-x-clip items-center text-sm p-1 rounded-full [&>span]:text-transparent hover:[&>span]:text-white hover:text-white dark:hover:[&>span]:text-gray-900 dark:hover:text-gray-900 hover:bg-neutral-900 dark:hover:bg-white  transition-[width,colors,background-color_0.35s_cubic-bezier(0.68,-0.55,0.27,1.55)] hover:w-max focus-visible:w-max"
      >
        <Icons.Plus />
        <span className="px-1 font-medium ">Add Book</span>
      </Link>
    </div>
  );
};

export default Nav;
