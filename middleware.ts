import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static files and _next internal assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/components") ||
    pathname.startsWith("/lib") ||
    pathname.startsWith("/mock") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") // optional: skip api calls if you want
  ) {
    return NextResponse.next();
  }
  // Read the single token cookie
  const token = request.cookies.get("token")?.value;
  const isLoggedIn = !!token;

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
