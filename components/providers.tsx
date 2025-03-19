"use client";

import type React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
    >
      <ApolloProvider client={client}>
        <UserProvider>{children}</UserProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default Providers;
