"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", path: "/" },
  { name: "Genres", path: "/genres" },
  { name: "Reviews", path: "/reviews" },
  { name: "Dashboard", path: "/me" },
];

const getNavClassName = (isGenresRoute: boolean) => {
  // prettier-ignore
  const baseClasses = [ "sticky", "top-0", "inset-x-0", "py-4", "px-4",  "border-b", "backdrop-blur", "supports-[backdrop-filter]:bg-white/60", "dark:supports-[backdrop-filter]:bg-zinc-950/30", "z-[100]",  "md:ps-6"];
  return isGenresRoute
    ? [...baseClasses, "flex", "justify-between"].join(" ")
    : baseClasses.join(" ");
};

const Navigation = () => {
  const pathname = usePathname();
  let isGenresRoute = pathname.includes("/genres");

  return (
    <nav className={getNavClassName(isGenresRoute)}>
      {isGenresRoute && <SidebarTrigger />}
      <ul
        className={cn(
          "flex items-center md:justify-end  md:gap-6 text-[13px] sm:text-sm *:font-medium justify-center md:pe-7",
          isGenresRoute ? "gap-4" : "gap-10"
        )}
      >
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
