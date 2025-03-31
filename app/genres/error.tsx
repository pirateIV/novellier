"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

const GenreErrorPage = () => {
  return (
    <div>
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
