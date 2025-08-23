import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/settings", "/files"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userToken = req.cookies.get("authToken")?.value;

  // If route is protected and no user token → redirect to home (/)
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // If user is logged in and tries to go to `/` → send them to `/dashboard`
  if (pathname === "/" && userToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"], // applies to all routes except _next & api
};
