/**
 * Supabase Server-Side Database Client
 * 
 * SECURITY: This module uses SERVICE_ROLE key and must ONLY be imported
 * in server-side code (API routes, serverless functions).
 * 
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 * NEVER import this in React components.
 */

import { createClient } from '@supabase/supabase-js';

// Server-side environment variables (NOT exposed to browser)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase server credentials. ' +
    'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
  );
}

/**
 * Server-side Supabase client with admin privileges.
 * Use this for database operations in API routes.
 */
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Type-safe database tables interface
 */
export interface Database {
  public: {
    Tables: {
      solar_quotes: {
        Row: SolarQuoteRow;
        Insert: SolarQuoteInsert;
        Update: SolarQuoteUpdate;
      };
      solar_bookings: {
        Row: SolarBookingRow;
        Insert: SolarBookingInsert;
        Update: SolarBookingUpdate;
      };
      availability_config: {
        Row: AvailabilityConfigRow;
        Insert: AvailabilityConfigInsert;
        Update: AvailabilityConfigUpdate;
      };
      blocked_dates: {
        Row: BlockedDateRow;
        Insert: BlockedDateInsert;
        Update: BlockedDateUpdate;
      };
    };
  };
}

export interface SolarQuoteRow {
  id: string;
  reference: string;
  name: string;
  phone: string;
  email: string | null;
  property_type: 'residential' | 'commercial';
  location: string;
  monthly_bill: number | null;
  interested_capacity_kw: number | null;
  message: string | null;
  source: string | null;
  calculator_context: any | null;
  conversation_summary: string | null;
  booking_id: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'closed' | 'lost';
  admin_notes: string | null;
  consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface SolarQuoteInsert {
  reference: string;
  name: string;
  phone: string;
  email?: string | null;
  property_type: 'residential' | 'commercial';
  location: string;
  monthly_bill?: number | null;
  interested_capacity_kw?: number | null;
  message?: string | null;
  source?: string | null;
  calculator_context?: any | null;
  conversation_summary?: string | null;
  consent: boolean;
  status?: 'new' | 'contacted' | 'qualified' | 'quoted' | 'closed' | 'lost';
}

export interface SolarQuoteUpdate {
  status?: 'new' | 'contacted' | 'qualified' | 'quoted' | 'closed' | 'lost';
  admin_notes?: string | null;
  booking_id?: string | null;
}

export interface SolarBookingRow {
  id: string;
  reference: string;
  name: string;
  phone: string;
  email: string | null;
  property_type: 'residential' | 'commercial';
  location: string;
  pincode: string | null;
  monthly_bill: number | null;
  interested_capacity_kw: number | null;
  consultation_type: 'phone' | 'site_visit';
  requested_date: string; // Date string
  requested_time: string;
  timezone: string;
  source: string | null;
  conversation_summary: string | null;
  quote_id: string | null;
  status: 'pending' | 'pending_confirmation' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  admin_notes: string | null;
  consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface SolarBookingInsert {
  reference: string;
  name: string;
  phone: string;
  email?: string | null;
  property_type: 'residential' | 'commercial';
  location: string;
  pincode?: string | null;
  monthly_bill?: number | null;
  interested_capacity_kw?: number | null;
  consultation_type: 'phone' | 'site_visit';
  requested_date: string; // YYYY-MM-DD
  requested_time: string;
  timezone: string;
  source?: string | null;
  conversation_summary?: string | null;
  consent: boolean;
  status?: 'pending' | 'pending_confirmation' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
}

export interface SolarBookingUpdate {
  status?: 'pending' | 'pending_confirmation' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  admin_notes?: string | null;
  quote_id?: string | null;
}

export interface AvailabilityConfigRow {
  id: string;
  working_days: number[];
  start_hour: number;
  end_hour: number;
  slot_duration_minutes: number;
  minimum_notice_hours: number;
  maximum_advance_days: number;
  lunch_break_start: number | null;
  lunch_break_end: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityConfigInsert {
  working_days: number[];
  start_hour: number;
  end_hour: number;
  slot_duration_minutes: number;
  minimum_notice_hours: number;
  maximum_advance_days: number;
  lunch_break_start?: number | null;
  lunch_break_end?: number | null;
  is_active?: boolean;
}

export interface AvailabilityConfigUpdate {
  working_days?: number[];
  start_hour?: number;
  end_hour?: number;
  slot_duration_minutes?: number;
  minimum_notice_hours?: number;
  maximum_advance_days?: number;
  lunch_break_start?: number | null;
  lunch_break_end?: number | null;
}

export interface BlockedDateRow {
  id: string;
  blocked_date: string; // YYYY-MM-DD
  reason: string | null;
  created_at: string;
}

export interface BlockedDateInsert {
  blocked_date: string; // YYYY-MM-DD
  reason?: string | null;
}

export interface BlockedDateUpdate {
  reason?: string | null;
}
