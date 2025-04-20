import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_: NextRequest) {
  try {
    (await cookies()).delete("token");

    return NextResponse.json({
      success: true,
      message: "logged out successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
