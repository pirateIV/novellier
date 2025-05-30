import {
  fetchOpenLibraryData,
  getAuthor,
  getBook,
  getSubjects,
} from "../api/openLibrary";

export const resolvers = {
  Query: {
    author: async (_: any, { id }: { id: string }) => {
      const data = await getAuthor(id);
      return { ...data, bio: data.bio?.value ? data.bio.value : data.bio };
    },
    book: async (_: any, { id }: { id: string }) => {
      return await getBook(id);
    },
    genre: async () => {
      return await fetchOpenLibraryData();
    },
    subject: async (_: any, { subject }: { subject: string }) => {
      return await getSubjects(subject);
    },
  },
};
