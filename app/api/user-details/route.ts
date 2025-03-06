import { NextRequest, NextResponse } from "next/server";
import User from "@/shared/models/User";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "authentication failed" });
  }

  try {
    const user = await getUserByToken(token);
    if (!user) {
      return NextResponse.json({ error: "authentication failed" });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "authentication failed" },
      { status: 401 }
    );
  }
}

const getUserByToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  return await User.findById(decoded.id);
};

const sendJsonResponse = async ({
  data,
  statusCode,
}: {
  data: any;
  statusCode?: number;
}) => {
  return NextResponse.json({ data }, { status: statusCode });
};
