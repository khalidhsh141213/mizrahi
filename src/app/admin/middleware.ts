import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /admin, /admin/users)
  const path = request.nextUrl.pathname

  // Check if path starts with /admin
  if (path.startsWith('/admin')) {
    // For demo purposes, we'll use a simple admin check
    // In production, you'd verify against a database, session, or JWT token
    const isAdmin = request.cookies.get('admin_token')?.value || 
                    request.headers.get('authorization') === 'Bearer admin-token'

    if (!isAdmin) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Continue to the requested route if authenticated or not admin route
  return NextResponse.next()
}

// Configure the middleware to run only on admin routes
export const config = {
  matcher: '/admin/:path*'
}