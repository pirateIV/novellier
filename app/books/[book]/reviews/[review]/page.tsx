import { apiClient } from "@/lib/axios";
import { notFound } from "next/navigation";
import { Review } from "../_components/book-review-card";
import ReviewDetail from "./review-detail";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string; review: string }>;
}) {
  const { id, review: reviewID } = await params;

  const {
    data: { review: reviewData },
  } = (await apiClient.get("/reviews/" + reviewID)) as {
    data: { review: Review };
  };
  const review = reviewData;

  if (!review) {
    notFound();
  }

  const props = { bookID: id, reviewID, review };

  // Check if the current user is the author of the review

  return (
    <div className="container max-w-4xl min-h-[calc(100vh-45px)] mx-auto py-8">
      <ReviewDetail {...props} />
    </div>
  );
}
