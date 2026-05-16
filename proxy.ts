import { NextRequest, NextResponse } from "next/server";
import {
  getExpectedSiteAccessToken,
  SITE_ACCESS_COOKIE,
} from "@/lib/siteAccess";

export async function proxy(request: NextRequest) {
  const expectedToken = await getExpectedSiteAccessToken();

  if (process.env.NODE_ENV !== "production" && !expectedToken) {
    console.warn(
      "[middleware] SITE_ACCESS_PASSWORD is not set - site access is disabled"
    );
  }

  const cookieValue = request.cookies.get(SITE_ACCESS_COOKIE)?.value;

  if (expectedToken && cookieValue === expectedToken) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  url.search = "";

  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (next !== "/") {
    url.searchParams.set("next", next);
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|maintenance|images|favicon\\.ico|icon\\.svg).*)"],
};
