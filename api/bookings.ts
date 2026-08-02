/**
 * Sahaja Solar Serverless Booking Endpoint (Node.js / Vercel Serverless / Express)
 *
 * PRODUCTION FLOW:
 * 1. Server validation
 * 2. Double-booking slot check & database persistence (solar_bookings)
 * 3. Business email notification (sahajasolar@gmail.com) AFTER database confirmation
 * 4. Customer booking confirmation email (if valid email provided)
 */

import { dbCreateBooking } from '../src/lib/dbServer';
import {
  sendBookingBusinessNotification,
  sendBookingCustomerConfirmation,
} from '../src/lib/emailServer';

export interface BookingApiRequest {
  name: string;
  phone: string;
  email?: string;
  propertyType: 'residential' | 'commercial';
  location: string;
  pincode?: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  consultationType: 'phone' | 'site_visit';
  date: string;
  timeSlot: string;
  timezone?: string;
  consent: boolean;
  source?: string;
  quoteId?: string;
  conversationSummary?: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data: BookingApiRequest = req.body;

    // 1. Server-side Input Validation
    if (!data.name || !data.phone || !data.location || !data.date || !data.timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking fields (name, phone, location, date, timeSlot).',
      });
    }

    const cleanPhone = data.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid 10-digit Indian phone number.',
      });
    }

    if (!data.consent) {
      return res.status(400).json({
        success: false,
        message: 'Consent is required to submit a booking request.',
      });
    }

    // 2. Database Persistence & Double Booking Validation (Source of Truth)
    const result = await dbCreateBooking({
      name: data.name.trim(),
      phone: cleanPhone,
      email: data.email?.trim(),
      propertyType: data.propertyType,
      location: data.location.trim(),
      monthlyBill: data.monthlyBill,
      interestedCapacityKw: data.interestedCapacityKw,
      consultationType: data.consultationType,
      date: data.date,
      timeSlot: data.timeSlot,
      timezone: data.timezone || 'Asia/Kolkata',
      source: data.source || 'website_booking_section',
      quoteId: data.quoteId,
      conversationSummary: data.conversationSummary,
      consent: data.consent,
    });

    if (!result.success) {
      // Double booking or slot unavailable: NO email is sent
      return res.status(409).json(result);
    }

    // 3. Email Notifications (ONLY after database persistence confirmation)
    const bookingPayload = {
      reference: result.bookingId || 'SS-2026-PENDING',
      name: data.name.trim(),
      phone: cleanPhone,
      email: data.email?.trim(),
      consultationType: data.consultationType,
      propertyType: data.propertyType,
      location: data.location.trim(),
      date: data.date,
      timeSlot: data.timeSlot,
      timezone: data.timezone || 'Asia/Kolkata',
      monthlyBill: data.monthlyBill,
      interestedCapacityKw: data.interestedCapacityKw,
    };

    // Dispatch business notification
    try {
      await sendBookingBusinessNotification(bookingPayload);
    } catch (emailErr) {
      console.error('[Booking API] Business email notification error:', emailErr);
    }

    // Dispatch customer receipt confirmation if valid email provided
    if (data.email && data.email.includes('@')) {
      try {
        await sendBookingCustomerConfirmation(bookingPayload);
      } catch (custErr) {
        console.error('[Booking API] Customer email receipt error:', custErr);
      }
    }

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Booking API error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error processing booking.',
    });
  }
}
