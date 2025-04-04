"use server";

import { baseURL } from "@/shared/config";
import Review from "@/shared/models/Review";

export const getBookAndAuthor = async (id: string) => {
  const response = await fetch(baseURL + `/bookv2/${id}`);
  const data = await response.json();

  const reviews = await Review.find({ bookId: id }).limit(3);
  console.log({ reviews });
  return data;
};
