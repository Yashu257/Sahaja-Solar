/**
 * Sahaja Solar Booking Availability API
 * 
 * Returns available time slots for a given date based on:
 * - Database availability_config
 * - Database blocked_dates
 * - Existing confirmed bookings
 */

import { supabaseServer } from '../../lib/supabase-server';

export interface AvailabilityApiRequest {
  date: string; // YYYY-MM-DD
}

export interface TimeSlot {
  time: string;
  isoString: string;
  available: boolean;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Missing or invalid date parameter.',
      });
    }

    // 1. Get Active Availability Configuration
    const { data: config, error: configError } = await supabaseServer
      .from('availability_config')
      .select('*')
      .eq('is_active', true)
      .single();

    if (configError || !config) {
      console.error('Availability config error:', configError);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch availability configuration.',
      });
    }

    // 2. Check if Date is Blocked
    const { data: blockedDates, error: blockedError } = await supabaseServer
      .from('blocked_dates')
      .select('blocked_date')
      .eq('blocked_date', date);

    if (blockedError) {
      console.error('Blocked dates check error:', blockedError);
      return res.status(500).json({
        success: false,
        message: 'Failed to check blocked dates.',
      });
    }

    if (blockedDates && blockedDates.length > 0) {
      return res.status(200).json({
        success: true,
        slots: [],
        message: 'This date is blocked (holiday or unavailable).',
      });
    }

    // 3. Check Day of Week
    const selectedDate = new Date(date + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay(); // 0=Sunday, 1=Monday, etc.

    if (!config.working_days.includes(dayOfWeek)) {
      return res.status(200).json({
        success: true,
        slots: [],
        message: 'This day is not a working day.',
      });
    }

    // 4. Get Existing Confirmed Bookings for This Date
    const { data: existingBookings, error: bookingsError } = await supabaseServer
      .from('solar_bookings')
      .select('requested_time')
      .eq('requested_date', date)
      .in('status', ['pending', 'pending_confirmation', 'confirmed']);

    if (bookingsError) {
      console.error('Existing bookings check error:', bookingsError);
      return res.status(500).json({
        success: false,
        message: 'Failed to check existing bookings.',
      });
    }

    const bookedSlots = new Set((existingBookings || []).map(b => b.requested_time));

    // 5. Generate Time Slots
    const slots: TimeSlot[] = [];
    const now = new Date();
    const minimumNoticeMs = config.minimum_notice_hours * 3600 * 1000;

    for (let hour = config.start_hour; hour < config.end_hour; hour++) {
      // Skip lunch break
      if (
        config.lunch_break_start !== null &&
        config.lunch_break_end !== null &&
        hour >= config.lunch_break_start &&
        hour < config.lunch_break_end
      ) {
        continue;
      }

      const timeLabel =
        hour < 12
          ? `${hour}:00 AM`
          : hour === 12
          ? `12:00 PM`
          : `${hour - 12}:00 PM`;

      const slotDateTime = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00+05:30`);
      
      let available = !bookedSlots.has(timeLabel);

      // Check minimum notice requirement
      if (slotDateTime.getTime() < now.getTime() + minimumNoticeMs) {
        available = false;
      }

      slots.push({
        time: timeLabel,
        isoString: slotDateTime.toISOString(),
        available,
      });
    }

    return res.status(200).json({
      success: true,
      slots,
    });
  } catch (err: any) {
    console.error('Availability API error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error checking availability.',
    });
  }
}
