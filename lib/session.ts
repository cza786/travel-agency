import crypto from "crypto";

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  exp: number;
}

export const ADMIN_COOKIE_NAME = "fcd_admin_session";

function getSessionSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "fcd-austria-super-secure-admin-session-salt-2025"
  );
}

export function signSession(payload: AdminUser): string {
  const secret = getSessionSecret();
  const rawData = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(rawData)
    .digest("base64url");
  return `${rawData}.${signature}`;
}

export function verifySessionToken(token: string): AdminUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [rawData, signature] = parts;
    const secret = getSessionSecret();
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(rawData)
      .digest("base64url");

    // Timing-safe signature check
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(rawData, "base64url").toString("utf-8")) as AdminUser;
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
