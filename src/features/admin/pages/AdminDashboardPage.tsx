import React from 'react';
import { Users, CalendarDays, Clock, CheckCircle2, ArrowRight, Trash2 } from 'lucide-react';
import { AdminTab } from '../components/AdminLayout';

interface AdminDashboardPageProps {
  onNavigateTab: (tab: AdminTab) => void;
  mockLeads: any[];
  mockBookings: any[];
  onClearData?: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigateTab,
  mockLeads,
  mockBookings,
  onClearData,
}) => {
  const newLeadsCount = mockLeads.filter((l) => l.status === 'new' || !l.status).length;
  const activeBookingsCount = mockBookings.filter((b) => b.status !== 'cancelled').length;
  const pendingSiteVisitsCount = mockBookings.filter((b) => b.status === 'pending_confirmation' || b.consultationType === 'site_visit').length;

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green">
            OPERATIONAL OVERVIEW
          </span>
          <h1 className="h3 font-heading font-extrabold text-slate-900 tracking-tight">
            GOOD DAY, SAHAJA TEAM
          </h1>
          <p className="text-xs text-slate-500">
            Real-time lead enquiries and consultation booking activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onClearData && (mockLeads.length > 0 || mockBookings.length > 0) && (
            <button
              onClick={onClearData}
              className="py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-heading font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Clear all stored test entries"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Clear Test Data ({mockLeads.length + mockBookings.length})</span>
            </button>
          )}

          <button
            onClick={() => onNavigateTab('leads')}
            className="py-2.5 px-4 rounded-xl bg-[#0A3328] hover:bg-[#07241C] text-white font-heading font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <Users className="w-4 h-4 text-brand-gold" />
            <span>Manage Leads</span>
          </button>
          <button
            onClick={() => onNavigateTab('bookings')}
            className="py-2.5 px-4 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-heading font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <CalendarDays className="w-4 h-4 text-slate-950" />
            <span>Manage Bookings ({mockBookings.length})</span>
          </button>
        </div>
      </div>

      {/* Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-heading font-bold uppercase tracking-wider">NEW QUOTE LEADS</span>
            <Users className="w-5 h-5 text-brand-green" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-slate-900">{newLeadsCount}</div>
          <p className="text-[10px] text-slate-500 font-mono">Requires initial review</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-heading font-bold uppercase tracking-wider">UPCOMING BOOKINGS</span>
            <CalendarDays className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-slate-900">{activeBookingsCount}</div>
          <p className="text-[10px] text-slate-500 font-mono">Scheduled IST consultations</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-heading font-bold uppercase tracking-wider">PENDING SITE VISITS</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-slate-900">{pendingSiteVisitsCount}</div>
          <p className="text-[10px] text-slate-500 font-mono">Requires site visit confirmation</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-heading font-bold uppercase tracking-wider">TOTAL INQUIRIES</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-heading font-extrabold text-slate-900">{mockLeads.length + mockBookings.length}</div>
          <p className="text-[10px] text-slate-500 font-mono">Active database records</p>
        </div>
      </div>

      {/* Recent Activity Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quote Leads */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-sm text-slate-900">RECENT QUOTE ENQUIRIES</h2>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs text-brand-green font-bold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {mockLeads.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 font-mono">No quote enquiries captured yet.</div>
            ) : (
              mockLeads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{lead.name}</span>
                    <span className="text-slate-500 block uppercase text-[10px]">
                      {lead.propertyType || 'Residential'} • {lead.location}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-brand-green block">{lead.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                      {lead.status || 'new'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-sm text-slate-900">UPCOMING CONSULTATIONS ({mockBookings.length})</h2>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-xs text-brand-green font-bold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {mockBookings.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 font-mono">No bookings captured yet.</div>
            ) : (
              mockBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{booking.name}</span>
                    <span className="text-slate-500 block uppercase text-[10px]">
                      {booking.consultationType === 'phone' ? 'Phone Call' : 'Site Visit Request'} • {booking.location || 'AP'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-slate-700 block">{booking.date} at {booking.timeSlot}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase">
                      {booking.status || 'confirmed'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
