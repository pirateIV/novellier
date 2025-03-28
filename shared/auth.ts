import { redirect } from "next/navigation";
import { baseURL } from "./config";
import { apiClient, buildAuthHeaderToken } from "@/lib/axios";

export const getUserData = async (token: string | undefined) => {
  try {
    // const response = await fetch(`${baseURL}/auth/me`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    const response = await apiClient.get(
      "/auth/me",
      buildAuthHeaderToken(token!)
    );
    return await response.data;
  } catch (error) {
    console.log("some error here", error);
    redirect("/auth/sign-in");
  }
};
