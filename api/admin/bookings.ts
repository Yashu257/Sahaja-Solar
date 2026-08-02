/**
 * Sahaja Solar Admin Bookings Management Endpoint (Protected)
 *
 * SECURITY:
 * - Requires valid Supabase Auth Bearer token
 * - Token is verified server-side (no fake tokens accepted)
 * - Returns 401 if unauthenticated
 */

import { verifyAdminToken } from '../../src/lib/auth-middleware';
import { dbGetAdminBookings, dbUpdateBookingStatus } from '../../src/lib/dbServer';

export default async function handler(req: any, res: any) {
  // 1. Real Token Verification (NO dev fallbacks)
  const authHeader = req.headers.authorization || req.headers['authorization'];
  const admin = await verifyAdminToken(authHeader);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Valid admin authentication required.',
    });
  }

  try {
    // 2. GET: List All Consultation Bookings from Database
    if (req.method === 'GET') {
      const bookings = await dbGetAdminBookings();
      return res.status(200).json({ success: true, bookings });
    }

    // 3. PATCH: Update Booking Status (e.g. pending_confirmation -> confirmed -> cancelled)
    if (req.method === 'PATCH') {
      const { reference, status } = req.body || {};

      if (!reference || !status) {
        return res.status(400).json({ success: false, message: 'Missing booking reference ID or status.' });
      }

      const result = await dbUpdateBookingStatus(reference, status);
      return res.status(200).json(result);
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('Admin Bookings API error:', err);
    return res.status(500).json({ success: false, message: 'Server error processing request.' });
  }
}
