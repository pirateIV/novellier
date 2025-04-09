"use client";

import type React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "./theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReviewsProvider } from "@/context/ReviewContext";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
    >
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <UserProvider>
            <ReviewsProvider>{children}</ReviewsProvider>
          </UserProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
