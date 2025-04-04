import { getBookReviews } from "@/app/actions";
import BookReviewsList from ".";

const Page = async ({ params }: { params: Promise<{ book: string }> }) => {
  const { book } = await params;
  const bookReviews = await getBookReviews(book);

  return (
    <div className="min-h-[calc(100vh-55px)] w-full">
      <div className="container mx-auto">
        <BookReviewsList bookReviews={bookReviews} />
      </div>
    </div>
  );
};

export default Page;
