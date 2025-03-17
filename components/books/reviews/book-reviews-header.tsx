import React from "react";

const BookReviewsHeader = ({ reviews }: { reviews: number }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className=" text-xl md:text-2xl font-semibold">Community Reviews</h2>
      <div className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full dark:bg-secondary">
        <span className="font-bold">{reviews}</span>{" "}
        <span className="text-gray-500 dark:text-gray-300">review(s)</span>
      </div>
    </div>
  );
};

export default BookReviewsHeader;
