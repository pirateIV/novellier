import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const BookReviewItem = ({ review }: { review: any }) => {
  const params = useParams() as { id: string };

  return (
    <div
      key={review?.id}
      className="relative flex items-start py-4 space-x-4 hover:bg-gray-50 dark:hover:bg-white/[.04] p-2 first-of-type:rounded-t-lg last-of-type:rounded-b-lg"
    >
      <div className="avatar-fallback size-10 overflow-hidden shrink-0 rounded-full border">
        {/* <Image
              src={null}
              alt={review?.user?.name}
              height="100"
              width="100"
              className="size-full bg-cover"
            /> */}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-gray-900 dark:text-white">
          {review?.reviewer?.fullName}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "size-3 flex items-center justify-center text-amber-500",
                    i < review?.rating ? " *:fill-amber-500" : ""
                  )}
                >
                  <Star />
                </div>
              ))}
          </div>
          <span>·</span>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(new Date(review?.createdAt))}
          </p>
        </div>
        <div className="mt-2">
          <p className="w-fit flex-1 font-sans text-sm font-medium line-clamp-6 text-gray-700 dark:text-gray-300">
            {review?.content}
          </p>
        </div>
      </div>
      <span className="w-full h-full absolute inset-0">
        <Link
          className="size-full block"
          // href={`/reviews/${params.id}/${review?.id}`}
          href={`/reviews/${params.id}`}
        />
      </span>
    </div>
  );
};

export default BookReviewItem;
