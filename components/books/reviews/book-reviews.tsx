import Link from "next/link";
import { cookies } from "next/headers";
import { apiClient, buildAuthHeaderToken } from "@/lib/axios";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import BookReviewsHeader from "./book-reviews-header";
import BookReviewList from "./book-review-list";
import BookReviewsPlaceholder from "./book-reviews-placeholder";

const BookReviews = async ({ id }: { id: string }) => {
  try {
    const token = (await cookies()).get("token")?.value;

    const response = await apiClient.get(
      `/reviews/search/${id}`,
      buildAuthHeaderToken(token)
    );
    const data = response.data;
    
    if (!data) {
      return <BookReviewsPlaceholder />;
    }

    const { totalReviews } = data;


    return (
      <div className="pt-8 mt-12 border-t">
        <BookReviewsHeader reviews={totalReviews} />
        <BookReviewList {...data} />
        <div className="flex items-center justify-center">
          <Button className="rounded-full px-3" asChild>
            <Link href={`/reviews/${id}`}>
              <span>
                <Icons.UserGroup />
              </span>
              See all Community Reviews ({totalReviews})
            </Link>
          </Button>
        </div>
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
