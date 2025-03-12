import React from "react";
import client from "@/lib/apollo-client";

import { notFound } from "next/navigation";
import { ParamIdProps } from "@/shared/types";
import { BookProvider } from "@/context/book-context";
import { GET_AUTHOR_DATA, GET_BOOK_DATA } from "@/lib/graphql/queries";
import { AuthorResponse, BookResponse } from "@/lib/graphql/types";
import BookHeader from "@/components/books/book-header";
import BookCover from "@/components/books/book-cover";
import BookReviews from "@/components/books/book-reviews";
import BookDetails from "@/components/books/book-details";

const BookDetailsPage = async ({ params }: ParamIdProps) => {
  if (!params?.id) return notFound();

  const {
    data: { book },
  } = await client.query<{ book: BookResponse }>({
    query: GET_BOOK_DATA,
    variables: { id: params.id },
    fetchPolicy: "cache-first",
  });

  if (!book) return notFound();

  console.log({book})

  const authorId = book.authors[0].author.key.replace("/authors/", "");

  const authorPromise = client.query<{ author: AuthorResponse }>({
    query: GET_AUTHOR_DATA,
    variables: { id: authorId },
    fetchPolicy: "cache-first",
  });

  const {
    data: { author: authorData },
  } = await authorPromise;

  const props = { book, author: { ...authorData, authorId } };

  return (
    <BookProvider {...props}>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <BookHeader />
          <div className="flex flex-col gap-8 md:flex-row">
            <BookCover />
            <BookDetails />
          </div>
        </div>
        <BookReviews />
      </div>
    </BookProvider>
  );
};

export default BookDetailsPage;
