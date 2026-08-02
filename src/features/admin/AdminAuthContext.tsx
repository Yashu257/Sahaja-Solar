import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from './types';
import { ApiAdminAuthProvider } from './adminAuthService';

const authProvider = new ApiAdminAuthProvider();

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    authProvider.getSession().then((session) => {
      if (active) {
        if (session) {
          setUser(session.user);
          setToken(session.token);
        }
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await authProvider.login(email, pass);
    if (res.success && res.user && res.token) {
      setUser(res.user);
      setToken(res.token);
      return { success: true };
    }
    return { success: false, error: res.error || 'Unable to sign in with those credentials.' };
  };

  const logout = async () => {
    await authProvider.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within an AdminAuthProviderComponent');
  return ctx;
};
