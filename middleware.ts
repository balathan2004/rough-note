import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:8081",
];

export function middleware(req: NextRequest) {
  const client = req.cookies.get("roughnote_uid")?.value || false;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }


  if ((pathname == "/home" || pathname == "/account") && !client) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname == "/" && client) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/account", "/"],
};





