import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/shared/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    console.log({ email, password });

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log(cookie);

    return NextResponse.json("Signed in...", {
      headers: { "Set-cookie": cookie },
    });
  } catch (error: any) {
    return NextResponse.json(error);
  }
}


// axios.get("http:localhost:3000/api/signin")