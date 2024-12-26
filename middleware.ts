import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const client = req.cookies.get("roughnote_uid")?.value || false;
  const { pathname } = req.nextUrl;
  console.log("pathname", pathname);

  if ((pathname == "/home" || pathname == "/account") && !client) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/account"],
};
