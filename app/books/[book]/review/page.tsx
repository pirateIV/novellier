import type { Metadata } from "next";
import NewReviewForm from "./new-review-form";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Write a Review",
  description: "Share your thoughts about this book with the community",
};

export default async function NewReviewPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const book = (await params).book;
  const user = (await cookies()).get("user_id")?.value;
  console.log(user)
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <NewReviewForm bookId={book} />
    </div>
  );
}
