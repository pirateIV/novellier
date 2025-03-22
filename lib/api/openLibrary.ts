import { Subject } from "@/shared/types";
import { genres } from "../books";

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
          `https://openlibrary.org/subjects/${subject}.json?limit=20&offset=20`
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

    console.log("get book here...", { data });

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

export async function getSubjects(subject: string) {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${subject}.json?limit=20&offset=0`
    );

    const data = (await response.json()) as Subject;
    const keys = data.works.map((work) => work.key);

    const descriptions = await Promise.all(
      keys.map(async (key: string) => {
        const response = await fetch(`https://openlibrary.org/${key}.json`);
        const data = (await response.json()) as Description;
        return {
          key,
          description: data.description?.value
            ? data.description?.value
            : data.description || "",
        };
      })
    );

    return data.works.map((work) => {
      const description = descriptions.find((desc) => desc.key === work.key);
      return {
        works_count: data.work_count,
        works: {
          ...work,
          first_publish_year: work.first_publish_year.toString(),
          description: description?.description,
        },
      };
    });
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
