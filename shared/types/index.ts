export interface ParamIdProps {
  params: Promise<{ id: string }>;
}

export interface User {
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
  name: string;
  work_count: number;
  works: Work[];
}

export interface Work {
  key: string;
  title: string;
  first_publish_year: string | number;
  cover_id: string | number;
  authors: {
    name: string;
  }[];
}
