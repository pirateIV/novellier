import { type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/shared/models/User";

export const getUserFromToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  return await User.findById(decoded.id).select("-password");
};

export const getTokenFromCookies = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  return token;
};
