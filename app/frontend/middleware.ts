import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// --- Decode JWT payload manually (client-safe, no signature check)
function decodeJwtPayload(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(b64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;
  const COOKIE_NAME = 'auth_token';
  const token = req.cookies.get(COOKIE_NAME)?.value;

  // --- Public routes (accessible without authentication)
  const PUBLIC_PATHS = ['/', '/auth/login', '/auth/register', '/favicon.ico'];
  const isPublic = PUBLIC_PATHS.includes(pathname);

  // --- Decode token to extract user role
  const payload = token ? decodeJwtPayload(token) : null;
  const role = payload?.role?.toLowerCase?.();

  // --- Case 1: No token and trying to access a protected route
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // --- Case 2: Authenticated user on public page → ALLOWED (no redirect)
  // We allow users to stay on '/' even if logged in
  if (token && isPublic) {
    return NextResponse.next();
  }

  // --- Case 3: Restrict dashboard access based on role
  if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith('/dashboard/beneficiary') && role !== 'beneficiary') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // --- Default: allow request
  return NextResponse.next();
}
// --- Apply middleware to selected routes
export const config = {
  matcher: ['/dashboard/:path*', '/', '/auth/login', '/auth/register'],
};