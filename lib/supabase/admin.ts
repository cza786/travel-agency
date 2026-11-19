import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  // Use service key if available, otherwise fallback to anonKey with warning in non-production
  const activeKey = serviceKey || anonKey;
  if (!activeKey) {
    throw new Error("Missing Supabase API key (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY).");
  }

  if (!serviceKey && process.env.NODE_ENV !== "production") {
    console.warn("[SECURITY NOTICE] SUPABASE_SERVICE_ROLE_KEY is not defined. Admin client is using anonymous key.");
  }

  return createClient(supabaseUrl, activeKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
