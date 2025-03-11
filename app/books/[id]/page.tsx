import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import {
  Calendar,
  BookOpen,
  ExternalLink,
  Star,
  MessageSquare,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

type BookResponse = {
  title: String;
  description: String;
  first_publish_date: String;
  authors: {
    author: {
      key: String;
    };
  }[];
};

const GET_BOOK_DATA = gql`
  query Book($id: ID!) {
    book(id: $id) {
      title
      description
      first_publish_date
      authors {
        author {
          key
        }
      }
    }
  }
`;

const GET_AUTHOR_DATA = gql`
  query Author($id: ID!) {
    author(id: $id) {
      name
      bio
      photos
      birth_date
      death_date
      links {
        title
        url
      }
    }
  }
`;

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { title: string };
}) => {
  const {
    data: { book },
  } = await client.query<{ book: BookResponse }>({
    query: GET_BOOK_DATA,
    variables: { id: params.id },
  });

  const { title, description, first_publish_date, authors } = book;

  const authorId = authors[0].author.key.replace("/authors/", "");

  console.log(authorId)

  const {
    data: { author },
  } = await client.query({
    query: GET_AUTHOR_DATA,
    variables: { id: authorId },
  });

  const bookData = {
    title: title || searchParams.title,
    first_publish_date,
    description,
    cover_image: "/api/placeholder/300/450", // Using placeholder image
    genre: "Adventure",
    average_rating: 4.7,
    links: [
      { url: "https://example.com/interview", title: "Author Interview" },
      { url: "https://example.com/excerpt", title: "Read Sample Chapter" },
    ],
  };

  const { links, cover_image, genre, average_rating } = bookData;

  const displayTitle = searchParams.title || title;

  // Generate star rating display
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="fill-yellow-400 text-yellow-400 w-5 h-5 half-filled"
          />
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300 w-5 h-5" />);
      }
    }

    return (
      <div className="flex items-center gap-1">
        {/* {stars} */}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-zinc-600 hover:underline inline-flex items-center gap-1 mb-4"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Books
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md aspect-[2/3] relative">
              {cover_image ? (
                <Image
                  src={cover_image}
                  alt={`Cover of ${displayTitle}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <BookOpen className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-zinc-600 hover:bg-zinc-700 text-white py-2 px-4 rounded-md flex items-center gap-2 flex-1">
                <MessageSquare className="w-4 h-4" />
                Write Review
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md flex items-center justify-center">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl md:text-5xl tracking-tight font-semibold mb-2">
              {displayTitle}
            </h1>

            <div className="text-gray-600 mb-3">
              by <span className="text-indigo-600 font-medium">{author.name}</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1 font-medium">
                <Calendar className="w-4 h-4" />
                <span className="text-gray-700">{first_publish_date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge>{genre}</Badge>
              </div>
              {renderRating(average_rating)}
            </div>

            <div className="bg-white rounded-lg  mb-6">
              <h3 className="text-xl font-semibold mb-3">About this book</h3>
              <p className="text-gray-600 leading-relaxed">
                {description || "No description available for this book."}
              </p>
            </div>

            {links && links.length > 0 && (
              <div className="bg-zinc-50 border border-gray-300 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-zinc-800 mb-2">
                  External Resources
                </h4>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-zinc-600 hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Community Reviews</h2>
          <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            0 reviews
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 mb-4">
            No reviews yet. Share your thoughts on this book!
          </p>
          <button className="bg-zinc-600 hover:bg-zinc-700 text-white py-2 px-6 rounded-md font-medium">
            Write the First Review
          </button>
        </div>

        {/* Sample Review - Hidden by default, can be shown when reviews exist */}
        <div className="mt-8 border border-gray-200 rounded-lg p-6 hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                <Image
                  src="/api/placeholder/40/40"
                  alt="User avatar"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h4 className="font-medium">Alex Johnson</h4>
                <div className="flex items-center text-yellow-400">
                  <Star className="fill-yellow-400 w-4 h-4" />
                  <Star className="fill-yellow-400 w-4 h-4" />
                  <Star className="fill-yellow-400 w-4 h-4" />
                  <Star className="fill-yellow-400 w-4 h-4" />
                  <Star className="fill-yellow-400 w-4 h-4" />
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">March 1, 2025</span>
          </div>
          <p className="text-gray-700">
            This book completely changed my perspective! The characters are
            well-developed and the plot keeps you guessing until the very end. I
            couldn't put it down and finished it in one sitting.
          </p>
        </div>

        {/* Review Form Preview */}
        <div className="bg-white border border-gray-200 rounded-lg mt-8 p-6 hidden">
          <h3 className="text-xl font-semibold mb-4">Write Your Review</h3>
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
              <Star className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
              <Star className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
              <Star className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
              <Star className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
            </div>
          </div>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 min-h-32"
            placeholder="Share your thoughts about this book..."
          ></textarea>
          <div className="mt-4 flex justify-end gap-3">
            <button className="border border-gray-300 bg-white hover:bg-gray-50 py-2 px-4 rounded-md">
              Cancel
            </button>
            <button className="bg-zinc-600 hover:bg-zinc-700 text-white py-2 px-4 rounded-md">
              Post Review
            </button>
          </div>
        </div>
      </div>

      {/* Related Books Section */}
      {/* <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Link href={`/book/${i}`} key={i} className="group">
              <div className="aspect-[2/3] bg-gray-100 rounded-md overflow-hidden relative mb-2">
                <Image
                  src={`/api/placeholder/150/${200 + i * 10}`}
                  alt={`Related book ${i}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-sm group-hover:text-zinc-600 transition-colors">
                {
                  [
                    "Distant Horizons",
                    "Midnight Whispers",
                    "Golden Echoes",
                    "Starlight Path",
                  ][i - 1]
                }
              </h3>
              <p className="text-xs text-gray-500">
                {
                  [
                    "Sarah Parker",
                    "Michael Torres",
                    "Emily Williams",
                    "David Chen",
                  ][i - 1]
                }
              </p>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Page;
