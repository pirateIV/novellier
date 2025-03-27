import React from "react";
import { BookmarkCheck, CheckCircle, Star } from "lucide-react";
import StarRating from "@/shared/components/StarRating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReviewActionButtons from "../_components/review-action-buttons";
import client from "@/lib/apollo-client";
import { GET_BOOK_DATA, GET_BOOK_REVIEWS_DATA } from "@/lib/graphql/queries";
import { cn } from "@/lib/utils";

type RatingsProps = {
  rating: number;
  width: number;
};

type ReviewPageProps = {
  params: Promise<{ book: string }>;
};

const bookRatings = [
  { rating: 5, width: 83 },
  { rating: 4, width: 57 },
  { rating: 3, width: 25 },
  { rating: 2, width: 8 },
  { rating: 1, width: 40 },
];

const RatingLine = ({ width, rating }: { width: number; rating: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="text-xs font-medium text-gray-400 md:text-sm">
        {rating}
      </div>
      <div className="relative h-[9px] w-full *:h-full *:rounded-full">
        <div className="w-full absolute inset-0 bg-zinc-700"></div>
        <div
          className="relative z-10 bg-amber-500 border-t border-t-amber-300"
          style={{ width: width + "%" }}
        ></div>
      </div>
    </div>
  );
};

const RatingLines = ({ ratings, ...props }: { ratings: RatingsProps[] }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full" {...props}>
      {ratings.map((rating) => (
        <RatingLine key={rating.rating} {...rating} />
      ))}
    </div>
  );
};

const Review = () => {
  return (
    <div className="flex gap-4 py-2.5 md:gap-6">
      <div className="from-red-500 to-indigo-500 via-yellow-500 size-8 shrink-0 bg-gradient-to-br rounded-full md:size-10"></div>
      <div>
        <StarRating rating={5} />
        <div className="mt-2">
          <p className="text-sm font-sans line-clamp-3 dark:text-gray-300 md:text-[15px]">
            I loved this book. Man the classics are so good. Dickens has a
            unique style, one that paints grand, dark scenes that hint at the
            undercurrents of time and humanity. The 1800’s writing as well as
            the way all our disparate characters lining up at the end had me
            reflecting on if Dostoevsky had wrote this book, my favorite 1800’s
            author. Two very interesting men. My thoughts, at a glance, are that
            Dostoevsky tends to tell very personal focused narratives, on the
            struggles inside of men. At least this book portrays a much larger
            struggle and evolution of time. I do have some analysis, though. The
            thing with the classics is everyone always insists things are
            ‘symbolizing’ things or whatever. I mean I’m sure it’s true but it
            just adds this whole layer. That is to say, I love the narrative and
            the story, but at the end of the day it’s another class tale of a
            bunch of lower class and down on luck people sacrificing themselves
            for our ex nobleman and his sexy blond wife. Felt like a very 1800’s
            sort of class consciousness narrative. Where he’s making all these
            observations of the cities, but doesn’t notice the interplay between
            our warm and personable English people. Or, you know what Chuck,
            maybe you did and you’re trying to say something. Who effin knows
            10/10.
          </p>
        </div>
      </div>
    </div>
  );
};

interface ReviewResponse {
  title: string;
  description: string;
  characters: string[];
  first_publish_date: string | number;
  subjects: string[];
  stats: {
    averageRating: string;
    totalReviews: number;
  };
}

