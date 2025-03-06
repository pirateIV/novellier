import React from "react";
import Image from "next/image";
import { Plus, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyBooksTab = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center bg-neutral-900/50 rounded-[20px] border border-dashed border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="relative">
        <Image
          src="/book.png"
          width={250}
          height={250}
          className="size-[250px] mx-auto dark:invert opacity-[.02] hover:opacity-30 transition-opacity duration-300"
          alt="Book placeholder"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <PlusCircle className="size-12 text-neutral-500 hover:text-neutral-400 transition-colors duration-300" />
        </div>
      </div>
      <p className="text-center text-neutral-400 mt-4 text-lg font-medium">
        No books added yet.
      </p>
      <p className="text-center text-neutral-500 mt-2 text-sm max-w-[400px]">
        Start building your library by adding your first book. Explore new
        stories, track your progress, and share your reviews.
      </p>
      <Button
        className="mt-6 text-sm font-semibold bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/10 hover:border-white/20 transition-all duration-300"
        variant="outline"
      >
        <Plus className="size-4" />
        Add Your First Book
      </Button>
    </div>
  );
};

export default MyBooksTab;
