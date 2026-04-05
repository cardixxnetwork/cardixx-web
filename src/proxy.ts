import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(req: NextRequest) {
  // Skip i18n for embed and admin routes
  if (
    req.nextUrl.pathname.startsWith("/embed/") ||
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|embed|admin|.*\\..*).*)"],
};
