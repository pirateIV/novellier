export interface ParamIdProps {
  params: Promise<{ id: string }>;
}

export interface User {
  averageRating: string;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  fullName: string;
  email: string;
  books: any[];
  createdAt: string;
  updatedAt: string;
  reviews: string[];
  totalReviews: number;
  noOfReviews: number;
  noOfRatings: number;
}

export interface Subject {
  name?: string;
  work_count: number;
  works: Work[];
}

export interface Work {
  key: string;
  title: string;
  first_publish_year: string | number;
  description:
    | {
        value?: string;
      }
    | string
    | undefined;

  cover_id: string | number;
  authors: {
    name: string;
    key: string;
  }[];
}

export interface Reviewer {
  fullName: string;
}

export interface Review {
  bookId: string;
  rating: number;
  content: string;
  createdAt: string;
  reviewer: Reviewer;
}

export interface ReviewResponse {
  reviews: Exclude<Review, "bookId">[];
  totalReviews: number;
  averageRating: string;
  reviewUser: {
    hasReviewAvailable: boolean;
    reviewId: string | null;
  }
}
export interface Book {
  title: string;
}

export interface Params {
  id: string;
}

export interface BookData {
  book: Book;
  coverId: string;
}
