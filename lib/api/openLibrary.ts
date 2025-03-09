import { sub } from "date-fns";

const subjects = ["history", "fantasy", "science", "romance"];

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

export async function getBookById(id: string) {
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    const data = await response.json();

    return {
      ...data,
      description: data.description.value || data.description,
      first_publish_date: data.first_publish_date
        ? data.first_publish_date.toString()
        : "",
    };
  } catch (error) {
    console.error("Error fetching Open Library data:", error);
    throw new Error("Failed to fetch Open Library data");
  }
}
