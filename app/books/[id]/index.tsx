"use client";

import React, { useEffect, useOptimistic, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/mdx";

import BookHeader from "@/components/books/book-header";
import BookCover from "@/components/books/book-cover";
import BookDetails from "@/components/books/book-details";
import BookDescription from "@/components/books/book-description";
import BookResources from "@/components/books/book-resources";
import { getBookAndAuthor } from "@/app/actions";
import { AuthorResponse, BookResponse } from "@/lib/graphql/types";

const BookOverview = () => {
  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = useState<{
    book: BookResponse;
    author: AuthorResponse;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookDescription, setBookDescription] = useState<string>("");
  const [optimisticData, setOptimisticData] = useOptimistic(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const bookData = (await getBookAndAuthor(id)) as {
          book: BookResponse;
          author: AuthorResponse;
        } | null;
        setData(bookData);

        if (bookData) {
          const descriptionHTML = await markdownToHtml(
            bookData.book.description
          );
          setBookDescription(descriptionHTML || "");
        }
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-[calc(100vh-45px)] w-full flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  if (error || !data) return <div>Book not found</div>;

  return (
    <div className="min-h-[calc(100vh-45px)] w-full">
        <title>{data.book.title}</title>
      <div className="mx-auto md:max-w-5xl px-3 md:px-4 py-8">
        <div className="mb-8">
          <BookHeader book={data.book} />
          <div className="flex flex-col-reverse justify-beween gap-8 md:flex-row">
            <BookCover book={data.book} />
            <div className="w-full md:order-2 md:w-2/3">
              <BookDetails {...data} />
              <div className="mb-6">
                <h3 className="mb-3 text-lg sm:text-xl font-semibold">
                  About this book
                </h3>
                <div className="leading-relaxed text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
                  <BookDescription description={bookDescription} />
                </div>
              </div>
              <BookResources book={data.book} />
            </div>
          </div>
        </div>
        {/* <BookReviews {...reviewProps} /> */}
      </div>
    </div>
  );
};

export default BookOverview;
