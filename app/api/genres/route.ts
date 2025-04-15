import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Genre from "@/shared/models/Genre";

// GET /api/genres/:name
export async function GET(req: NextRequest) {
  const genreName = req.nextUrl.searchParams.get("name");

  if (genreName) {
    // return NextResponse.json({ error: "Genre name is required" }, { status: 400 });

    await dbConnect();

    try {
      const genre = await Genre.findOne({ genre: genreName });
      if (!genre) {
        return NextResponse.json({ error: "Genre not found" }, { status: 404 });
      }

      return NextResponse.json({
        genre: genre.genre,
        totalReviews: genre.total_times_rated,
      });
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  } else {
    await dbConnect();

    try {
      const genres = await Genre.find().sort({ total_times_rated: "desc" });
      const genreCount = await Genre.countDocuments();
      return NextResponse.json({ genres, genreCount });
    } catch (error) {
      return NextResponse.json(error);
    }
  }
}
