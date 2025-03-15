import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";

export async function GET(req: NextRequest) {
  const token = getTokenFromCookies(req);
  if (!token) {
    console.log("token not found!");
    return NextResponse.json({ error: "authentication failed" });
  }

  try {
    const user = await getUserFromToken(token);
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
