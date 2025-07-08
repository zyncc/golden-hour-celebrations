import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // ✅ Rewrite / to /dashboard on admin subdomain
  if (host.startsWith("admin.")) {
    if (url.pathname === "/") {
      url.pathname = "/dashboard";
      return NextResponse.rewrite(url);
    }
  }

  // ❌ Block /dashboard on the main domain with 404
  if (!host.startsWith("admin.") && url.pathname.startsWith("/dashboard")) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
