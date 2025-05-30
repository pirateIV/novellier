import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import BadgeGroup from "@/shared/components/badge-group";
import { BookResponse } from "@/lib/graphql/types";

const BookDetails = ({ id, ...props }: { id: string } & BookResponse) => {
  const { author, authorsCount, subjects, first_publish_date, stats, title } =
    props;

  return (
    <>
      <h1 className="mb-2 text-2xl font-libre font-semibold tracking-tight md:text-5xl sm:text-4xl">
        {title}
      </h1>

      <div className="flex items-center gap-2 mb-3 text-gray-600">
        <div className="avatar-fallback size-9 relative rounded-full border-2 border-zinc-200 dark:border-zinc-500">
          <Image
            src={`https://covers.openlibrary.org/a/olid/${author?.authorId}-S.jpg`}
            width="36"
            height="36"
            className="size-full object-cover rounded-full"
            alt={`image of ${author}`}
          />
        </div>{" "}
        <span className="font-medium text-lg text-indigo-600 dark:text-sky-400">
          {author?.name}{" "}
          {authorsCount > 1 && (
            <span className="text-xs text-gray-200">
              (+{authorsCount - 1})
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
            {stats?.averageRating}{" "}
            {stats?.totalReviews != 0 && (
              <span className="text-gray-600 dark:text-zinc-400 font-medium">
                (
                <span className="text-gray-800 font-semibold dark:text-zinc-300">
                  {stats?.totalReviews || 0}
                </span>{" "}
                <span
                >
                  reviews
                </span>
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
