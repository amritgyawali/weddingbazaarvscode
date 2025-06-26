import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Get user role from cookies or headers (in a real app, this would be from JWT or session)
  const userRole = request.cookies.get('userRole')?.value || 
                   request.headers.get('x-user-role') ||
                   'customer' // default role

  // Dashboard route protection and redirection
  if (pathname.startsWith('/dashboard')) {
    // If accessing /dashboard root, redirect to role-specific dashboard
    if (pathname === '/dashboard') {
      const roleBasedPath = `/dashboard/${userRole}`
      return NextResponse.redirect(new URL(roleBasedPath, request.url))
    }

    // Extract the role from the current path
    const pathSegments = pathname.split('/')
    const currentRole = pathSegments[2] // /dashboard/[role]/...

    // If the current role in path doesn't match user's actual role, redirect
    if (currentRole && currentRole !== userRole) {
      const correctPath = pathname.replace(`/dashboard/${currentRole}`, `/dashboard/${userRole}`)
      return NextResponse.redirect(new URL(correctPath, request.url))
    }

    // Ensure user is accessing their correct role-based dashboard
    const validRoles = ['customer', 'vendor', 'admin']
    if (currentRole && !validRoles.includes(currentRole)) {
      const roleBasedPath = `/dashboard/${userRole}`
      return NextResponse.redirect(new URL(roleBasedPath, request.url))
    }
  }

  // Auth route handling
  if (pathname.startsWith('/auth')) {
    // If user is already authenticated, redirect to their dashboard
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
    if (isAuthenticated) {
      const roleBasedPath = `/dashboard/${userRole}`
      return NextResponse.redirect(new URL(roleBasedPath, request.url))
    }
  }

  // Protected routes - require authentication
  const protectedRoutes = ['/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
