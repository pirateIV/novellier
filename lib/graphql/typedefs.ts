import { gql } from "@apollo/client";

export const typeDefs = gql`
    type Book {
        title: String
        cover_id:  Number
        authors: [Author]
        first_publish_year: Number
        key: String
    }

    type Author {
        name: String;
    }

    type Query {
        genre: [Book]
    }
`;
