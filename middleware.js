import { NextResponse } from "next/server";

export function middleware(request) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/homepage")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/authentication/signIn", request.url),
      );
    }
  }

  if (pathname.startsWith("/authentication")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/homepage", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage/:path*", "/authentication/:path*"],
};
