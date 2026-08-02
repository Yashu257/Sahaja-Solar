import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { BOOKING_CONFIG } from '@/features/booking/config';

export const AdminAvailabilityPage: React.FC = () => {
  const [blockedDates, setBlockedDates] = useState<string[]>(BOOKING_CONFIG.blockedDates || []);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [noticeHours, setNoticeHours] = useState(BOOKING_CONFIG.minimumNoticeHours);
  const [advanceDays, setAdvanceDays] = useState(BOOKING_CONFIG.maximumAdvanceDays);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleAddBlockedDate = () => {
    if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
      setBlockedDates([...blockedDates, newBlockedDate]);
      setNewBlockedDate('');
      triggerSaveNotice();
    }
  };

  const handleRemoveBlockedDate = (dateStr: string) => {
    setBlockedDates(blockedDates.filter((d) => d !== dateStr));
    triggerSaveNotice();
  };

  const triggerSaveNotice = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green">
            SCHEDULE CONFIGURATION
          </span>
          <h1 className="h3 font-heading font-extrabold text-slate-900 tracking-tight">
            CONSULTATION AVAILABILITY
          </h1>
        </div>

        {savedMsg && (
          <div className="py-2 px-3 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Availability Changes Saved</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Schedule Parameters (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            DEFAULT WORKING HOURS & POLICIES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block mb-1">Timezone</span>
              <span className="font-mono font-bold text-slate-900 text-sm">Asia/Kolkata (IST)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block mb-1">Working Days</span>
              <span className="font-bold text-slate-900 text-sm">Monday — Saturday</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block mb-1">Working Hours</span>
              <span className="font-mono font-bold text-slate-900 text-sm">09:00 AM — 06:00 PM IST</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block mb-1">Slot Duration</span>
              <span className="font-mono font-bold text-brand-green text-sm">60 Minutes</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Minimum Booking Notice (Hours)
              </label>
              <input
                type="number"
                value={noticeHours}
                onChange={(e) => {
                  setNoticeHours(Number(e.target.value));
                  triggerSaveNotice();
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Maximum Advance Booking Window (Days)
              </label>
              <input
                type="number"
                value={advanceDays}
                onChange={(e) => {
                  setAdvanceDays(Number(e.target.value));
                  triggerSaveNotice();
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Right: Blocked Dates Management (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            BLOCKED / UNAVAILABLE DATES
          </h2>

          <div className="space-y-3">
            <div className="space-y-2">
              <input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
              />
              <button
                type="button"
                onClick={handleAddBlockedDate}
                disabled={!newBlockedDate}
                className="w-full py-2.5 rounded-xl bg-[#0A3328] hover:bg-[#07241C] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Add Blocked Date</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Currently Blocked ({blockedDates.length})
              </span>

              {blockedDates.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {blockedDates.map((dateStr) => (
                    <div
                      key={dateStr}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="font-mono font-bold text-slate-900">{dateStr}</span>
                      <button
                        onClick={() => handleRemoveBlockedDate(dateStr)}
                        className="text-red-600 hover:text-red-800 p-1"
                        aria-label="Remove blocked date"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-mono">No dates currently blocked.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
