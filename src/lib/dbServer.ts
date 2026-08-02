import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Server-side Supabase Client Initialization
// Uses SERVICE_ROLE_KEY for server-side operations (NEVER expose to browser)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabaseServerClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseServiceKey) {
  supabaseServerClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!supabaseServerClient && supabaseUrl && supabaseServiceKey) {
    supabaseServerClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseServerClient;
};

export const isDatabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseServiceKey);
};

// 1. Create Solar Quote Record
export interface DbQuoteInput {
  name: string;
  phone: string;
  email?: string;
  propertyType: string;
  location: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  message?: string;
  source?: string;
  calculatorContext?: any;
  conversationSummary?: string;
  consent: boolean;
}

export const dbCreateQuote = async (input: DbQuoteInput) => {
  const client = getSupabaseClient();
  const reference = `SSQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  if (!client) {
    return {
      success: true,
      quoteId: reference,
      persisted: false,
      message: 'Quote received (Configuration Required for Database Storage).',
    };
  }

  const { data, error } = await client
    .from('solar_quotes')
    .insert([
      {
        reference,
        name: input.name,
        phone: input.phone,
        email: input.email || null,
        property_type: input.propertyType,
        location: input.location,
        monthly_bill: input.monthlyBill || null,
        interested_capacity_kw: input.interestedCapacityKw || null,
        message: input.message || null,
        source: input.source || 'website_quote_section',
        calculator_context: input.calculatorContext || null,
        conversation_summary: input.conversationSummary || null,
        consent: input.consent,
        status: 'new',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase DB Quote Error:', error);
    throw new Error(error.message || 'Database insert failed');
  }

  return {
    success: true,
    quoteId: data.reference || reference,
    persisted: true,
    message: 'Solar quote enquiry persisted to production database.',
  };
};

// 2. Create Solar Booking Record (With Server-side Double-Booking Protection)
export interface DbBookingInput {
  name: string;
  phone: string;
  email?: string;
  propertyType: string;
  location: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  consultationType: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  timezone?: string;
  source?: string;
  quoteId?: string;
  conversationSummary?: string;
  consent: boolean;
}

export const dbCreateBooking = async (input: DbBookingInput) => {
  const client = getSupabaseClient();
  const reference = `SS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  if (!client) {
    const status = input.consultationType === 'site_visit' ? 'pending_confirmation' : 'confirmed';
    return {
      success: true,
      bookingId: reference,
      status,
      persisted: false,
      message: 'Consultation request received (Configuration Required for Database Storage).',
    };
  }

  // Double-Booking Protection: Check existing active bookings for date & timeSlot
  const { data: existingBooking } = await client
    .from('solar_bookings')
    .select('id, reference')
    .eq('requested_date', input.date)
    .eq('requested_time', input.timeSlot)
    .neq('status', 'cancelled')
    .maybeSingle();

  if (existingBooking) {
    return {
      success: false,
      message: 'That specific time slot is no longer available. Please select another available slot.',
    };
  }

  // Check Blocked Dates
  const { data: isBlocked } = await client
    .from('blocked_dates')
    .select('id')
    .eq('blocked_date', input.date)
    .maybeSingle();

  if (isBlocked) {
    return {
      success: false,
      message: 'The selected date is unavailable for consultations. Please select another date.',
    };
  }

  const initialStatus = input.consultationType === 'site_visit' ? 'pending_confirmation' : 'confirmed';

  const { data, error } = await client
    .from('solar_bookings')
    .insert([
      {
        reference,
        name: input.name,
        phone: input.phone,
        email: input.email || null,
        property_type: input.propertyType,
        location: input.location,
        monthly_bill: input.monthlyBill || null,
        interested_capacity_kw: input.interestedCapacityKw || null,
        consultation_type: input.consultationType,
        requested_date: input.date,
        requested_time: input.timeSlot,
        timezone: input.timezone || 'Asia/Kolkata',
        status: initialStatus,
        source: input.source || 'website_booking_section',
        quote_id: input.quoteId || null,
        conversation_summary: input.conversationSummary || null,
        consent: input.consent,
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return {
        success: false,
        message: 'That specific time slot was just reserved. Please select another available slot.',
      };
    }
    console.error('Supabase DB Booking Error:', error);
    throw new Error(error.message || 'Database insert failed');
  }

  return {
    success: true,
    bookingId: data.reference || reference,
    status: data.status || initialStatus,
    persisted: true,
    message: 'Consultation request persisted to production database.',
  };
};

// 3. Get Availability Slots for a Date (Factoring in DB bookings & blocked dates)
export const dbGetAvailability = async (dateStr: string) => {
  const client = getSupabaseClient();

  const defaultWorkingHours = { startHour: 9, endHour: 18 };
  const selectedDate = new Date(dateStr);
  const dayOfWeek = selectedDate.getDay();

  if (dayOfWeek === 0) {
    return { date: dateStr, slots: [] };
  }

  if (!client) {
    const slots = [];
    for (let h = 9; h < 18; h++) {
      if (h === 13) continue;
      const time = h < 12 ? `${h}:00 AM` : h === 12 ? `12:00 PM` : `${h - 12}:00 PM`;
      slots.push({ time, available: true });
    }
    return { date: dateStr, slots };
  }

  const { data: blocked } = await client
    .from('blocked_dates')
    .select('id')
    .eq('blocked_date', dateStr)
    .maybeSingle();

  if (blocked) {
    return { date: dateStr, slots: [] };
  }

  const { data: existingBookings } = await client
    .from('solar_bookings')
    .select('requested_time')
    .eq('requested_date', dateStr)
    .neq('status', 'cancelled');

  const bookedTimes = new Set((existingBookings || []).map((b) => b.requested_time));

  const slots = [];
  for (let h = defaultWorkingHours.startHour; h < defaultWorkingHours.endHour; h++) {
    if (h === 13) continue;
    const timeLabel = h < 12 ? `${h}:00 AM` : h === 12 ? `12:00 PM` : `${h - 12}:00 PM`;
    const available = !bookedTimes.has(timeLabel);

    slots.push({ time: timeLabel, available });
  }

  return { date: dateStr, slots };
};

// ============================================================================
// ADMIN PRODUCTION QUERIES & MUTATIONS
// ============================================================================

// 4. Fetch All Quote Leads for Admin
export const dbGetAdminLeads = async () => {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('solar_quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch admin leads error:', error);
    return [];
  }

  return (data || []).map((q) => ({
    id: q.reference || q.id,
    dbId: q.id,
    name: q.name,
    phone: q.phone,
    email: q.email,
    propertyType: q.property_type,
    location: q.location,
    monthlyBill: q.monthly_bill,
    interestedCapacityKw: q.interested_capacity_kw,
    message: q.message,
    source: q.source,
    status: q.status,
    notes: q.admin_notes || [],
    createdAt: new Date(q.created_at).getTime(),
  }));
};

