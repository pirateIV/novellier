import axios from "axios";
import { baseURL } from "@/shared/config";

const apiClient = axios.create({ baseURL, withCredentials: true });

export const buildAuthHeaderToken = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { apiClient };
