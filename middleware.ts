import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Allow login route
    if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
      return NextResponse.next();
    }

    // Check for admin session cookie
    const sessionCookie = request.cookies.get("fcd_admin_session");
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Internationalized application routing
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except /api, /_next, /_vercel and static asset files
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
