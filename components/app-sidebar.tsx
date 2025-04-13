"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { genres } from "@/lib/books";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const params = useParams() as { genre: string };

  return (
    <Sidebar className="dark:*:bg-zinc-950">
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup className="relative bg-gradient-to-b">
          <SidebarGroupLabel>Genres List</SidebarGroupLabel>
          <SidebarGroupContent className="mt-6">
            <SidebarMenu className="relative pb-14">
              {genres.map((genre) => (
                <Link
                  key={genre.slug}
                  href={`/genres/${genre.slug}`}
                  className={cn(
                    genre.slug === params.genre &&
                      "bg-gray-100 dark:bg-zinc-900",
                    "w-full inline-flex justify-between items-center py-2 ps-4 pe-2 text-sm font-medium text-indigo-600 rounded-md border border-transparent transition duration-300 dark:text-sky-400 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 dark:hover:border-zinc-800 dark:focus:border-zinc-800 hover:bg-gray-100 hover:border-gray-200 hover:*:!text-zinc-400"
                  )}
                >
                  {genre.name}
                  <ChevronRight className="size-5 dark:text-zinc-700 " />
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="h-14 w-full absolute left-0 right-2 bottom-0 bg-gradient-to-b from-white/5 to-white/30 dark:from-black/5 dark:to-black/30 dark:supports-[backdrop-filter]:bg-black/30 supports-[backdrop-filter]:backdrop-blur-sm" />
      </SidebarContent>
    </Sidebar>
  );
}
