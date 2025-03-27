import client from "@/lib/apollo-client";
import { GET_AUTHOR_DATA, GET_BOOK_DATA } from "@/lib/graphql/queries";
import { AuthorResponse, BookResponse } from "@/lib/graphql/types";

export const fetchBookAndAuthorData = async (bookId: string) => {
  const {
    data: { book },
  } = await client.query<{ book: BookResponse }>({
    query: GET_BOOK_DATA,
    variables: { id: bookId },
    // fetchPolicy: "cache-first",
  });

  if (!book) return null;

  const authorId = book.authors[0].author.key.replace("/authors/", "");

  const {
    data: { author },
  } = await client.query<{ author: AuthorResponse }>({
    query: GET_AUTHOR_DATA,
    variables: { id: authorId },
    // fetchPolicy: "cache-first",
  });

  return { book, author: { ...author, authorId } };
};

export const fetchBookReviewsData = async (bookId: string) => {
  const {
    data: { book },
  } = await client.query<{ book: BookResponse }>({
    query: GET_BOOK_DATA,
    variables: { id: bookId },
    // fetchPolicy: "cache-first",
  });

  if (!book) return null;

  const authorId = book.authors[0].author.key.replace("/authors/", "");

  const {
    data: { author },
  } = await client.query<{ author: AuthorResponse }>({
    query: GET_AUTHOR_DATA,
    variables: { id: authorId },
    // fetchPolicy: "cache-first",
  });

  return { book, author: { ...author, authorId } };
};
