/**
 * Sahaja Solar Admin Dashboard Metrics Endpoint (Protected)
 *
 * SECURITY:
 * - Requires valid Supabase Auth Bearer token
 * - Token is verified server-side (no fake tokens accepted)
 * - Returns 401 if unauthenticated
 */

import { verifyAdminToken } from '../../src/lib/auth-middleware';
import { dbGetAdminLeads, dbGetAdminBookings } from '../../src/lib/dbServer';

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
    const leads = await dbGetAdminLeads();
    const bookings = await dbGetAdminBookings();

    const newLeadsCount = leads.filter((l) => l.status === 'new').length;
    const upcomingBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;
    const pendingSiteVisitsCount = bookings.filter((b) => b.consultationType === 'site_visit' && b.status === 'pending_confirmation').length;

    return res.status(200).json({
      success: true,
      metrics: {
        newLeadsCount,
        upcomingBookingsCount,
        pendingSiteVisitsCount,
        totalRecordsCount: leads.length + bookings.length,
      },
      recentLeads: leads.slice(0, 5),
      recentBookings: bookings.slice(0, 5),
    });
  } catch (err: any) {
    console.error('Admin Dashboard API error:', err);
    return res.status(500).json({ success: false, message: 'Server error processing dashboard metrics.' });
  }
}
