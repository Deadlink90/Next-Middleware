import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export function POST() {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;

  if (!token)
    return NextResponse.json(
      {
        msg: "Not valid token",
        status: false,
      },
      { status: 400 }
    );

  try {
    verify(token, "secret");

    const serialized = serialize("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return NextResponse.json(
      {
        msg: "Logout successfully!!",
        status: true,
      },
      { headers: { "Set-Cookie": serialized } }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Not valid token",
        status: false,
      },
      { status: 400 }
    );
  }
}
