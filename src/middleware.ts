import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Read at request time so toggling MAINTENANCE_MODE in the host (Vercel) takes
// effect on redeploy without code changes.
function maintenanceOn() {
  return /^(1|true|on)$/i.test(process.env.MAINTENANCE_MODE ?? "");
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (maintenanceOn()) {
    // Let the maintenance page, admin, and static/next internals through.
    const allowed =
      pathname === "/maintenance" ||
      pathname.startsWith("/admin") ||
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
  // Match everything except API, Next internals, and files with extensions.
  // (/admin handled inside so maintenance can still allow it.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
