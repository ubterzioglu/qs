import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Read at request time so toggling MAINTENANCE_MODE in the host takes effect
// on restart/redeploy without code changes.
function maintenanceOn() {
  return /^(1|true|on)$/i.test(process.env.MAINTENANCE_MODE ?? "");
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin authenticates itself via the signed session cookie (checked in each
  // page/action). It is never locale-routed and stays reachable during
  // maintenance so the site is manageable during a takeover.
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // /maintenance lives outside the [locale] tree — never hand it to intl routing.
  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  if (maintenanceOn()) {
    const allowed =
      pathname.startsWith("/_next") ||
      pathname.startsWith("/media") ||
      pathname.includes(".");
    if (!allowed) {
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      // Rewrite (not redirect): URL stays put, 200 served — cleaner for a takeover.
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Public paths: everything except API, Next internals, and files with extensions.
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Admin: match ALL /admin paths (even dotted segments).
    "/admin/:path*",
  ],
};
