import React from "react";
import Image from "next/image";
import { Plus, PlusCircle, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyBooksTab = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center h-72">
      <div className="relative mb-6">
        <div className="flex flex-col items-center gap-2">
          <Construction className="size-12 text-yellow-500" />
          <span className="text-yellow-500 text-sm font-medium px-3 py-1 rounded-full bg-yellow-500/10 border border-t-yellow-500/40">
            Coming Soon
          </span>
        </div>
      </div>
      <p className="text-center text-neutral-400 dark:text-white mt-2 text-lg font-medium">
        My Books feature is in development
      </p>
      <p className="text-center text-neutral-500 dark:text-gray-400 mt-2 text-sm max-w-[400px]">
        We're working hard to bring you the ability to track your personal
        library. Check back soon for updates!
      </p>
      <Button
        className="mt-6 text-sm font-semibold bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/10 hover:border-white/20 transition-all duration-300"
        variant="outline"
        disabled
      >
        <Plus className="size-4 mr-2" />
        Add Your First Book
        <span className="ml-2 text-xs opacity-70">(Coming Soon)</span>
      </Button>
    </div>
  );
};

export default MyBooksTab;