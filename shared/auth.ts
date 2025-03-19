import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { baseURL } from "./config";

export const getUserData = async () => {
  const token = (await cookies()).get("token")?.value;

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
