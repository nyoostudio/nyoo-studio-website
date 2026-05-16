import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  createSiteAccessToken,
  getSiteAccessPassword,
  SITE_ACCESS_COOKIE,
} from "@/lib/siteAccess";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof body.password === "string"
      ? body.password
      : "";

  const expectedPassword = getSiteAccessPassword();

  if (!expectedPassword || password !== expectedPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SITE_ACCESS_COOKIE, await createSiteAccessToken(password), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
