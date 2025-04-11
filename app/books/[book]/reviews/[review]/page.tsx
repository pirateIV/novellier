import { apiClient } from "@/lib/axios";
import { notFound } from "next/navigation";
import { Review } from "../_components/book-review-card";
import ReviewDetail from "./review-detail";
// import ReviewDetail from "./review-detail"
// import { getReviewById } from "@/lib/api/reviews"
// import { getBookById } from "@/lib/api/books"
// import { getCurrentUser } from "@/lib/session"

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string; review: string }
// }): Promise<Metadata> {
//   const review = await getReviewById(params.review)

//   if (!review) {
//     return {
//       title: "Review Not Found",
//     }
//   }

//   return {
//     title: `Review by ${review.reviewer?.fullName || "Anonymous"} | BookShelf`,
//     description: `${review.text?.substring(0, 150)}...`,
//   }
// }

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
    <div className="container max-w-4xl mx-auto py-8">
      <ReviewDetail {...props} />
    </div>
  );
}
