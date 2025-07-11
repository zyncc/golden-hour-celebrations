import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // If on admin subdomain
  if (host.startsWith("admin.")) {
    if (pathname === "/") {
      url.pathname = "/dashboard";
      return NextResponse.rewrite(url);
    }

    if (!pathname.startsWith("/dashboard")) {
      url.pathname = "/not-found";
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // If on non-admin domain, block /dashboard
  if (pathname.startsWith("/dashboard")) {
    url.pathname = "/not-found";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
