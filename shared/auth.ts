import { redirect } from "next/navigation";
import { baseURL } from "./config";

export const getUserData = async (token: string | undefined) => {
  try {
    const response = await fetch(`${baseURL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.log("some error here", error);
    redirect("/auth/sign-in");
  }
};
