import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="sticky top-0 inset-x-0 py-3 border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 z-[100]">
        <ul className="flex items-center justify-end gap-6 text-sm *:font-medium pe-16">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/genres">Genres</Link>
          </li>
          <li>
            <Link href="/reviews">Reviews</Link>
          </li>
        </ul>
      </nav>
      <div className="flex *:flex-shrink-0">
        <div className="w-[60px] left-0 max-sm:hidden text-gray-950/[.07] dark:text-white/10 border-x border-x-current bg-fixed bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
        {children}
        <div className="w-[60px] right-0 max-sm:hidden text-gray-950/[.07] dark:text-white/10 border-x border-x-current bg-fixed bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
      </div>
    </>
  );
};

export default Layout;
