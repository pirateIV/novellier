import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const token = getTokenFromCookies(req);
    const user = await getUserFromToken(token!);

    return NextResponse.json({ user, data });
  } catch (error) {
    return NextResponse.json({error: error instanceof Error ? error.message : String(error)}, {status: 500});
  }
}
