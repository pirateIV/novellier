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
import { cookies } from "next/headers";
import { unstable_noStore } from "next/cache";

const BookDetailsPage = async ({ params }: ParamIdProps) => {
  unstable_noStore();

  const id = (await params).id;
  const token = (await cookies()).get("token")?.value;
  if (!id) return notFound();

  const data = await fetchBookAndAuthorData(id);
  if (!data) return notFound();

  const {
    book: { description, title },
  } = data;

  const descriptionHTML = await markdownToHtml(description);

  const reviewProps = { id, token };

  return (
    <BookProvider book={data.book} author={data.author}>
      <title>{title}</title>
      <div className="mx-auto md:max-w-5xl w-full px-3 md:px-4 py-8">
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
                  <BookDescription description={descriptionHTML} />
                </div>
              </div>
              <BookResources book={data.book} />
            </div>
          </div>
        </div>
        <BookReviews {...reviewProps} />
      </div>
    </BookProvider>
  );
};

export default BookDetailsPage;
