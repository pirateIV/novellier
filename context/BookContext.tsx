"use client";

import { AuthorResponse, BookResponse } from "@/lib/graphql/types";
import { createContext, useContext } from "react";

interface BookContextProps {
  book: BookResponse;
  author: AuthorResponse;
}

const BookContext = createContext<BookContextProps | null>(null);

export const BookProvider = ({
  book,
  author,
  children,
}: {
  book: BookResponse;
  author: AuthorResponse;
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
