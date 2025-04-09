"use client";

import { createContext, useContext } from "react";
import { BookResponse } from "@/lib/graphql/types";

interface BookContextProps {
  book:
    | BookResponse
    | {
        title: string;
        description: string | undefined;
      };
  author:
    | {
        name: string;
        authorId: string;
      };
}

const BookContext = createContext<BookContextProps | null>(null);

export const BookProvider = ({
  book,
  author,
  children,
}: {
  book:
    | BookResponse
    | {
        title: string;
        description: string | undefined;
      };
  author:
    | {
        name: string;
        authorId: string;
      };
  children: React.ReactNode;
}) => {
  return (
    <BookContext.Provider value={{ book, author }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};

export default BookContext;
