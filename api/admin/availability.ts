/**
 * Sahaja Solar Admin Availability Management Endpoint (Protected for mutations)
 *
 * SECURITY:
 * - GET requests are public (for calendar availability check)
 * - POST/DELETE require valid Supabase Auth Bearer token
 * - Token is verified server-side (no fake tokens accepted)
 */

import { verifyAdminToken } from '../../src/lib/auth-middleware';
import { dbGetBlockedDates, dbAddBlockedDate, dbRemoveBlockedDate } from '../../src/lib/dbServer';

export default async function handler(req: any, res: any) {
  try {
    // GET: Public endpoint (no auth required)
    if (req.method === 'GET') {
      const blockedDates = await dbGetBlockedDates();
      return res.status(200).json({ success: true, blockedDates });
    }

    // POST/DELETE: Require real token verification (NO dev fallbacks)
    const authHeader = req.headers.authorization || req.headers['authorization'];
    const admin = await verifyAdminToken(authHeader);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Valid admin authentication required.',
      });
    }

    if (req.method === 'POST') {
      const { date, reason } = req.body || {};
      if (!date) return res.status(400).json({ success: false, message: 'Missing date.' });

      const result = await dbAddBlockedDate(date, reason);
      return res.status(200).json(result);
    }

    if (req.method === 'DELETE') {
      const { date } = req.body || req.query || {};
      if (!date) return res.status(400).json({ success: false, message: 'Missing date.' });

      const result = await dbRemoveBlockedDate(date);
      return res.status(200).json(result);
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('Admin Availability API error:', err);
    return res.status(500).json({ success: false, message: 'Server error processing request.' });
  }
}
