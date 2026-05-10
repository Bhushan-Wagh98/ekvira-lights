import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Client-side Supabase client
 * Uses 'ekvira' schema for all database operations.
 * Safe to use in browser - uses anon key with RLS policies.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'ekvira' },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Server-side Supabase client (admin)
 * Uses service role key - bypasses RLS.
 * Only available in server components / API routes.
 * DO NOT expose this to the client.
 */
export const supabaseAdmin =
  typeof window === 'undefined'
    ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '', {
        db: { schema: 'ekvira' },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;
