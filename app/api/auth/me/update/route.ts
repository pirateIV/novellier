import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import jwt from "jsonwebtoken";
import { User } from "@/shared/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
//   const token = getTokenFromCookies(req);
//   const updated = await req.body;
//   const cookies = req.headers.get("cookie")?.split(';')
  
//   for(const cookie of cookie)
const token = (await cookies()).get('token')?.value

//   console.log({updated});
//   console.log(req)

  if (!token) {
    console.log("token not found!");
    return NextResponse.json({ error: "authentication failed" });
  }

  try {
    await dbConnect();

    // const userData = await getUserFromToken(token);
    // if (!userData) {
    //   return NextResponse.json({ error: "failed to get user", userData });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    //   id: string;
    // };
    const user = await User.findByIdAndUpdate(token, updated, {
      new: true,
    });
    revalidatePath("/me");

    return NextResponse.json(user);
    // const;
  } catch (error) {
    return NextResponse.json(error);
  }
}
