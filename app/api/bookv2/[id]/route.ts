import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { baseURL } from "@/shared/config";
import { defaultGenres } from "@/lib/api/openLibrary";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    dbConnect();

    const [bookResponse, bookStatsResponse] = await Promise.all([
      await fetch(`https://openlibrary.org/works/${id}.json`),
      await fetch(baseURL + `/books/rating/${id}`),
    ]);

    const book = await bookResponse.json();
    const stats = await bookStatsResponse.json();

    const filteredGenres = book.subjects.filter((subject: string) =>
      defaultGenres.includes(subject)
    );

    const authorId = book.authors[0].author.key.replace("/authors/", "");

    const authorResponse = await fetch(
      `https://openlibrary.org/authors/${authorId}.json`
    );
    const author = await authorResponse.json();

    console.log(book)

    const jsonResponse = {
      //   ...book,
      author: {
        authorId,
        name: author.name,
      },
      title: book.title,
     authorsCount: book.authors.length,
      links: book.links || [],
      stats,
      description: book.description?.value || book.description,
      subjects: filteredGenres,
      characters: book?.subject_people?.slice(0, 5) || [],
      first_publish_date: book.first_publish_date
        ? book.first_publish_date.toString()
        : "",
    };

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
