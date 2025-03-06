import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";

const ReviewsTab = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center bg-neutral-900/50 rounded-[20px] border border-dashed border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="relative">
        <Image
          src="/reviews.png" // Replace with a relevant image for reviews
          width={250}
          height={250}
          className="size-[250px] mx-auto dark:invert opacity-[.02] hover:opacity-30 transition-opacity duration-300"
          alt="Review placeholder"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Edit className="size-12 text-neutral-500 hover:text-neutral-400 transition-colors duration-300" />
        </div>
      </div>
      <p className="text-center text-neutral-400 mt-4 text-lg font-medium">
        No reviews written yet.
      </p>
      <p className="text-center text-neutral-500 mt-2 text-sm max-w-[400px]">
        Share your thoughts and insights by writing your first book review. Help
        others discover great reads!
      </p>
      <Button
        className="mt-6 text-sm font-medium bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/10 hover:border-white/20 transition-all duration-300"
        variant="outline"
      >
        <Edit className="size-4" />
        Write Your First Review
      </Button>
    </div>
  );
};

export default ReviewsTab;
