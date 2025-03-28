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

const BookDetailsPage = async ({ params }: ParamIdProps) => {
  const id = (await params).id;
  if (!id) return notFound();

  const data = await fetchBookAndAuthorData(id);
  if (!data) return notFound();

  const {
    book: { description, title },
  } = data;

  const descriptionHTML = await markdownToHtml(description);

  return (
    <BookProvider {...data}>
      <title>{title}</title>
      <div className="mx-auto md:max-w-5xl w-full px-3 md:px-4 py-8">
        <div className="mb-8">
          <BookHeader />
          <div className="flex flex-col-reverse justify-beween gap-8 md:flex-row">
            <BookCover />
            <div className="w-full md:order-2 md:w-2/3">
              <BookDetails />
              <div className="mb-6">
                <h3 className="mb-3 text-lg sm:text-xl font-semibold">
                  About this book
                </h3>
                <div className="leading-relaxed text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
                  <BookDescription description={descriptionHTML} />
                </div>
              </div>
              <BookResources />
            </div>
          </div>
        </div>
        {/* <BookReviews id={id} /> */}
      </div>
    </BookProvider>
  );
};

export default BookDetailsPage;
