export type BookResponse = {
  title: string;
  description: string;
  first_publish_date: string;
  subjects: [string];
  totalReviews: number;
  stats: {
    totalReviews: number;
    averageRating: string;
  };
  links: {
    title: string;
    url: string;
  }[];
  authors: {
    author: {
      key: string;
    };
  }[];
};

export type AuthorResponse = {
  authorId: any;
  name: string;
  bio: string;
  photos: string[];
  birth_date: string;
  death_date: string;
  links: {
    title: string;
    url: string;
  }[];
};
