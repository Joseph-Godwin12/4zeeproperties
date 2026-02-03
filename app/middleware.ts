import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")
  if (!token && req.nextUrl.pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", req.url))
  }
}
