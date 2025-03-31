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
      <ul className="flex items-center md:justify-end gap-4 md:gap-6 text-[13px] sm:text-sm *:font-medium justify-center md:pe-7">
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
