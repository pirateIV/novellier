import React from "react";

import { notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/mdx";
import { ParamIdProps } from "@/shared/types";
import { BookProvider } from "@/context/BookContext";
import BookHeader from "@/components/books/book-header";
import BookCover from "@/components/books/book-cover";
import BookReviews from "@/components/books/reviews/book-reviews";
import BookDetails from "@/components/books/book-details";
import BookDescription from "@/components/books/book-description";
import BookResources from "@/components/books/book-resources";
import { fetchBookAndAuthorData } from "@/services/bookService";
import { GetServerSideProps } from "next";

const BookDetailsPage = async ({ params }: { params: { slug: string[] } }) => {
  if (params) return notFound();

  console.log(params);

  //   const data = await fetchBookAndAuthorData(params.slug[0]);
  //   if (!data) return notFound();

  return <></>;

  const {
    book: { description, title },
  } = data;

  const descriptionHTML = await markdownToHtml(description);

  return (
    <BookProvider {...data}>
      <title>{title}</title>
      <div className="mx-auto md:max-w-5xl px-4 py-8">
        <div className="mb-8">
          <BookHeader />
          <div className="flex flex-col justify-beween gap-8 md:flex-row">
            <BookCover />
            <div className="w-full md:order-0 md:w-2/3">
              <BookDetails />
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold">About this book</h3>
                <div className="leading-relaxed text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
                  <BookDescription description={descriptionHTML} />
                </div>
              </div>
              <BookResources />
            </div>
          </div>
        </div>
        <BookReviews />
      </div>
    </BookProvider>
  );
};

export default BookDetailsPage;
