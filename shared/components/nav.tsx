"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  let isGenresRoute = pathname.includes("/genres");

  return (
    <nav
      className={
        isGenresRoute
          ? "flex justify-between sticky top-0 inset-x-0 py-4 border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 z-[100]"
          : "sticky top-0 inset-x-0 py-4 border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 z-[100]"
      }
    >
      {isGenresRoute && <SidebarTrigger />}
      <ul className="flex items-center md:justify-end gap-6 text-sm *:font-medium justify-center md:pe-16">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/genres">Genres</Link>
        </li>
        <li>
          <Link href="/reviews">Reviews</Link>
        </li>
        <li>
          <Link href="/me">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
