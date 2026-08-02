/**
 * Sahaja Solar Admin Login Endpoint (Node.js / Vercel Serverless / Express)
 *
 * SECURITY:
 * - REMOVED: All hardcoded credentials and development fallbacks
 * - Uses ONLY Supabase Auth for authentication
 * - Returns 401 on authentication failure with generic message
 * - Returns JWT token that will be verified server-side in admin APIs
 */

import { getSupabaseClient } from '../../src/lib/dbServer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { email, pass } = req.body || {};

    if (!email || !pass) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const client = getSupabaseClient();

    if (!client) {
      return res.status(503).json({
        success: false,
        message: 'Authentication service unavailable. Please contact administrator.',
      });
    }

    // Real Supabase Auth - NO fallbacks, NO hardcoded passwords
    const { data, error } = await client.auth.signInWithPassword({
      email: cleanEmail,
      password: pass,
    });

    if (error || !data.user || !data.session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    // Return success with JWT token (will be verified in admin APIs)
    return res.status(200).json({
      success: true,
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || 'Admin User',
        role: 'admin',
      },
    });
  } catch (err: any) {
    console.error('Admin login error:', err);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
    });
  }
}
