import { Subject } from "@/shared/types";
import GenreBookCard from "./GenreBookCard";

const GenreBookList = ({ subjectData }: { subjectData: Subject[] }) => {
  return (
    <div className="mt-5 divide-y divide-slate-950/[.07] dark:divide-white/10">
      <div className="max-w-full">
        {subjectData ? (
          subjectData.map(({ works }: Subject) => (
            <GenreBookCard key={works.key} works={works} />
          ))
        ) : (
          <div className="p-5 text-center">No books found.</div>
        )}
      </div>
    </div>
  );
};

export default GenreBookList;
