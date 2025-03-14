import jwt from "jsonwebtoken";
import User from "@/shared/models/User";

export const getUserByToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  return await User.findById(decoded.id);
};
