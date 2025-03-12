"use client";

import type React from "react";
import { ThemeProvider } from "./theme-provider";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
};

export default Providers;
