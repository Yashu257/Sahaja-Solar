/**
 * Sahaja Solar Availability Endpoint (Node.js / Vercel Serverless / Express)
 *
 * PRODUCTION DATABASE: Queries database for existing booked slots & blocked dates
 */

import { dbGetAvailability } from '../src/lib/dbServer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const dateStr = req.query?.date || new Date().toISOString().split('T')[0];
    const result = await dbGetAvailability(dateStr);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Availability API error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch availability.',
    });
  }
}
