import { apiClient } from "../axios";
import { genres } from "../books";
import { Subject, Work } from "../../shared/types";

interface Description {
  key: string;
  description: {
    value?: string;
  };
}

const subjects = ["history", "fantasy", "fiction", "romance"];

// Reuse your existing fetch logic in a reusable function
export async function fetchOpenLibraryData() {
  try {
    const response = await Promise.all(
      subjects.map(async (subject) => {
        const response = await fetch(
          `https://openlibrary.org/subjects/${subject}.json?limit=20`
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

export const defaultGenres = genres.map((genre) => genre.name);

export async function getBook(id: string) {
  try {
    const [bookResponse, bookStatsResponse] = await Promise.all([
      await fetch(`https://openlibrary.org/works/${id}.json`),
      await apiClient.get(`/books/rating/${id}`),
    ]);
    // const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    // const bookStatsRes = await apiClient.get(`/books/rating/${id}`);
    const data = await bookResponse.json();
    const bookStats = bookStatsResponse.data;

    const filteredGenres = data.subjects.filter((subject: string) =>
      defaultGenres.includes(subject)
    );

    return {
      ...data,
      stats: bookStats,
      description: data.description?.value || data.description,
      subjects: filteredGenres,
      characters: data?.subject_people?.slice(0, 5) || [],
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

export async function getSubjects(subject: string): Promise<{
  work_count: number;
  works: Work[];
}> {
  try {
    // Fetch subject data
    const subjectResponse = await fetch(
      `https://openlibrary.org/subjects/${subject}.json`
    );

    if (!subjectResponse.ok) {
      throw new Error(`HTTP error! status: ${subjectResponse.status}`);
    }

    const subjectData = await subjectResponse.json();

    // Early return if no works
    if (!Array.isArray(subjectData?.works)) {
      console.warn(`No works found for subject: ${subject}`);
      return { work_count: 0, works: [] };
    }

    // Process works in parallel with optimized requests
    const works = await Promise.all(
      subjectData.works.map(async (work: Work) => {
        try {
          // Only fetch description if it's not already available in the work data
          let description = "";
          if (!work.description) {
            const workResponse = await fetch(`https://openlibrary.org${work.key}.json`);
            const workData = await workResponse.json();
            description = typeof workData.description === 'string' 
              ? workData.description 
              : workData.description?.value || "";
          } else {
            description = typeof work.description === 'string'
              ? work.description
              : work.description.value || "";
          }

          return {
            ...work,
            first_publish_year: work.first_publish_year?.toString() || "",
            description,
          };
        } catch (error) {
          console.error(`Error processing work ${work.key}:`, error);
          return {
            ...work,
            first_publish_year: work.first_publish_year?.toString() || "",
            description: "",
          };
        }
      })
    );

    return {
      work_count: subjectData.work_count || works.length,
      works: works.filter(Boolean), // Remove any null/undefined entries
    };
  } catch (error) {
    console.error("Error fetching Open Library data:", error);
    return { work_count: 0, works: [] }; // Return consistent fallback structure
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

//

// import { Subject } from "@/shared/types";
// import { genres } from "../books";

// interface Description {
//   key: string;
//   description: {
//     value?: string;
//   };
// }

// const subjects = ["history", "fantasy", "fiction", "romance"];

// // Reuse your existing fetch logic in a reusable function
// export async function fetchOpenLibraryData() {
//   try {
//     const response = await Promise.all(
//       subjects.map(async (subject) => {
//         const response = await fetch(
//           `https://openlibrary.org/subjects/${subject}.json?limit=20&offset=20`
//         );
//         return await response.json();
//       })
//     );
//     return response;
//   } catch (error) {
//     console.error("Error fetching Open Library data:", error);
//     throw new Error("Failed to fetch Open Library data");
//   }
// }

// const defaultGenres = genres.map((genre) => genre.name);

// export async function getBook(id: string) {
//   try {
//     const response = await fetch(`https://openlibrary.org/works/${id}.json`);
//     const data = await response.json();

//     const filteredGenres = data.subjects.filter((subject: string) =>
//       defaultGenres.includes(subject)
//     );

//     return {
//       ...data,
//       description: data.description.value || data.description,
//       subjects: filteredGenres,
//       first_publish_date: data.first_publish_date
//         ? data.first_publish_date.toString()
//         : "",
//     };
//   } catch (error) {
//     console.error("Error fetching Open Library data:", error);
//     throw new Error("Failed to fetch Open Library data");
//   }
// }

// export async function getAuthor(id: string) {
//   try {
//     const response = await fetch(`https://openlibrary.org/authors/${id}.json`);
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error fetching Open Library data:", error);
//     throw new Error("Failed to fetch Open Library data");
//   }
// }

// export async function getSubjects(subject: string) {
//   try {
//     const response = await fetch(
//       `https://openlibrary.org/subjects/${subject}.json?limit=20&offset=0`
//     );

//     const data = (await response.json()) as Subject;
//     const keys = data.works.map((work) => work.key);

//     const descriptions = await Promise.all(
//       keys.map(async (key: string) => {
//         const response = await fetch(`https://openlibrary.org/${key}.json`);
//         const data = (await response.json()) as Description;
//         return {
//           key,
//           description: data.description?.value
//             ? data.description?.value
//             : data.description || "",
//         };
//       })
//     );

//     return data.works.map((work) => {
//       const description = descriptions.find((desc) => desc.key === work.key);
//       return {
//         works_count: data.work_count,
//         works: {
//           ...work,
//           first_publish_year: work.first_publish_year.toString(),
//           description: description?.description,
//         },
//       };
//     });
//   } catch (error) {
//     console.error("Error fetching Open Library data:", error);
//     throw new Error("Failed to fetch Open Library data");
//   }
// }

// export async function getBookCoverId(query: string) {
//   try {
//     const response = await fetch(
//       `https://openlibrary.org/search.json?q=${query}`
//     );
//     const data = await response.json();
//     return data.docs[0].cover_i;
//   } catch (error) {
//     return null;
//   }
// }
