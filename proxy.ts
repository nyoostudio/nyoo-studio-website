import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const secret = process.env.PREVIEW_SECRET;
  const cookieValue = request.cookies.get("preview_bypass")?.value;

  // Valid bypass cookie — pass through to real site
  if (secret && cookieValue === secret) {
    return NextResponse.next();
  }

  // ?preview=<secret> param — set cookie and redirect to clean URL
  const previewParam = request.nextUrl.searchParams.get("preview");
  if (secret && previewParam === secret) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("preview");
    const response = NextResponse.redirect(url);
    response.cookies.set("preview_bypass", secret, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  // Block — rewrite to maintenance page (URL stays the same for the visitor)
  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  // Exclude Next.js internals, API routes, the maintenance page itself, and static assets
  matcher: ["/((?!_next|api|maintenance|favicon\\.ico|icon\\.svg).*)"],
};
