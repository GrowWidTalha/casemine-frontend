import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Read the single token cookie
  const token = request.cookies.get("token")?.value;
  const isLoggedIn = !!token;

  const { pathname } = request.nextUrl;

  // Publicly accessible paths
  const publicPaths = ["/", "/login", "/signup"];

  const isPublic = publicPaths.includes(pathname);

  // Protect all routes except public ones
  if (!isPublic && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname); // Save original path
    loginUrl.searchParams.set("message", "true"); // Optional: show a message
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/:path*"],
};
