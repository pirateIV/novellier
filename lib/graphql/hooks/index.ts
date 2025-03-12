import { useQuery } from "@apollo/client";
import { GET_BOOK_DATA } from "../queries";

export const useBook = (id: string) => {
  return useQuery(GET_BOOK_DATA, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
};
