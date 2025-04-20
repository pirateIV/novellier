import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getTokenFromCookies, getUserFromToken } from "@/app/shared/utils";
import jwt from "jsonwebtoken";
import { User } from "@/shared/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
  try {
    const updated = await req.json();
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication failed - no token provided" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Verify the token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded?.id) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Verify the user exists
    const existingUser = await User.findById(decoded.id);
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update the user
    const user = await User.findByIdAndUpdate(
      decoded.id, 
      updated, 
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 400 }
      );
    }

    // Revalidate cache for the user's profile page
    revalidatePath("/me");

    return NextResponse.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error("Error in PUT /api/user:", error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}