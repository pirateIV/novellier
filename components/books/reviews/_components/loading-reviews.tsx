"use client";

import { Loader2 } from "lucide-react";

export default function LoadingReviews({ message = "Loading reviews..." }: { message?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 z-10">
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
}