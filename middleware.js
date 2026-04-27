import { NextResponse } from "next/server";

export function middleware(req) {
  const hasToken = req.cookies.get("refreshToken");

  if (!hasToken && req.nextUrl.pathname.startsWith("/homepage")) {
    console.log("failed");
    return NextResponse.redirect(new URL("/authentication/signIn", req.url));
  }
  console.log(hasToken);

  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage/:path*"],
};
