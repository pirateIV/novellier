import { gql } from "@apollo/client";

export const GET_BOOK_DATA = gql`
  query Book($id: ID!) {
    book(id: $id) {
      title
      description
      first_publish_date
      subjects
      stats {
        averageRating
        totalReviews
      }
      authors {
        author {
          key
        }
      }
      links {
        title
        url
      }
    }
  }
`;

export const GET_BOOKS_DATA = gql`
  query Books {
    genre {
      key
      name
      works {
        key
        title
        authors {
          name
        }
        cover_id
      }
    }
  }
`;

export const GET_AUTHOR_DATA = gql`
  query Author($id: ID!) {
    author(id: $id) {
      name
      bio
      photos
      birth_date
      death_date
      links {
        title
        url
      }
    }
  }
`;

export const SUBJECT_DATA = gql`
  query Subject($subject: String!) {
    subject(subject: $subject) {
      works {
        title
      }
    }
  }
`;