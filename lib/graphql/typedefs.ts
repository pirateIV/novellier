import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Genre {
    title: String
    authors: [Author]
    first_publish_year: Int
    cover_id: Int
    key: String
  }

  type Book {
    title: String
    description: String
    first_publish_date: String
    totalReviews: Int
    authors: [BookAuthor]
    links: [BookLink]
    subjects: [String]
    # covers: [Int]
  }

  type Author {
    name: String
    personal_name: String
    fuller_name: String
    alternate_names: [String]
    bio: String
    photos: [Int]
    location: String
    birth_date: String
    death_date: String
    links: [AuthorLinks]
  }

  type AuthorLinks {
    title: String
    url: String
  }

  type BookAuthor {
    author: AuthorKey
  }

  type BookLink {
    title: String
    url: String
  }

  type AuthorKey {
    key: String
  }

  type Author {
    name: String
  }

  type Response {
    key: String
    name: String
    works: [Genre]
  }

  type Query {
    author(id: ID!): Author
    book(id: ID!): Book
    genre: [Response]
  }
`;
