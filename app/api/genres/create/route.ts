import { genres } from "@/lib/books";
import dbConnect from "@/lib/db";
import { Review } from "@/shared/models";
import Genre from "@/shared/models/Genre";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const TOP_GENRES_LIMIT = 6;

export async function GET(req: NextRequest) {

  const user = await req.nextUrl.searchParams.get("user");

  let data = [];
  const genresList = genres.map((genre) => genre.name);

  try {
    await dbConnect();

    const reviews = await Review.find({ reviewer: user })
      .select("genres")
      .lean();

    for (const genre of genresList) {
      const genreData = await Genre.findOne({ genre: genre });
      genreData ? data.push(genreData) : await Genre.create({ genre });
    }

    const totalRatings = data.reduce(
      (acc, genre) => acc + genre.total_times_rated,
      0
    );

    const totalUserGenres = reviews.flatMap((review) =>
      review.genres.map((genre: string) => genre)
    );

    function calculateUserTotalGenreRating() {
      //... Map() can also be used here
      const map = {} as { [key: string]: number };

      for (const genre of totalUserGenres) {
        map[genre] ? (map[genre] = map[genre] + 1) : (map[genre] = 0 + 1);
      }

      const totalReviews = Object.entries(map).map(([key, val]) => {
        return { genreId: key, user_times_rated: val };
      });

      const userRatings = totalReviews.reduce(
        (acc, rating) => acc + rating.user_times_rated,
        0
      );

      return totalReviews.map((review) => {
        const genre = JSON.parse(JSON.stringify(data)).find(
          (genre) => genre._id === review.genreId
        );

        return review
          ? {
              ...genre,
              ...review,
              user_average: parseFloat(
                ((review.user_times_rated / userRatings) * 100).toFixed(1)
              ),
              total_average: parseFloat(
                ((genre.total_times_rated / totalRatings) * 100).toFixed(1)
              ),
            }
          : review;
      });
    }
    return NextResponse.json({
      reviews: calculateUserTotalGenreRating()
        .sort((a, b) => b.total_times_rated - a.total_times_rated)
        .slice(0, TOP_GENRES_LIMIT),
    });
  } catch (error) {
    return NextResponse.json(
      error instanceof Error ? console.log(error.message) : String(error)
    );
  }
}
