import jwt from "jsonwebtoken";
import {serialize} from "cookie";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === "admin@gmail.com" && password === "admin") {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email,
        username: "admin",
      },
      "secret"
    );

    const serialized = serialize('token',token,{
    httpOnly:true,
    sameSite:'strict',
    maxAge:100 *60*60*24*30,
    path:'/'
    })

    return NextResponse.json(
      {
        msg: "Login Works!!",
        status: true,
      },
      { status: 200, headers: { "Set-Cookie": serialized} }
    );
  }

  return NextResponse.json(
    {
      msg: "Not valid credentials!!",
      status: false,
    },
    {
      status: 400,
    }
  );
}
