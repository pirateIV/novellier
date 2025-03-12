import React from "react";
import { Toaster } from "sonner";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {children}
      <Toaster />
    </main>
  );
};

export default MainContainer;
