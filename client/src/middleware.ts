import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/common/constants/routes';

export const protectedRoutes = [ROUTES.PROFILE];

const publicOnlyRoutes = [ROUTES.SIGN_IN, ROUTES.SIGN_UP, ROUTES.VERIFY_2FA];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // (If user is NOT logged in, redirect them away from protected routes)
  const isAccessingProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path),
  );
  if (isAccessingProtectedRoute) {
    if (!token) {
      const loginUrl = new URL(ROUTES.SIGN_IN, request.url);

      // Add a 'redirect' query param so we can send them back after login
      loginUrl.searchParams.set('redirect', pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  // (If user IS logged in, redirect them away from public-only routes)
  const isAccessingPublicOnlyRoute = publicOnlyRoutes.some((path) =>
    pathname.startsWith(path),
  );

  if (isAccessingPublicOnlyRoute) {
    if (token) {
      // User is logged in, redirect them to their main page
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes, already handled by Next.js proxy)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
