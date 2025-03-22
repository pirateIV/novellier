import React from "react";
import type { Review } from "@/shared/types";
import { format } from "date-fns";

const ReviewMeta = ({ review }: { review: Review }) => {
  return (
    <div className="mt-3 text-sm text-gray-400">
      <span>
        {new Date(review.createdAt).toLocaleTimeString("en-US", {
          timeStyle: "short",
        })}
      </span>
      <span className="mx-2">&middot;</span>
      <span>{format(new Date(review.createdAt), "MMMM dd, yyyy")}</span>
    </div>
  );
};

export default ReviewMeta;
