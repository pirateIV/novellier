import { Calendar, ChevronRight, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { genres } from "@/lib/books";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Genres List</SidebarGroupLabel>
          <SidebarGroupContent className="mt-6">
            <SidebarMenu>
              {genres.map((genre) => (
                <Link
                  key={genre.slug}
                  href={`/genres/${genre.slug}`}
                  className="w-full inline-flex justify-between items-center py-2 ps-4 pe-2 text-sm font-medium text-indigo-600 rounded-md border border-transparent transition duration-300 dark:text-sky-400 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 hover:bg-gray-100 hover:border-gray-200 hover:*:!text-zinc-400"
                >
                  {genre.name}
                  <ChevronRight className="size-5 dark:text-zinc-700 " />
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
