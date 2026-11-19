import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://llschttmdxcyrrtkubkd.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_JMjoirJPyX-lIM844Z2VgQ__UZj2nSO";

  // Use service key if provided and not the expired dummy key, otherwise fallback to publishable key
  const isInvalidSecret = !serviceKey || serviceKey.includes("•") || serviceKey.startsWith("sb_secret_PxY");
  const activeKey = !isInvalidSecret ? serviceKey : anonKey;

  return createClient(supabaseUrl, activeKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
