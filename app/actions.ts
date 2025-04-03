"use server";

import { baseURL } from "@/shared/config";

export const getBookAndAuthor = async (id: string) => {
  const response = await fetch(baseURL + `/bookv2/${id}`);
  const data = await response.json();
  return data;
};
