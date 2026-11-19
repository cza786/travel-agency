"use server";

import { cookies } from "next/headers";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import {
  AdminUser,
  ADMIN_COOKIE_NAME,
  signSession,
  verifySessionToken,
} from "@/lib/session";

export type { AdminUser };

export async function loginAdminAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, error: "Please enter both email and password." };
  }

  // 1. Try Supabase Auth first
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data?.user && !error) {
      const sessionUser: AdminUser = {
        email: data.user.email || email,
        name: data.user.user_metadata?.full_name || "Admin",
        role: "admin",
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      };

      const token = signSession(sessionUser);
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return { success: true };
    }
  } catch (sbError) {
    console.warn("Supabase auth notice:", sbError);
  }

  // 2. Controlled Environment Variable Fallback (configurable via .env.local / Vercel secrets)
  const envAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envAdminPassword = process.env.ADMIN_PASSWORD;

  if (envAdminEmail && envAdminPassword) {
    const isEmailMatch = email === envAdminEmail;
    let isPasswordMatch = false;
    try {
      const passBuf = Buffer.from(password);
      const envBuf = Buffer.from(envAdminPassword);
      if (passBuf.length === envBuf.length && crypto.timingSafeEqual(passBuf, envBuf)) {
        isPasswordMatch = true;
      }
    } catch {
      isPasswordMatch = false;
    }

    if (isEmailMatch && isPasswordMatch) {
      const sessionUser: AdminUser = {
        email,
        name: "Admin",
        role: "admin",
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const token = signSession(sessionUser);
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return { success: true };
    }
  }

  return {
    success: false,
    error: "Invalid email or password.",
  };
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!sessionCookie?.value) return null;
    return verifySessionToken(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function logoutAdminAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
}
