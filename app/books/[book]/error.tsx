"use client";

import React from "react";
import { useParams } from "next/navigation";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
  const params = useParams() as { id: string };

  return (
    <div className="w-full h-screen fixed inset-0 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 flex flex-col items-center justify-center overflow-hidden z-[200]">
      <h1 className="mb-2 text-2xl lg:text-4xl text-center">This Page failed to load...</h1>
      <div className="text-sm text-sky-400">Please reload.</div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {/* <Button
          variant="ghost"
          className="text-blue-600 dark:text-blue-500"
          asChild
        >
          <Link href="/genres">Explore other books</Link>
        </Button> */}
        <Button
          variant="ghost"
          className="rounded-sm"
          title="Reload Page"
          onClick={() => window.location.reload()}
        >
          <RotateCw strokeWidth="2" size="10" />
          <span>Retry</span>
        </Button>
      </div>
    </div>
  );
};

export default Error;
