import { AddBookForm } from "@/components/books/forms/add-book-form";
import { genres } from "@/lib/books";

export const metadata = {
  title: "Add a New Book | BookReviews",
  description: "Add a new book to our collection and write the first review",
};

const NewBookPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <AddBookForm genres={genres.map((genre) => genre.name)} />
    </div>
  );
};

export default NewBookPage;
