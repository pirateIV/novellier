"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader, LoaderCircle, RotateCw } from "lucide-react";
import { useBook } from "@/lib/graphql/hooks";
import { Button } from "@/components/ui/button";

const Error = () => {
  const params = useParams() as { id: string };
  const { refetch, error: fetchError, loading } = useBook(params.id);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleRefetch = async () => {
    if (retryCount < maxRetries) {
      await refetch();
      setRetryCount(retryCount + 1);
    }
  };

  useEffect(() => {
    if (fetchError && retryCount < maxRetries) {
      console.log("refetching...");
      handleRefetch();
    }
  }, [fetchError]);

  console.log(fetchError?.message);

  return (
    <div className="w-full h-screen fixed inset-0 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30 flex flex-col items-center justify-center overflow-hidden z-[200]">
      <h1 className="mb-2 text-4xl text-center">Oops, couldn't get data...</h1>
      <div className="text-sm text-red-500">failed to fetch</div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Button
          variant="ghost"
          className="rounded-sm"
          title="Reload Page"
          onClick={() => window.location.reload()}
        >
          <RotateCw strokeWidth="2" size="10" />
        </Button>
        <Button
          className="rounded-sm"
          variant="ghost"
          onClick={() => refetch({ id: params.id })}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" />
              <span className="text-gray-400">Retrying...</span>
            </>
          ) : (
            <span>Retry</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Error;
