import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

export const buildAuthHeaderToken = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { apiClient };
