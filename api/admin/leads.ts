/**
 * Sahaja Solar Admin Leads Management Endpoint (Protected)
 *
 * SECURITY:
 * - Requires valid Supabase Auth Bearer token
 * - Token is verified server-side (no fake tokens accepted)
 * - Returns 401 if unauthenticated
 */

import { verifyAdminToken } from '../../src/lib/auth-middleware';
import { dbGetAdminLeads, dbUpdateLeadStatus, dbAddLeadNote } from '../../src/lib/dbServer';

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
    // 2. GET: List All Leads from Database
    if (req.method === 'GET') {
      const leads = await dbGetAdminLeads();
      return res.status(200).json({ success: true, leads });
    }

    // 3. PATCH: Update Lead Status or Add Note
    if (req.method === 'PATCH') {
      const { reference, action, status, noteText, author } = req.body || {};

      if (!reference) {
        return res.status(400).json({ success: false, message: 'Missing lead reference ID.' });
      }

      if (action === 'update_status' && status) {
        const result = await dbUpdateLeadStatus(reference, status);
        return res.status(200).json(result);
      }

      if (action === 'add_note' && noteText) {
        const authorName = author || admin.email || 'Admin';
        const result = await dbAddLeadNote(reference, noteText, authorName);
        return res.status(200).json(result);
      }

      return res.status(400).json({ success: false, message: 'Invalid action or missing parameters.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('Admin Leads API error:', err);
    return res.status(500).json({ success: false, message: 'Server error processing request.' });
  }
}
