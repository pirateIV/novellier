import { genres } from "../books";

const subjects = ["history", "fantasy", "fiction", "romance"];

// Reuse your existing fetch logic in a reusable function
export async function fetchOpenLibraryData() {
  try {
    const response = await Promise.all(
      subjects.map(async (subject) => {
        const response = await fetch(
          `https://openlibrary.org/subjects/${subject}.json`
        );
        return await response.json();
      })
    );
    return response;
  } catch (error) {
    console.error("Error fetching Open Library data:", error);
    throw new Error("Failed to fetch Open Library data");
  }
}

const defaultGenres = genres.map((genre) => genre.name);

export async function getBook(id: string) {
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    const data = await response.json();

    const filteredGenres = data.subjects.filter((subject: string) =>
      defaultGenres.includes(subject)
    );

    return {
      ...data,
      description: data.description.value || data.description,
      subjects: filteredGenres,
      first_publish_date: data.first_publish_date
        ? data.first_publish_date.toString()
        : "",
    };
  } catch (error) {
    console.error("Error fetching Open Library data:", error);
    throw new Error("Failed to fetch Open Library data");
  }
}

export async function getAuthor(id: string) {
  try {
    const response = await fetch(`https://openlibrary.org/authors/${id}.json`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching Open Library data:", error);
    throw new Error("Failed to fetch Open Library data");
  }
}

export async function getBookCoverId(query: string) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}`
    );
    const data = await response.json();
    return data.docs[0].cover_i;
  } catch (error) {
    return null;
  }
}
