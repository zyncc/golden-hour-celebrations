import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  if (host.startsWith("admin.") && url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.rewrite(url);
  }

  if (!host.startsWith("admin.") && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/not-found";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
