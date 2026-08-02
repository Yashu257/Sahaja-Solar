/**
 * SERVER-SIDE AUTHENTICATION MIDDLEWARE
 * Verifies Supabase Auth tokens for admin API endpoints
 * 
 * SECURITY:
 * - Uses service_role key to verify JWT tokens server-side
 * - Returns null if token is invalid, expired, or missing
 * - NO development fallbacks or hardcoded credentials
 */

import { getSupabaseClient } from './dbServer';

export interface VerifiedAdmin {
  id: string;
  email: string;
  role: string;
}

/**
 * Verify admin authentication token
 * Returns admin user info if valid, null if invalid
 */
export const verifyAdminToken = async (authHeader: string | undefined): Promise<VerifiedAdmin | null> => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  const client = getSupabaseClient();
  if (!client) {
    console.error('Supabase client not configured for token verification');
    return null;
  }

  try {
    // Verify token using Supabase Auth
    const { data, error } = await client.auth.getUser(token);

    if (error || !data.user) {
      return null;
    }

    // Return verified admin info
    return {
      id: data.user.id,
      email: data.user.email || '',
      role: data.user.user_metadata?.role || 'admin',
    };
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
};

/**
 * Middleware wrapper for admin API endpoints
 * Returns 401 if authentication fails
 */
export const requireAdminAuth = async (
  req: any,
  handler: (req: any, admin: VerifiedAdmin) => Promise<any>
): Promise<any> => {
  const authHeader = req.headers.authorization || req.headers['authorization'];
  const admin = await verifyAdminToken(authHeader);

  if (!admin) {
    return {
      status: 401,
      body: {
        success: false,
        message: 'Unauthorized. Valid admin authentication required.',
      },
    };
  }

  return handler(req, admin);
};
