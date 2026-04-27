import { NextResponse } from "next/server";

export function middleware(req) {
  const allCookies = req.cookies.getAll();

  const hasToken = allCookies.some(
    (cookie) => cookie.name.startsWith("eyJ") || cookie.name === "refreshToken",
  );

  if (!hasToken && req.nextUrl.pathname.startsWith("/homepage")) {
    console.log("failed - no valid token found");
    return NextResponse.redirect(new URL("/authentication/signIn", req.url));
  }

  console.log("Token found, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage/:path*"],
};
