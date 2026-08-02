/**
 * PRODUCTION ADMIN AUTHENTICATION SERVICE
 * Uses Supabase Auth - NO hardcoded credentials or development fallbacks
 * 
 * SECURITY:
 * - All authentication happens through Supabase Auth
 * - Tokens are verified server-side in admin API endpoints
 * - No dev/test credentials accepted in production
 */

import { AdminUser } from './types';
import { supabaseAuthClient, isAuthConfigured } from '../../lib/supabase-client';

export interface AdminAuthProvider {
  login(email: string, pass: string): Promise<{ success: boolean; user?: AdminUser; token?: string; error?: string }>;
  logout(): Promise<void>;
  getSession(): Promise<{ user: AdminUser; token: string } | null>;
}

export class ApiAdminAuthProvider implements AdminAuthProvider {
  async login(email: string, pass: string): Promise<{ success: boolean; user?: AdminUser; token?: string; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();

    if (!isAuthConfigured() || !supabaseAuthClient) {
      return {
        success: false,
        error: 'Authentication is not configured. Please contact system administrator.',
      };
    }

    try {
      // Real Supabase Auth - NO dev fallbacks
      const { data, error } = await supabaseAuthClient.auth.signInWithPassword({
        email: cleanEmail,
        password: pass,
      });

      if (error) {
        return {
          success: false,
          error: 'Invalid email or password.',
        };
      }

      if (!data.user || !data.session) {
        return {
          success: false,
          error: 'Authentication failed. Please try again.',
        };
      }

      const user: AdminUser = {
        id: data.user.id,
        email: data.user.email || cleanEmail,
        name: data.user.user_metadata?.name || 'Admin User',
        role: 'admin',
      };

      const token = data.session.access_token;

      // Store session (for UI state only - real verification happens server-side)
      sessionStorage.setItem('sahaja_admin_token', token);
      sessionStorage.setItem('sahaja_admin_user', JSON.stringify(user));

      return { success: true, user, token };
    } catch (err: any) {
      console.error('Admin auth error:', err);
      return {
        success: false,
        error: 'Unable to sign in. Please check your credentials and try again.',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      if (supabaseAuthClient) {
        await supabaseAuthClient.auth.signOut();
      }
    } catch (e) {
      console.error('Logout error:', e);
    }
    sessionStorage.removeItem('sahaja_admin_token');
    sessionStorage.removeItem('sahaja_admin_user');
  }

  async getSession(): Promise<{ user: AdminUser; token: string } | null> {
    if (!isAuthConfigured() || !supabaseAuthClient) {
      return null;
    }

    try {
      // Check Supabase session
      const { data, error } = await supabaseAuthClient.auth.getSession();
      
      if (error || !data.session) {
        sessionStorage.removeItem('sahaja_admin_token');
        sessionStorage.removeItem('sahaja_admin_user');
        return null;
      }

      const user: AdminUser = {
        id: data.session.user.id,
        email: data.session.user.email || '',
        name: data.session.user.user_metadata?.name || 'Admin User',
        role: 'admin',
      };

      const token = data.session.access_token;

      // Update sessionStorage
      sessionStorage.setItem('sahaja_admin_token', token);
      sessionStorage.setItem('sahaja_admin_user', JSON.stringify(user));

      return { user, token };
    } catch (e) {
      console.error('Session check error:', e);
      sessionStorage.removeItem('sahaja_admin_token');
      sessionStorage.removeItem('sahaja_admin_user');
      return null;
    }
  }
}
