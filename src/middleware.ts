import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { jwtVerify } from 'jose';
import { dlog, derror } from '@/lib/debug';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/home',
    '/about',
    '/contact-us',
    '/faq',
    '/privacy',
    '/terms',
    '/nato-alphabet',
    '/login',
    '/signup',
    '/forget-password',
    '/reset-password',
    '/activate',
    '/verification',
  ];

  // API routes that should not be protected by this middleware
  const apiPaths = ['/api/auth'];

  // Check if the path is an API route
  if (path.startsWith('/api/')) {
    // Allow NextAuth API routes
    if (apiPaths.some(apiPath => path.startsWith(apiPath))) {
      return NextResponse.next();
    }
    // Other API routes are protected by their own logic
    return NextResponse.next();
  }

  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // For protected routes, check authentication
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Also check for Django JWT in cookies
  const accessTokenCookie = request.cookies.get('access_token');
  const refreshTokenCookie = request.cookies.get('refresh_token');

  const isAuthenticated = !!(token || accessTokenCookie || refreshTokenCookie);

  dlog(`[Middleware] Path: ${path}, Auth: ${isAuthenticated}, NextAuthToken: ${!!token}, Cookies: ${!!(accessTokenCookie || refreshTokenCookie)}`);

  if (!isAuthenticated) {
  dlog(`[Middleware] Redirecting to login: ${path}`);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin routes - only allow superusers
  if (path.startsWith('/admin')) {
    let isSuperuser = false;
    let superuserSource = "unknown";
    
    // Check NextAuth token first (OAuth users)
  if (token && (token as any)?.isSuperuser) {
      isSuperuser = true;
      superuserSource = "NextAuth";
  dlog(`[Middleware] ✓ Superuser detected from NextAuth session`);
    }
    // Check Django JWT cookie (email/password users)
    else if (accessTokenCookie?.value) {
      try {
        const secret = new TextEncoder().encode(process.env.DJANGO_SECRET_KEY || 'django-insecure-change-this-in-production-asap-12345');
        const { payload } = await jwtVerify(accessTokenCookie.value, secret, {
          algorithms: ['HS256'],
        });
        isSuperuser = !!(payload as any).is_superuser;
        superuserSource = "Django JWT Cookie";
        
          if (isSuperuser) {
          dlog(`[Middleware] ✓ Superuser detected from Django JWT: ${isSuperuser}`);
        } else {
          dlog(`[Middleware] ✗ JWT decoded but is_superuser=false, payload:`, { 
            is_superuser: (payload as any).is_superuser,
            user_id: (payload as any).user_id,
            email: (payload as any).email 
          });
        }
      } catch (error) {
  derror(`[Middleware] ✗ Failed to verify Django JWT:`, {
          error: error instanceof Error ? error.message : "Unknown error",
          tokenPreview: accessTokenCookie.value.substring(0, 50) + "...",
          secretKeyExists: !!process.env.DJANGO_SECRET_KEY
        });
        // Token invalid, treat as not superuser
        isSuperuser = false;
        superuserSource = "JWT Verification Failed";
      }
    } else {
  dlog(`[Middleware] ✗ No token found - NextAuth: ${!!token}, Cookie: ${!!accessTokenCookie?.value}`);
    }
    
  dlog(`[Middleware] Admin access check: ${path}, Superuser: ${isSuperuser} (from: ${superuserSource})`);
    
    if (!isSuperuser) {
  dlog(`[Middleware] ✗ Blocking non-superuser from admin: ${path}`);
      // Redirect to home with error
      const homeUrl = new URL('/home', request.url);
      homeUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(homeUrl);
    } else {
  dlog(`[Middleware] ✓ Allowing superuser to access admin: ${path}`);
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|apng)$).*)',
  ],
};
