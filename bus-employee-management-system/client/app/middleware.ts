import { NextRequest, NextResponse } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/authentication/login', '/authentication/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for JWT cookie
  const jwt = request.cookies.get('jwt')?.value;

  if (!jwt) {
    const loginUrl = new URL('/authentication/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Optionally verify JWT with NestJS backend (uncomment if needed)
  /*
  try {
    const response = await fetch('http://localhost:3001/auth/verify', {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!response.ok) {
      const loginUrl = new URL('/authentication/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    const loginUrl = new URL('/authentication/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};