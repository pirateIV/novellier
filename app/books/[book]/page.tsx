import { getBookAndAuthor } from "@/app/actions";
import BookOverview from ".";
import { markdownToHtml } from "@/lib/mdx";

interface PageProps {
  params: Promise<{
    book: string;
  }>;
  searchParams: Promise<{
    book_cover_id: string;
  }>;
}

const BookDetailsPage = async ({ params, searchParams }: PageProps) => {
  const { book: id } = await params;
  const search = await searchParams;
  const data = await getBookAndAuthor(id);
  const bookData = data?.book || null;
  const descriptionHTML = await markdownToHtml(bookData.description);

  return (
    <BookOverview
      id={id}
      search={search}
      bookData={bookData}
      description={descriptionHTML}
    />
  );
};

export default BookDetailsPage;
