import type { Metadata } from "next";
import NewReviewForm from "./new-review-form";

export const metadata: Metadata = {
  title: "Write a Review",
  description: "Share your thoughts about this book with the community",
};

export default async function NewReviewPage({
  params,
}: {
  params: { book: string };
}) {  return (
    <div className="container max-w-4xl mx-auto py-8">
      <NewReviewForm bookId={params.book} />
    </div>
  );
}

