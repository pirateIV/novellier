import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";

const ReviewsTab = () => {
  return (
    <div className="h-72 flex flex-col justify-center items-center py-12">
      <p className="mt-4 text-lg font-medium text-center text-neutral-400 dark:text-white">
        No reviews written yet.
      </p>
      <p className="text-center text-neutral-500 dark:text-gray-400 mt-2 text-sm max-w-[400px]">
        Share your thoughts by writing your first book review, or explore the genres page to discover exciting books worth reading and reviewing!
      </p>
      <Button
        className="bg-white/10 border-white/10 mt-6 text-sm font-medium text-neutral-200 border transition-all duration-300 hover:bg-white/20 hover:border-white/20"
        // variant="p"
      >
        <Edit className="size-4" />
        Write a Review
      </Button>
    </div>
  );
};

export default ReviewsTab;