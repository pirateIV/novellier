import dbConnect from "@/lib/db";
import User from "@/shared/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({}).select("-password -books");
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}
