import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/shared/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { password, confirmPassword, ...userCredentials } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json({ error: "Passwords does not match" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      ...userCredentials,
      password: hashedPassword,
    });

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
