import dbConnect from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "token not found" }, { status: 400 });
  }
  console.log(token);
  try {
    // await dbConnect();

    return NextResponse.json(token);
  } catch (error) {
    return NextResponse.json({error: error instanceof Error ? error.message : String(error)}, {status: 500});
  }
}
