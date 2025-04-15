// export type BookResponse = {
//   title: string;
//   description: string;
//   first_publish_date: string;
//   subjects: [string];
//   totalReviews: number;
//   stats: {
//     totalReviews: number;
//     averageRating: string;
//   };
//   links: {
//     title: string;
//     url: string;
//   }[];
//   authors: {
//     author: {
//       key: string;
//     };
//   }[];
// };

import { Review } from "@/shared/types";

// export type AuthorResponse = {
//   authorId: any;
//   name: string;
//   bio: string;
//   photos: string[];
//   birth_date: string;
//   death_date: string;
//   links: {
//     title: string;
//     url: string;
//   }[];
// };

export type Author = {
  authorId: string;
  name: string;
};

export interface BookResponse {
  [x: string]: any;
  author: Author;
  title: string;
  book_review: {
    id: string | null;
    has_review: boolean;
  };
  first_publish_year: string | number;
  description: string;
  authorsCount: number;
  subjects: string[];
  characters: string[];
  stats: { averageRating: string; totalReviews: number };
  links: { title: string; url: string }[];
}

export interface ReviewsResponse {
  reviews: Review[];
  totalReviews: number;
}
