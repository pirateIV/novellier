import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import BadgeGroup from "@/shared/components/badge-group";
import { AuthorResponse, BookResponse } from "@/lib/graphql/types";

const BookDetails = ({
  book,
  author,
}: {
  book:
    | BookResponse
    | {
        title: string;
        description: string | undefined;
      };
  author:
    | AuthorResponse
    | {
        name: string;
        authorId: string;
      };
}) => {
  // const { book, author } = useBookContext();

  //@ts-ignore
  const { authors, subjects, first_publish_date, stats, title } = book;
  // const genre = subjects.slice(0,3).map((sub: any) => sub).join(", ");

  return (
    <>
      <h1 className="mb-2 text-3xl font-medium tracking-tight md:text-5xl sm:text-4xl">
        {title}
      </h1>

      <div className="flex items-center gap-2 mb-3 text-gray-600">
        <div className="avatar-fallback size-9 relative rounded-full border-2 border-zinc-200 dark:border-zinc-500">
          <Image
            src={`https://covers.openlibrary.org/a/olid/${author.authorId}-S.jpg`}
            width="36"
            height="36"
            className="size-full object-cover rounded-full"
            alt={`image of ${author.name}`}
          />
        </div>{" "}
        <span className="font-medium text-indigo-600 dark:text-sky-400">
          {author.name}{" "}
          {authors.length > 1 && (
            <span className="font-Medium text-xs text-gray-200">
              (+{authors.length - 1})
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-6 font-medium">
        {first_publish_date && (
          <div className="flex items-center gap-2.5">
            <span className="text-zinc-900 dark:text-zinc-300">
              {first_publish_date}
            </span>
            <span>·</span>
          </div>
        )}
        <BadgeGroup list={subjects} />
        <span>·</span>
        <div className="flex items-center gap-1">
          <span className="text-base text-amber-500 dark:text-amber-600">
            <Star className="size-3 fill-amber-500 dark:fill-amber-600" />
          </span>

          <span className="font-semibold text-zinc-900 dark:text-zinc-300">
            {stats.averageRating}{" "}
            {stats.totalReviews && (
              <span className="text-gray-600 dark:text-zinc-400 font-medium">
                (
                <span className="text-gray-800 font-semibold dark:text-zinc-300">
                  {stats.totalReviews || 0}
                </span>{" "}
                <Link href="#reviews" className="underline text-blue-500">
                  reviews
                </Link>
                )
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
