export const SITE_ACCESS_COOKIE = "site_access";

const ACCESS_TOKEN_PREFIX = "nyoo-studio-site-access";

export function getSiteAccessPassword() {
  return process.env.SITE_ACCESS_PASSWORD ?? process.env.PREVIEW_SECRET;
}

export async function createSiteAccessToken(password: string) {
  const data = new TextEncoder().encode(`${ACCESS_TOKEN_PREFIX}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getExpectedSiteAccessToken() {
  const password = getSiteAccessPassword();
  return password ? createSiteAccessToken(password) : null;
}
