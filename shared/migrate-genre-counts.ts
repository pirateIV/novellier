import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import { Book, Review } from "./models";
import Genre from "./models/Genre";
import { defaultGenres } from "@/lib/api/openLibrary";
// import dbConnect from "@/lib/db";
// import Book from "@/shared/models/Book";
// import Review from "@/shared/models/Review";
// import { defaultGenres } from "@/lib/api/openLibrary";
// import Genre from "./models/Genre";

async function updateGenreReviewCounts() {
  try {
    // Connect to the database
    await dbConnect();
    console.log("Connected to database");

    // Fetch all reviews
    const reviews = await Review.find({}).populate("book");

    console.log(`Found ${reviews.length} reviews`);

    // Process each review
    for (const review of reviews) {
      // Skip if genres are already populated (to avoid double-counting)
      if (review.genres && review.genres.length > 0) {
        console.log(`Review ${review._id} already has genres, skipping`);
        continue;
      }

      // Get the book associated with the review
      let book = review.book;
      let bookGenres: string[] = [];

      if (!book) {
        // If book is not populated, find it by bookId
        book = await Book.findOne({ bookId: review.bookId });
      }

      if (book && book.genres && book.genres.length > 0) {
        // If book has genres stored, use them
        bookGenres = await Genre
          .find({ _id: { $in: book.genres } })
          .then((genres) => genres.map((g) => g.genre));
      } else {
        // Fetch genres from Open Library API
        try {
          const bookResponse = await fetch(
            `https://openlibrary.org/works/${review.bookId}.json`
          );
          const bookData = await bookResponse.json();
          bookGenres =
            bookData.subjects
              ?.filter((subject: string) => defaultGenres.includes(subject))
              .slice(0, 3) || []; // Limit to 1–3 genres
        } catch (apiError) {
          console.error(
            `Failed to fetch genres for book ${review.bookId}:`,
            apiError
          );
          continue;
        }
      }

      if (bookGenres.length === 0) {
        console.log(`No genres found for book ${review.bookId}, skipping`);
        continue;
      }

      // Ensure genres exist in Genre collection
      const genreDocs = await Promise.all(
        bookGenres.map(async (genreName: string) => {
          let genreDoc = await Genre.findOne({ genre: genreName });
          if (!genreDoc) {
            genreDoc = await Genre.create({
              genre: genreName,
              total_times_rated: 0,
            });
          }
          return genreDoc;
        })
      );

      // Update total_times_rated for each genre
      await Promise.all(
        genreDocs.map(async (genreDoc) => {
          await Genre.findByIdAndUpdate(
            genreDoc._id,
            { $inc: { total_times_rated: 1 } },
            { new: true }
          );
          console.log(`Incremented total_times_rated for genre ${genreDoc.genre}`);
        })
      );

      // Update the review with genre IDs
      await Review.findByIdAndUpdate(
        review._id,
        { genres: genreDocs.map((g) => g._id) },
        { new: true }
      );
      console.log(`Updated genres for review ${review._id}`);

      // Optionally, update the book with genres if not already set
      if (book && (!book.genres || book.genres.length === 0)) {
        await Book.findByIdAndUpdate(
          book._id,
          { genres: genreDocs.map((g) => g._id) },
          { new: true }
        );
        console.log(`Updated genres for book ${book.bookId}`);
      }
    }

    console.log("Genre review counts updated successfully");
  } catch (error) {
    console.error("Error updating genre review counts:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the script
updateGenreReviewCounts();