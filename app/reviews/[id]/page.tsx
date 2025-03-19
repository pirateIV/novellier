import React from "react";
import { Star, StarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { apiClient } from "@/lib/axios";
import client from "@/lib/apollo-client";
import { GET_BOOK_DATA } from "@/lib/graphql/queries";

const ReviewsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const response = await apiClient.get(`/reviews/${id}`);
    const { review } = response.data;

    const bookResult = await client.query({
      query: GET_BOOK_DATA,
      variables: { id: review.bookId },
    });
    const book = bookResult.data.book;

    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">{book.title}</h2>
          {/* <p className="text-gray-600 mb-4">{book.description}</p> */}

    
          <div className="mb-4">
            <div className="flex items-center mb-2">
              {[...Array(review.rating)].map((_, index) => (
                <Star
                  key={index}
                  className="size-3 text-amber-500 fill-amber-500"
                />
              ))}
              {[...Array(5 - review.rating)].map((_, index) => (
                <StarIcon key={index} className="size-3 text-gray-500" />
              ))}
            </div>
          </div>

          <p className="font-sans mb-2">{review.content}</p>

          <div className="text-gray-400 text-sm text-right">
            by{" "}
            <span className="text-indigo-600 dark:text-sky-400 font-medium">
              {review.reviewer.fullName} 
            </span>
          </div>

          <div className="mt-3 text-gray-400 text-sm">
            <span>
              {new Date(review.createdAt).toLocaleTimeString("en-US", {
                timeStyle: "short",
              })}
            </span>
            <span className="mx-2">&middot;</span>
            <span>{format(new Date(review.createdAt), "MMMM dd, yyyy")}</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching review or book data:", error);
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <p className="text-red-500">Error loading review.</p>
      </div>
    );
  }
};

export default ReviewsPage;
