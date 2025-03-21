import { Subject } from "@/shared/types";
import { genres } from "../books";

// Type Definitions
interface Description {
  key: string;
  description: string | { value: string } | undefined;
}

interface BookData {
  subjects: string[];
  description: string | { value: string };
  first_publish_date?: string;
  [key: string]: any;
}

// Constants
const SUBJECTS = ["history", "fantasy", "fiction", "romance"] as const;
const DEFAULT_GENRES = genres.map((genre) => genre.name);
const DEFAULT_LIMIT = 20;

// Utility Functions
const handleFetchError = (error: unknown, message: string) => {
  console.error(message, error);
  throw new Error(message);
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Main API Functions
export async function fetchOpenLibraryData() {
  try {
    return await Promise.all(
      SUBJECTS.map((subject) =>
        fetchJson<Subject>(
          `https://openlibrary.org/subjects/${subject}.json?limit=${DEFAULT_LIMIT}&offset=20`
        )
      )
    );
  } catch (error) {
    handleFetchError(error, "Failed to fetch Open Library data");
  }
}

export async function getBook(id: string) {
  try {
    const data = await fetchJson<BookData>(`https://openlibrary.org/works/${id}.json`);
    
    const filteredGenres = data.subjects.filter((subject) =>
      DEFAULT_GENRES.includes(subject)
    );

    return {
      ...data,
      description: typeof data.description === "object" 
        ? data.description.value 
        : data.description || "",
      subjects: filteredGenres,
      first_publish_date: data.first_publish_date?.toString() || "",
    };
  } catch (error) {
    handleFetchError(error, "Failed to fetch book data");
  }
}

export async function getAuthor(id: string) {
  try {
    return await fetchJson(`https://openlibrary.org/authors/${id}.json`);
  } catch (error) {
    handleFetchError(error, "Failed to fetch author data");
  }
}

export async function getSubjects(subject: string, options = { limit: DEFAULT_LIMIT, offset: 0 }) {
  try {
    const { limit, offset } = options;
    const url = `https://openlibrary.org/subjects/${subject}.json?limit=${limit}&offset=${offset}`;
    const data = await fetchJson<Subject>(url);
    
    const descriptions = await Promise.all(
      data.works.map((work) =>
        fetchJson<Description>(`https://openlibrary.org/${work.key}.json`)
          .then((desc) => ({
            key: work.key,
            description: desc.description && typeof desc.description === "object"
              ? desc.description.value
              : desc.description || "",
          }))
      )
    );

    return data.works.map((work) => {
      const description = descriptions.find((desc) => desc.key === work.key);
      return {
        works_count: data.work_count,
        works: {
          ...work,
          first_publish_year: work.first_publish_year?.toString() || "",
          description: description?.description || "",
        },
      };
    });
  } catch (error) {
    handleFetchError(error, "Failed to fetch subjects data");
  }
}

export async function getBookCoverId(query: string) {
  try {
    const data = await fetchJson<{ docs: { cover_i: number }[] }>(
      `https://openlibrary.org/search.json?q=${query}`
    );
    return data.docs[0]?.cover_i ?? null;
  } catch (error) {
    console.error("Error fetching book cover:", error);
    return null;
  }
}