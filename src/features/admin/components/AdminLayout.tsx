import React, { useState } from 'react';
import { useAdminAuth } from '../AdminAuthContext';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Sun,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { isAuthConfigured } from '@/lib/supabase-client';

export type AdminTab = 'overview' | 'leads' | 'bookings' | 'availability' | 'settings';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ activeTab, onTabChange, children }) => {
  const { isAuthenticated, isLoading, user, logout } = useAdminAuth();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  // Determine if using real Supabase Auth or mock fallback
  const isRealAuth = isAuthConfigured();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-body">
        <div className="flex items-center gap-3 text-sm font-mono text-slate-300">
          <Sun className="w-5 h-5 text-brand-gold animate-spin-slow" />
          <span>Authenticating Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  const NAV_ITEMS: { id: AdminTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Quote Leads', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: CalendarDays },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'settings', label: 'Settings & Status', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col md:flex-row font-body selection:bg-brand-green selection:text-white">
      {/* Desktop Sidebar (Left 240px) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0A3328] text-white flex-shrink-0 border-r border-emerald-900/50 min-h-screen p-6">
        <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
          <div className="w-9 h-9 rounded-xl bg-brand-gold text-brand-green flex items-center justify-center font-bold">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-sm tracking-tight text-white block">
              SAHAJA SOLAR
            </span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
              ADMIN PORTAL
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-grow space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full py-2.5 px-3.5 rounded-xl font-heading font-semibold text-xs transition-all flex items-center justify-between',
                  isActive
                    ? 'bg-brand-gold text-brand-green-dark shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </button>
            );
          })}
        </nav>

        {/* Auth Status & User Session */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className={cn(
            "p-3 rounded-xl border text-[10px] font-mono space-y-1",
            isRealAuth 
              ? "bg-emerald-950/50 border-emerald-700/50 text-emerald-300" 
              : "bg-black/30 border-white/10 text-emerald-300"
          )}>
            <div className={cn(
              "flex items-center gap-1.5 font-bold",
              isRealAuth ? "text-emerald-400" : "text-brand-gold"
            )}>
              {isRealAuth ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5" />
              )}
              <span>AUTH: {isRealAuth ? 'SUPABASE' : 'UNCONFIGURED'}</span>
            </div>
            <p className="text-slate-300">Signed in as: {user?.name}</p>
          </div>

          <button
            onClick={logout}
            className="w-full py-2.5 px-3.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-500/30 text-xs font-heading font-bold flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden bg-[#0A3328] text-white p-4 flex items-center justify-between border-b border-emerald-900">
        <div className="flex items-center gap-2.5">
          <Sun className="w-5 h-5 text-brand-gold" />
          <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-white">
            SAHAJA ADMIN
          </span>
        </div>

        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg"
          aria-label="Toggle Navigation Drawer"
        >
          {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-72 bg-[#0A3328] text-white h-full p-6 flex flex-col justify-between border-l border-emerald-900">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="font-heading font-bold text-xs uppercase tracking-wider text-brand-gold">
                  NAVIGATION MENU
                </span>
                <button onClick={() => setMobileDrawerOpen(false)} className="text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileDrawerOpen(false);
                      }}
                      className={cn(
                        'w-full py-3 px-4 rounded-xl font-heading font-bold text-xs flex items-center justify-between',
                        isActive
                          ? 'bg-brand-gold text-brand-green-dark'
                          : 'text-slate-200 hover:bg-white/10'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                logout();
              }}
              className="w-full py-3 px-4 rounded-xl bg-red-950 text-red-200 border border-red-500/30 text-xs font-heading font-bold flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};
