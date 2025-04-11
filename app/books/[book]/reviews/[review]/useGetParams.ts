import { useSearchParams } from "next/navigation";

export default function useGetParams() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const author = searchParams.get("author");
  const bookCover = searchParams.get("book_cover");
  const authorId = searchParams.get("author_id");

  return { title, author, authorId, bookCover };
}
