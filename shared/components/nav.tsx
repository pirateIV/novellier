"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", path: "/" },
  { name: "Genres", path: "/genres" },
  { name: "Reviews", path: "/reviews" },
  { name: "Dashboard", path: "/me" },
];

const Navigation = () => {
  const pathname = usePathname();
  let isGenresRoute = pathname.includes("/genres");

  const className = isGenresRoute
    ? "flex justify-between sticky top-0 inset-x-0 py-4 border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 z-[100]"
    : "sticky top-0 inset-x-0 py-4 border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 z-[100]";

  return (
    <nav className={className}>
      {isGenresRoute && <SidebarTrigger />}
      <ul className="flex items-center md:justify-end gap-6 text-sm *:font-medium justify-center md:pe-16">
        {links.map((link) => (
          <li key={link.name} className="hover:opacity-75">
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
