import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token)
    return NextResponse.json(
      {
        msg: "Not authorized",
        status: false,
      },
      {
        status: 401,
      }
    );

  try {
    const decoded: any = verify(token, "secret");

    const { email, username } = decoded;

    return NextResponse.json({
      profile: {
        username,
        email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Not valid token",
        status: false,
      },
      {
        status: 401,
      }
    );
  }
}
