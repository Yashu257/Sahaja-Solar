/**
 * CLIENT-SIDE Supabase Auth Client
 * Uses SUPABASE_ANON_KEY (safe for browser exposure)
 * Used ONLY for authentication in the browser
 */

import { createClient } from '@supabase/supabase-js';

// Vite environment variables
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Client-side auth client (uses anon key - safe for browser)
export const supabaseAuthClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isAuthConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
