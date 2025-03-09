import client from "@/lib/apollo-client";
import { cn } from "@/lib/utils";
import { NextRequest } from "next/server";
import React from "react";

import { gql } from "@apollo/client";

interface BookData {
  title: string;
  first_publish_date: string;
  description: string;
  links: {
    url: string;
    title: string;
  }[];
}

const BOOK_DATA = gql`
  query Book($id: ID!) {
    book(id: $id) {
      title
      first_publish_date
      description
      links {
        url
        title
      }
    }
  }
`;

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { title: string };
}) => {
  const { data, error } = await client.query<{ book: BookData }>({
    query: BOOK_DATA,
    variables: { id: params.id },
  });

  if (error) {
    return <></>;
  }

  const { title, description } = data.book;

  return (
    <div>
      <h1
        className={cn(
          "text-5xl tracking-tight font-semibold",
          `[view-transition-name:book-${params.id}]`
        )}
      >
        {searchParams.title || title}
      </h1>

      <h3 className="text-xl font-semibold">About this book</h3>
      <p className="text-gray-600">{description || ""}</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <p className="text-sm text-gray-500">
          No reviews yet. Be the{" "}
          <span className="text-gray-700 font-medium">first</span> to write a{" "}
          <span className="text-gray-700 font-medium">review</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