const ReviewsPage = async ({ params }: ReviewPageProps) => {
  const { book } = await params;
  let reviewData: ReviewResponse | null = null;
  let errorRes: null | unknown = null;

  try {
    const { data, error } = await client.query<{ book: ReviewResponse }>({
      query: GET_BOOK_REVIEWS_DATA,
      variables: { id: book },
    });

    reviewData = data.book;
  } catch (error) {
    console.log(error);
    errorRes = error;
  }

  console.table(reviewData);

  const {
    title,
    description,
    subjects,
    stats: { averageRating, totalReviews },
    first_publish_date,
    characters,
  } = reviewData!;

  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto max-w-[90%] md:max-w-3xl lg:max-w-4xl xl:max-w-6xl pt-4 md:px-4 md:pt-5 mt-4">
        <header>
          <h1 className="text-xl font-semibold tracking-tight lg:text-3xl md:text-2xl">
            {title}
          </h1>
          <p className="text-xs dark:text-gray-400 md:text-sm">
            A book by{" "}
            <span className="font-medium dark:text-white">Charles Dickens</span>
          </p>
        </header>

        <div className="grid gap-5 pt-6 mt-2 md:pt-8 xl:grid-cols-12">
          <div className="col-span-full xl:col-span-8">
            <h2 className="mb-3 text-lg font-medium md:mb-4 md:text-xl">
              Reviews
            </h2>
            <div className="flex items-center gap-2">
              <span className="*:fill-amber-500 text-amber-500 *:size-3 md:*:size-4">
                <Star />
              </span>
              <span className="text-xs font-medium dark:text-gray-300 md:text-sm">
                {averageRating}/5
              </span>
            </div>

            <div className="mt-3 md:mt-4">
              <h3 className="mb-2 text-base text-gray-200 md:text-lg">
                Audience rating summary
              </h3>

              <div
                className={cn(
                  "relative flex gap-3 mb-4 md:gap-4",
                  !totalReviews ? "*:not-last:brightness-[25%]" : ""
                )}
              >
                <RatingLines
                  ratings={bookRatings}
                  aria-label={`Rated ${averageRating} of 5`}
                />
                <div className="flex flex-col justify-between items-center">
                  <h1
                    className="text-4xl font-semibold lg:text-6xl md:text-5xl"
                    aria-label={`The average rating is ${averageRating} of 5`}
                  >
                    {averageRating}
                  </h1>
                  <StarRating rating={averageRating} />
                  <p className="text-xs dark:text-gray-400 md:text-sm">
                    <span className="font-medium text-gray-200">
                      {totalReviews || 0}
                    </span>{" "}
                    ratings
                  </p>
                </div>

                {/* Fallback info */}
                <div className="absolute inset-0 size-full flex items-center justify-center z-10 text-sm">
                  <p className="text-zinc-200 italic">No Review available...</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="mb-2 text-base text-gray-200 md:text-lg">
                Audience Reviews
              </h3>
              <div>
                <button className="px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm text-gray-300 rounded-full border border-gray-500 hover:text-white hover:bg-gray-500">
                  All
                </button>
              </div>

              <div className="pb-8 md:pb-10">
                <Review />
                <div className="relative flex justify-center mt-3 before:bg-secondary before:-z-10 before:w-full before:h-px before:absolute before:inset-y-1/2 md:mt-4">
                  <Button
                    variant="secondary"
                    className={cn(
                      totalReviews
                        ? "hover:brightness-110"
                        : "brightness-75 cursor-not-allowed hover:brightness-50",
                      "px-8 py-2 text-sm rounded-full group hover:bg-secondary md:text-[15px] md:px-10"
                    )}
                  >
                    {totalReviews
                      ? `More Audience Reviews (${totalReviews - 1})`
                      : "No Reviews available"}
                    {totalReviews && (
                      <span className="dark:text-gray-400 group-hover:text-gray-200 group-hover:translate-x-1.5 transition">
                        →
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full xl:col-span-4">
            <div className="px-0 pb-8 md:px-4 md:pb-10 xl:pb-0 xl:border-l">
              <h4 className="text-base font-medium md:text-lg">About</h4>

              <div className="mt-3 line-clamp-5 md:mt-4">
                <p className="font-worksans text-xs dark:text-gray-400 md:text-sm">
                  {description}
                </p>
              </div>

              <div className="py-3 mt-2 md:py-4">
                <ul className="space-y-2 text-xs md:space-y-3 md:text-sm">
                  <li className="font-semibold *:font-normal *:text-gray-400">
                    First Published Date: <span>{first_publish_date}</span>
                  </li>
                  <li className="font-semibold *:font-normal *:text-blue-500">
                    Author: <Link href="#">Charles Dickens</Link>
                  </li>
                  <li className="font-semibold *:font-normal">
                    Genre:{" "}
                    {subjects.map((genre, index, arr) => (
                      <React.Fragment key={index}>
                        <Link
                          href={`/genres/${genre.toLowerCase()}`}
                          className="text-blue-500 hover:underline"
                        >
                          {genre}
                        </Link>
                        {index < arr.length - 1 && (
                          <span className="dark:text-gray-300">, </span>
                        )}
                      </React.Fragment>
                    ))}
                  </li>
                  <li className="font-semibold *:font-normal">
                    Characters:{" "}
                    {characters.map((char, index, arr) => (
                      <React.Fragment key={index}>
                        <Link
                          href="#"
                          className="text-blue-500 hover:underline"
                        >
                          {char}
                        </Link>
                        {index < arr.length - 1 && (
                          <span className="dark:text-gray-300">, </span>
                        )}
                      </React.Fragment>
                    ))}
                  </li>
                </ul>
              </div>

              <div className="hidden py-3 mt-2 border-t md:py-4 xl:block">
                <ReviewActionButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
