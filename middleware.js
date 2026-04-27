import { NextResponse } from "next/server";

export function middleware(req) {
  const allCookies = req.cookies.getAll();

  // Log all cookie names for debugging
  console.log("=== COOKIE DEBUG ===");
  console.log("Path:", req.nextUrl.pathname);
  console.log(
    "All cookie names:",
    allCookies.map((c) => c.name),
  );
  console.log("All cookies:", JSON.stringify(allCookies));

  // Try to find any JWT-looking cookie
  const possibleTokens = allCookies.filter(
    (c) =>
      c.name.startsWith("eyJ") ||
      c.name === "refreshToken" ||
      c.name === "accessToken" ||
      c.name.includes("token"),
  );

  console.log("Possible token cookies:", possibleTokens);
  console.log("=== END DEBUG ===");

  // Check for any token-like cookie
  const hasToken = allCookies.some(
    (c) => c.name.startsWith("eyJ") || c.name === "refreshToken",
  );

  if (!hasToken && req.nextUrl.pathname.startsWith("/homepage")) {
    console.log("NO TOKEN FOUND - Redirecting to sign in");
    return NextResponse.redirect(new URL("/authentication/signIn", req.url));
  }

  console.log("TOKEN FOUND - Allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage", "/homepage/:path*"],
};
