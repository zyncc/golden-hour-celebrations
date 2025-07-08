import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Serve /dashboard when visiting admin subdomain root
  if (host.startsWith("admin.")) {
    if (url.pathname === "/") {
      url.pathname = "/dashboard";
      return NextResponse.rewrite(url);
    }
  }

  // 🚫 Block /dashboard access from the main domain
  if (!host.startsWith("admin.") && url.pathname.startsWith("/dashboard")) {
    // Option 1: Redirect to homepage
    url.pathname = "/";
    return NextResponse.redirect(url);

    // Option 2: Return 404
    // return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.next();
}

// Apply to all routes
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
