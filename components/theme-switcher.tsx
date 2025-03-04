"use client";

import * as React from "react";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center gap-x-px">
      <button className="p-1 rounded-full" onClick={() => setTheme("light")}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </button>
      <button className="p-1 rounded-full" onClick={() => setTheme("dark")}>
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>
      <button className="p-1 rounded-full" onClick={() => setTheme("system")}>
        <LaptopMinimal className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>
    </div>
  );
}
