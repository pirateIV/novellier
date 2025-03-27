"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";

const ReviewActionButtons = () => {
  const [read, setRead] = useState(false);
  const params = useParams() as { book: string };

  const toggleReadStatus = async () => {
    const data = await apiClient.post("/reading-list", {
      read,
      bookId: params.book,
    });
    console.log(data.data);
    setRead(!read);
  };

  return (
    <div className="flex items-center gap-2">
      {/* <Button className="rounded-full px-2 flex items-center gap-1">
        <BookmarkCheck className="w-4 h-4" /> Add to reading list
      </Button>
      <span className="dark:text-gray-500">·</span> */}
      <button
        className="text-sm text-amber-500 flex items-center gap-1"
        onClick={toggleReadStatus}
      >
        {read ? <CheckCircle className="w-4 h-4" /> : null}
        {read ? "Already Read" : "Mark as Read"}
      </button>
    </div>
  );
};

export default ReviewActionButtons;
