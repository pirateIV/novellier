import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const StarRatingList = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "size-3 flex items-center justify-center text-amber-500",
              i < rating ? " *:fill-amber-500" : ""
            )}
          >
            <Star />
          </div>
        ))}
    </div>
  );
};

export default StarRatingList;
