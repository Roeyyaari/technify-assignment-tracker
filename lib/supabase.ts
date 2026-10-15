import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cache on globalThis so hot reloads reuse one client instead of creating another.
const globalForSupabase = globalThis as unknown as {
  supabase?: SupabaseClient;
};

// Null when the env vars are missing, so the app can show an error instead of crashing.
export const supabase =
  globalForSupabase.supabase ??
  (url && anonKey ? (globalForSupabase.supabase = createClient(url, anonKey)) : null);
