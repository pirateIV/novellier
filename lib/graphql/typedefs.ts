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
    links: [BookLink]
  }

  type BookLink {
    title: String
    url: String
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
    book(id: ID!): Book
    genre: [Response]
  }
`;
