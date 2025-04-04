import { NextResponse } from "next/server";
import User from "@/shared/models/User";
import dbConnect from "@/lib/db";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const id = await (await params)?.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json\(\{error: error instanceof Error \? error\.message : String\(error\)\}, \{status: 500\}\);
  }
}
