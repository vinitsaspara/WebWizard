import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicPaths = ["/", "/login", "/api/auth/login"];

  // Check if the current path is public
  if (
    publicPaths.some((path) => pathname === path || pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // API routes need token verification
  if (pathname.startsWith("/api/")) {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      // Add user info to request headers for API routes
      const response = NextResponse.next();
      response.headers.set("X-User", JSON.stringify(decoded));
      return response;
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  }

  // For page routes, check if user is logged in via cookie or localStorage
  // This will be handled on the client side by checking Redux state
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
