// app/books/[book]/page.tsx
import React from "react";
import { markdownToHtml } from "@/lib/mdx";
import BookHeader from "@/components/books/book-header";
import BookCover from "@/components/books/book-cover";
import BookDetails from "@/components/books/book-details";
import BookDescription from "@/components/books/book-description";
import BookResources from "@/components/books/book-resources";
import { getBookAndAuthor } from "@/app/actions";
import BookReviews from "./book-reviews";
import { BookResponse } from "@/lib/graphql/types";

const BookOverview = async ({
  id,
  search,
  bookData,
  description,
}: {
  id: string;
  search: {
    book_cover_id: string;
  }
  bookData: BookResponse;
  description: string;
}) => {
  if (!id) {
    return <div>Book not found</div>;
  }

  const reviewProps = {
    id,
    reviews: bookData.reviews,
    search,
    bookData,
    totalReviews: bookData.stats?.totalReviews || 0,
  };

  const coverProps = {id, book: bookData}

  try {
    return (
      <div className="min-h-[calc(100vh-55px)] w-full">
        <title>{bookData.title}</title>
        <div className="mx-auto md:max-w-5xl px-3 md:px-4 py-8">
          <div className="mb-8">
            <BookHeader book={bookData} />
            <div className="grid grid-cols-10 justify-beween gap-6 md:gap-16">
              <BookCover {...coverProps} />
              <div className="w-full col-span-full md:col-span-7">
                <BookDetails id={id} {...bookData} />
                <div className="mb-6 order-first">
                  <h3 className="mb-3 text-lg sm:text-xl font-semibold">
                    About this book
                  </h3>
                  <div className="leading-relaxed text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
                    <BookDescription description={description} />
                  </div>
                </div>
                <BookResources book={bookData} />
              </div>
            </div>
          </div>
          <BookReviews {...reviewProps} />
        </div>
      </div>
    );
  } catch (err) {
    console.error("Error fetching book data:", err);
    return <div>Error loading book data</div>;
  }
};

export default BookOverview;
