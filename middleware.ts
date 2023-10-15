import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    try {
    const secret = new TextEncoder().encode('secret')
    const {payload} = await jwtVerify(token,secret);
    console.log(payload);
    NextResponse.next();
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
