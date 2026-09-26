"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, expectedToken, passwordMatches } from "@/lib/access";

export type UnlockState = { error?: string };

export async function unlock(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");

  if (!passwordMatches(password)) {
    return { error: "That password didn't work. Check the email I sent, or ask me for a new one." };
  }

  const jar = await cookies();
  jar.set(ACCESS_COOKIE, expectedToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(next.startsWith("/work/") ? next : "/");
}
