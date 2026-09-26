import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Case studies are unlocked with one shared password, set in Vercel as
// CASE_STUDY_PASSWORD. The cookie stores a hash of it, never the password.
export const ACCESS_COOKIE = "er_access";

function tokenFor(password: string) {
  return createHash("sha256").update(`er:${password}`).digest("hex");
}

export function expectedToken() {
  const password = process.env.CASE_STUDY_PASSWORD;
  return password ? tokenFor(password) : null;
}

export function passwordMatches(attempt: string) {
  const expected = expectedToken();
  if (!expected) return false;
  const a = Buffer.from(tokenFor(attempt));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function hasAccess() {
  const expected = expectedToken();
  if (!expected) return false;
  const jar = await cookies();
  const value = jar.get(ACCESS_COOKIE)?.value;
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
