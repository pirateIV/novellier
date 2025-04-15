import dbConnect from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const token = (await cookies()).get('token')?.value;

  try {
    await dbConnect();

    const reviews = await Review.find

  } catch (error) {}
}
