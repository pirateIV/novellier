import { Subject, Work } from "@/shared/types";
import GenreBookCard from "./GenreBookCard";
import { Button } from "../ui/button";

const GenreBookList = ({
  books,
  refetch,
}: {
  books: Subject;
  refetch: () => void;
}) => {
  return (
    <div className="mt-5 divide-y divide-slate-950/[.07] dark:divide-white/10">
      <div className="max-w-full">
        {books.works ? (
          books.works.map((book) => (
            <GenreBookCard key={book.key} book={book} />
          ))
        ) : (
          <div className="p-5 text-center">
            <p>No books found.</p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreBookList;
