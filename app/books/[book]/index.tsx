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
import { baseURL } from "@/shared/config";
import { Review } from "@/shared/types";
import { formatDate } from "@/shared/utils";
import StarRatingList from "@/shared/components/StarRatingList";
import { cn } from "@/lib/utils";
import { getRandomColor } from "@/lib/helpers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const BookOverview = () => {
  const params = useParams();
  const id = params?.book as string;
  const [data, setData] = useState<{
    book: BookResponse;
    author: AuthorResponse;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookDescription, setBookDescription] = useState<string>("");
  const [optimisticData, setOptimisticData] = useOptimistic(null);
  const [reviews, setReviews] = useState<{
    reviews: Review[];
    totalReviews: number;
  }>({
    reviews: [],
    totalReviews: 0,
  });

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

    const fetchReviews = async () => {
      await fetch(baseURL + `/reviewsv2/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
          console.log(data);
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
        });
    };

    fetchData();
    fetchReviews();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-[calc(100vh-55px)]  w-full flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  if (error || !data) return <div>Book not found</div>;

  return (
    <div className="min-h-[calc(100vh-55px)]  w-full">
      <title>{data.book.title}</title>
      <div className="mx-auto md:max-w-5xl px-3 md:px-4 py-8">
        <div className="mb-8">
          <BookHeader book={data.book} />
          <div className="flex flex-col-reverse justify-beween gap-8 md:flex-row">
            <BookCover book={data.book} />
            <div className="w-full md:order-2 md:w-2/3">
              <BookDetails id={id} {...data} />
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
        <div className="pt-8 mt-12 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold tracking-tight font-sans">
              Community Reviews
            </h3>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400">
              {reviews.totalReviews}{" "}
              {reviews.totalReviews === 1 ? "review" : "reviews"}
            </p> */}
            <div className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full dark:bg-secondary">
              <span className="font-bold">{reviews?.totalReviews || 0}</span>{" "}
              <span className="text-gray-500 dark:text-gray-300">
                {reviews.totalReviews === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>

          {reviews.reviews?.length === 0  ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No reviews yet. Be the first to review this book!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-y-zinc-800">
              {reviews.reviews?.map((review) => (
                <div
                  key={review.id}
                  className="relative p-4 first-of-type:rounded-t-lg last-of-type:rounded-b-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div
                      className={cn(
                        "size-10 shrink-0 rounded-full border flex items-center justify-center",
                        getRandomColor(review.reviewer.firstName)
                      )}
                    >
                      <span className="text-sm font-medium text-white">
                        {review.reviewer.fullName.charAt(0)}
                      </span>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {review.reviewer.fullName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 mb-2">
                        <StarRatingList rating={review.rating} />
                        <span className="text-gray-400 dark:text-gray-500">
                          ·
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {review.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reviews.reviews?.length > 0 && (
            <div className="flex justify-center mt-6">
              <Link href={`/books/${id}/reviews`}>
                <Button variant="outline" className="flex items-center gap-2">
                  View all reviews
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookOverview;
