// import { betterFetch } from "@better-fetch/fetch";
// import { NextResponse, type NextRequest } from "next/server";
// import { auth } from "./auth";

// type Session = typeof auth.$Infer.Session;

// export default async function authMiddleware(request: NextRequest) {
//   const { data: session } = await betterFetch<Session>(
//     "/api/auth/get-session",
//     {
//       baseURL: request.nextUrl.origin,
//       headers: {
//         cookie: request.headers.get("cookie") || "",
//       },
//     }
//   );

//   if (session?.user.role !== "admin") {
//     return new NextResponse(null, { status: 404 });
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//     "/admin/:path*",
//   ],
// };
