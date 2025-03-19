export const DEV_API_URL = "http://localhost:3000/api";
export const PROD_API_URL = "https://novellier.vercel.app/api";

export const baseURL =
  process.env.NODE_ENV === "development" ? DEV_API_URL : PROD_API_URL;
