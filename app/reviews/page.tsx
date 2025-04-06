"use client";

import { apiClient } from "@/lib/axios";
import React, { useEffect, useState } from "react";

interface Review {
  content: string;
  createdAt: string;
  updatedAt: string;
  reviewer: string;
}

const Page = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // useEffect(() => {
  //   const handleGetReviews = async () => {
  //     const reviews = await apiClient.get("/reviews");
  //     setReviews(reviews.data);
  //   };

  //   handleGetReviews();
  // }, []);

  console.log(reviews);
  
  return (
    <div className="w-full min-h-screen">
      <div className="p-5">
        <h1 className="text-3xl tracking-tight font-semibold">Reviews</h1>
      </div>
    </div>
  );
};

export default Page;
