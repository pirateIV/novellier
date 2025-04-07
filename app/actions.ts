"use server";

import dbConnect from "@/lib/db";
import { BookResponse } from "@/lib/graphql/types";
import { baseURL } from "@/shared/config";
import { Book, Review, ReviewResponse } from "@/shared/types";

interface ReviewBookType {
  title: string;
  author: string;
  id: string;
}

export interface ReviewPageType {
  current: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface BookReviewsResponse {
  book: ReviewBookType;
  reviews: Omit<Review[], "bookId">;
  page: ReviewPageType;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
}

export async function getBookReviews(
  bookId: string,
  page = 1,
  sortBy = "newest"
) {
  try {
    await dbConnect();
    const response = await fetch(
      baseURL + `/reviewsv2/${bookId}/search?page=${page}&sortBy=${sortBy}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
}

export const getBookAndAuthor = async (id: string) => {
  const [bookResponse, reviewResponse] = await Promise.all([
    await fetch(baseURL + `/bookv2/${id}`),
    await fetch(baseURL + `/reviewsv2/${id}`),
  ]);

  const book = (await bookResponse.json()) as BookResponse;
  const reviews = (await reviewResponse.json()) as ReviewResponse;

  return { book, reviews };
};
