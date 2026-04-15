import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/homepage")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/authentication/signIn", request.url),
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage/:path*"],
};