// 5. Update Quote Lead Status
export const dbUpdateLeadStatus = async (reference: string, newStatus: string) => {
  const client = getSupabaseClient();
  if (!client) return { success: false, message: 'Database client not configured' };

  const { error } = await client
    .from('solar_quotes')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('reference', reference);

  if (error) {
    console.error('Update lead status error:', error);
    return { success: false, message: error.message };
  }

  return { success: true };
};

// 6. Add Admin Note to Quote Lead
export const dbAddLeadNote = async (reference: string, noteText: string, author: string = 'Staff') => {
  const client = getSupabaseClient();
  if (!client) return { success: false, message: 'Database client not configured' };

  const { data: quote, error: fetchErr } = await client
    .from('solar_quotes')
    .select('admin_notes')
    .eq('reference', reference)
    .single();

  if (fetchErr || !quote) {
    return { success: false, message: 'Quote record not found' };
  }

  const existingNotes = quote.admin_notes || [];
  const updatedNotes = [...existingNotes, { text: noteText, author, createdAt: Date.now() }];

  const { error } = await client
    .from('solar_quotes')
    .update({ admin_notes: updatedNotes, updated_at: new Date().toISOString() })
    .eq('reference', reference);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, notes: updatedNotes };
};

// 7. Fetch All Consultation Bookings for Admin
export const dbGetAdminBookings = async () => {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('solar_bookings')
    .select('*')
    .order('requested_date', { ascending: false });

  if (error) {
    console.error('Fetch admin bookings error:', error);
    return [];
  }

  return (data || []).map((b) => ({
    id: b.reference || b.id,
    dbId: b.id,
    name: b.name,
    phone: b.phone,
    email: b.email,
    propertyType: b.property_type,
    location: b.location,
    monthlyBill: b.monthly_bill,
    interestedCapacityKw: b.interested_capacity_kw,
    consultationType: b.consultation_type,
    date: b.requested_date,
    timeSlot: b.requested_time,
    timezone: b.timezone,
    status: b.status,
    source: b.source,
    createdAt: new Date(b.created_at).getTime(),
  }));
};

// 8. Update Consultation Booking Status
export const dbUpdateBookingStatus = async (reference: string, newStatus: string) => {
  const client = getSupabaseClient();
  if (!client) return { success: false, message: 'Database client not configured' };

  const { error } = await client
    .from('solar_bookings')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('reference', reference);

  if (error) {
    console.error('Update booking status error:', error);
    return { success: false, message: error.message };
  }

  return { success: true };
};

// 9. Fetch Blocked Dates for Admin
export const dbGetBlockedDates = async () => {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client.from('blocked_dates').select('*').order('blocked_date', { ascending: true });
  if (error) return [];
  return (data || []).map((d) => d.blocked_date);
};

// 10. Add Blocked Date
export const dbAddBlockedDate = async (dateStr: string, reason?: string) => {
  const client = getSupabaseClient();
  if (!client) return { success: false, message: 'Database client not configured' };

  const { error } = await client.from('blocked_dates').insert([{ blocked_date: dateStr, reason: reason || 'Unavailable' }]);
  if (error) return { success: false, message: error.message };
  return { success: true };
};

// 11. Remove Blocked Date
export const dbRemoveBlockedDate = async (dateStr: string) => {
  const client = getSupabaseClient();
  if (!client) return { success: false, message: 'Database client not configured' };

  const { error } = await client.from('blocked_dates').delete().eq('blocked_date', dateStr);
  if (error) return { success: false, message: error.message };
  return { success: true };
};
