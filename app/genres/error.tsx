"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

const GenreErrorPage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Button variant="ghost" onClick={() => window.location.reload()}>
        Retry{" "}
        <span>
          <RotateCw />
        </span>
      </Button>
    </div>
  );
};

export default GenreErrorPage;
