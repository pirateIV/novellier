import { NextRequest, NextResponse } from "next/server";
import { getUserByToken } from "@/app/shared/utils";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  console.log("token from client", { token });

  if (!token) {
    console.log("token not found!");
    return NextResponse.json({ error: "authentication failed" });
  }

  try {
    const user = await getUserByToken(token);
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "authentication failed", user });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "authentication failed" },
      { status: 401 }
    );
  }
}
