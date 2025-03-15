import { apiClient } from "@/lib/axios";

export async function signIn(credentials: { email: string; password: string }) {
  try {
    const response = await apiClient.post("/auth/signin", credentials);
    const token = response.data.token;
    if (!token) {
      throw new Error("No token received");
    }
    return response.data.token;
  } catch (error: any) {
    if (error.response.data.error) {
      throw error.response.data.error;
    }

    throw "Authentication failed. Please try again.";
  }
}
