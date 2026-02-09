import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")
  const { pathname } = req.nextUrl

  // Define public paths that don't require authentication
  if (
    pathname.startsWith("/auth") ||
    pathname.includes(".") || // static files
    pathname.startsWith("/api")
  ) {
    return NextResponse.next()
  }

  // Redirect to login if no token
  if (!token) {
    // If accessing root, maybe redirect to login or dashboard depending on preference, but here login
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
