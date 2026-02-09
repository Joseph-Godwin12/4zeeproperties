import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define public routes (paths that don't require authentication)
  // We allow /auth and all its subpaths (login, signup, etc.)
  // We allow /properties and all its subpaths
  // We allow the root /
  // Static assets and _next are handled by the config matcher usually, but good to explicit check if needed.
  if (
    pathname === '/' ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/properties') ||
    pathname.startsWith('/api') // Assuming API routes might have their own handling or are public, if specific protection is needed we can refine.
  ) {
    return NextResponse.next();
  }

  // 2. Check for token and role cookies
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('auth-role')?.value;

  // 3. If missing token or role, redirect to login
  // We only care about protecting /admin, /client, /realtor and other non-public routes
  // Since we already filtered public routes, everything falling through needs auth.
  if (!token || !role) {
    // Redirect to the general login page
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 4. Role-based access control
  
  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (role !== 'ADMIN') {
      // Redirect to unauthorized page or their respective dashboard
      return NextResponse.redirect(new URL('/auth/login', request.url)); // Or /unauthorized
    }
  }

  // Protect /client routes
  if (pathname.startsWith('/client')) {
    if (role !== 'CLIENT') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Protect /realtor routes
  if (pathname.startsWith('/realtor')) {
    if (role !== 'REALTOR') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure matcher to exclude static files and Next.js internals
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder contents (images, etc) - though middleware doesn't serve files, typical pattern
     */
    '/((?!_next/static|_next/image|favicon.ico|images|public).*)',
  ],
};
