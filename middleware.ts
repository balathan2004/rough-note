import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const client = req.cookies.get("roughnote_uid")?.value || false;
  const { pathname } = req.nextUrl;

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