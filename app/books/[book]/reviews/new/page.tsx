import type { Metadata } from "next";
import NewReviewForm from "./new-review-form";

export const metadata: Metadata = {
  title: "Write a Review",
  description: "Share your thoughts about this book with the community",
};

export default async function NewReviewPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you would fetch the book data here
  const bookData = await getBookById(params.id);

  if (!bookData) {
    return <div>Book not found</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <NewReviewForm bookId={params.id} bookData={bookData} />
    </div>
  );
}

// Mock function - replace with your actual data fetching
async function getBookById(id: string) {
  return {
    id,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "/placeholder.svg?height=400&width=300",
  };
}
