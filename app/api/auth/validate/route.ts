import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/shared/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, username } = await req.json();
  const [emailExists, usernameExists] = await Promise.all([
    User.findOne({ email }),
    User.findOne({ username }),
  ]);

  if (emailExists || usernameExists) {
    return NextResponse.json(
      { error: "Email or username already exists" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
