import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// allow admin route only for admin subdomain
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (!host.startsWith("admin.")) {
    const url = request.nextUrl.clone();
    url.pathname = "/not-found";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
