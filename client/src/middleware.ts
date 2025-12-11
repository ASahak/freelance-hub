import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/common/constants/routes';

export const protectedRoutes = [ROUTES.PROFILE];

const clearCookies = () => {
  const response = NextResponse.next();
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  return response;
};

const nonAuthOnlyRoutes = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.VERIFY_2FA,
  ROUTES.FORGOT_PASS,
  ROUTES.CHANGE_PASS,
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  const isSessionExpired = searchParams.get('reason') === 'session_expired';

  if (isSessionExpired) {
    return clearCookies();
  }

  // (If user is NOT logged in, redirect them away from protected routes)
  const isAccessingProtectedRoutes = protectedRoutes.some((path) =>
    pathname.startsWith(path),
  );
  if (isAccessingProtectedRoutes) {
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL(ROUTES.SIGN_IN, request.url);

      // Add a 'redirect' query param so we can send them back after login
      loginUrl.searchParams.set('redirect', pathname);

      return NextResponse.redirect(loginUrl);
    }

    if (!accessToken && refreshToken) {
      return NextResponse.next();
    }
  }

  // (If user IS logged in, redirect them away from non auth-only routes)
  const isAccessingNonAuthOnlyRoute = nonAuthOnlyRoutes.some((path) =>
    pathname.startsWith(path),
  );

  if (isAccessingNonAuthOnlyRoute) {
    if (accessToken || refreshToken) {
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
