import { fetchOpenLibraryData, getBookById } from "../api/openLibrary";

export const resolvers = {
  Query: {
    book: async (_: any, { id }: { id: string }) => {
      return await getBookById(id);
    },
    genre: async () => {
      return await fetchOpenLibraryData();
    },
  },
};
