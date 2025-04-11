import { NextResponse, type NextRequest } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes (no token needed)
  const publicUrls = ["/", "/auth/sign-in", "/auth/sign-up"];
  if (publicUrls.includes(pathname)) {
    return NextResponse.next();
  }

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Verify token
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    (await cookies()).set("user_id", String(payload?.id!));
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error); // Debug
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/genres/:path*", "/books/:path", "/me/:path*"],
};
