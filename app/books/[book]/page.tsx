import { getBookAndAuthor } from "@/app/actions";
import BookOverview from ".";
import { markdownToHtml } from "@/lib/mdx";

interface PageProps {
  params: Promise<{
    book: string;
  }>;
}

const BookDetailsPage = async ({ params }: PageProps) => {
  const { book: id } = await params;
  const data = await getBookAndAuthor(id);
  const bookData = data?.book || null;
  const descriptionHTML = await markdownToHtml(bookData.description);

  return (
    <BookOverview id={id} bookData={bookData} description={descriptionHTML} />
  );
};

export default BookDetailsPage;
