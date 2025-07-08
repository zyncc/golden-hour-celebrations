import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Rewrite admin subdomain root (/) to /dashboard
  if (host.startsWith("admin.") && url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.rewrite(url);
  }

  // Block access to /dashboard from main domain
  if (!host.startsWith("admin.") && url.pathname.startsWith("/dashboard")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
