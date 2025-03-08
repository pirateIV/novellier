import { fetchOpenLibraryData } from "../api/openLibrary";

export const resolvers = {
  Query: {
    genre: async () => {
      const data = await fetchOpenLibraryData();
      return data;
    },
  },
};
