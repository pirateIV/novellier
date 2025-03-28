import { apiClient, buildAuthHeaderToken } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import BookReviewForm from "./book-review-form";
import BookReviewItem from "./book-review-item";
import BookReviewsHeader from "./book-reviews-header";
import BookReviewsPlaceholder from "./book-reviews-placeholder";
import { PenLine } from "lucide-react";
import { Children } from "react";
import BookReviewList from "./book-review-list";
import { cookies } from "next/headers";
import { getBook } from "@/lib/api/openLibrary";

//  const BookReviews = async () => {
//   const params = useParams();
//   // const [reviews, setReviews] = useState<any[]>([]);
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [error, setError] = useState<string | null>(null);

//   const fetchReviews = async () => {
//     try {
//       const response = await apiClient.get(`/reviews/search/${params.id}`);
//       // setReviews(response.data?.reviews || []);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//       // setError("Failed to load reviews. Please try again later.");
//     } finally {
//       // setIsLoading(false);
//     }
//   };

//   const review = await fetchReviews();
//   // useEffect(() => {
//   // }, [params.id]);

//   const reviewCount = reviews?.length || 0;

//   console.log(reviews);

//   if (error) {
//     return (
//       <div className="pt-8 mt-12 border-t">
//         <BookReviewsHeader reviews={0} />
//         <div className="py-4 text-center text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-8 mt-12 border-t">
//       <BookReviewsHeader reviews={reviewCount} />

//       {isLoading ? (
//         <div className="flex justify-center py-12 text-center">
//           <Loader className="animate-spin" />
//         </div>
//       ) : reviews?.length > 0 ? (
//         <div>
//           <div className="divide-y divide-slate-950/[.07] dark:divide-white/10">
//             {reviews.map((review) => (
//               <BookReviewItem key={review?.id} review={review} />
//             ))}
//           </div>
//           <BookReviewForm>
//             <Button
//               size="icon"
//               className="ml-auto w-fit absolute font-medium right-5 bottom-5 px-3 mt-3 text-xs"
//             >
//               <PenLine />
//               Review
//             </Button>
//           </BookReviewForm>
//         </div>
//       ) : (
//         <BookReviewsPlaceholder />
//       )}
//     </div>
//   );
// };

const BookReviews = async ({ id }: { id: string }) => {
  try {
    // const token = (await cookies()).get("token")?.value;

    // const response = await apiClient.get(
    //   `/reviews/search/${id}`,
    //   buildAuthHeaderToken(token)
    // );
    // const data = response.data;

    // const { reviews } = data;
    // const reviewsCount = reviews.length || 0;

    return (
      <div className="pt-8 mt-12 border-t">
        {/* <BookReviewsHeader reviews={reviewsCount} /> */}
        {/* <BookReviewList {...data} /> */}
      </div>
    );
  } catch (error) {
    return (
      <div className="pt-8 mt-12 border-t">
        <BookReviewsHeader reviews={0} />
        <div className="py-4 text-center text-red-500">
          Could not get reviews. Please reload.
        </div>{" "}
      </div>
    );
  }
};

export default BookReviews;
