import type { NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/api/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes without authentication
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // For admin routes, we'll let the page component handle the role check
  // This is because middleware can't access the full session data with roles
  // The requireRole/requireAdmin utilities will handle this at the page level

  return NextResponse.next()
}

export const config = {
  matcher: ['/users/:path*'], // Apply middleware to all paths under users except the users page itself
}
