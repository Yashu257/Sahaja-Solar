import React, { useState } from 'react';
import { Search, Download, Phone, MessageCircle, Mail, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminBookingsPageProps {
  bookings: any[];
  onUpdateStatus: (id: string, newStatus: string) => void;
}

export const AdminBookingsPage: React.FC<AdminBookingsPageProps> = ({
  bookings,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Customer Name', 'Phone', 'Email', 'Consultation Type', 'Property', 'Location', 'Date', 'Time Slot (IST)', 'Status', 'Created At'];
    const rows = filteredBookings.map((b) => [
      b.id,
      sanitizeCsvCell(b.name),
      sanitizeCsvCell(b.phone),
      sanitizeCsvCell(b.email || ''),
      b.consultationType,
      b.propertyType,
      sanitizeCsvCell(b.location),
      b.date,
      b.timeSlot,
      b.status,
      new Date(b.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sahaja_solar_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sanitizeCsvCell = (val: string) => {
    if (!val) return '';
    let cleaned = val.replace(/"/g, '""');
    if (['=', '+', '-', '@'].includes(cleaned.charAt(0))) {
      cleaned = `'${cleaned}`;
    }
    return `"${cleaned}"`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green">
            SCHEDULE MANAGEMENT
          </span>
          <h1 className="h3 font-heading font-extrabold text-slate-900 tracking-tight">
            CONSULTATION BOOKINGS
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-brand-gold" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone, booking ID..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-none focus:border-brand-green"
          />
        </div>

        <div className="flex gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 text-xs">
          {['ALL', 'CONFIRMED', 'PENDING_CONFIRMATION', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-lg font-heading font-bold transition-all text-xs',
                statusFilter === st ? 'bg-[#0A3328] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-heading font-bold text-slate-500 uppercase tracking-wider">
              <th className="p-4">Booking ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Consultation Type</th>
              <th className="p-4">Schedule (IST)</th>
              <th className="p-4">Property</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredBookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-brand-green">{b.id}</td>
                <td className="p-4 font-bold text-slate-900">{b.name}</td>
                <td className="p-4 uppercase text-slate-700 font-bold">
                  {b.consultationType === 'phone' ? 'Phone Consultation' : 'Site Visit Request'}
                </td>
                <td className="p-4 font-mono font-bold text-slate-900">
                  {b.date} at {b.timeSlot}
                </td>
                <td className="p-4 uppercase text-slate-600">{b.propertyType} • {b.location}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {filteredBookings.map((b) => (
          <div key={b.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-brand-green text-xs">{b.id}</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                {b.status}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{b.name}</h3>
              <p className="text-xs font-mono text-slate-700">{b.date} at {b.timeSlot} IST</p>
              <p className="text-xs text-slate-500 uppercase mt-1">
                {b.consultationType === 'phone' ? 'Phone Call' : 'Site Visit Request'} • {b.location}
              </p>
            </div>
            <button
              onClick={() => setSelectedBooking(b)}
              className="w-full py-2 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end p-0 sm:p-4">
          <div className="w-full sm:w-[500px] bg-white h-full sm:rounded-2xl border border-slate-200 shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="font-mono font-bold text-brand-green text-xs block">{selectedBooking.id}</span>
                <h2 className="font-heading font-extrabold text-lg text-slate-900">{selectedBooking.name}</h2>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="p-2 text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Customer Actions */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${selectedBooking.phone}`}
                className="py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/91${selectedBooking.phone}?text=${encodeURIComponent(
                  `Hi ${selectedBooking.name}, this is Sahaja Solar regarding your booking (${selectedBooking.id}) for ${selectedBooking.date} at ${selectedBooking.timeSlot} IST.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${selectedBooking.email || 'sahajasolar@gmail.com'}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>

            {/* Status Update Control */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Update Booking Status
              </label>
              <select
                value={selectedBooking.status}
                onChange={(e) => {
                  onUpdateStatus(selectedBooking.id, e.target.value);
                  setSelectedBooking({ ...selectedBooking, status: e.target.value });
                }}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
              >
                <option value="pending_confirmation">PENDING CONFIRMATION</option>
                <option value="confirmed">CONFIRMED</option>
                <option value="cancelled">CANCELLED</option>
              </select>
            </div>

            {/* Booking Details */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Consultation Type:</span><span className="font-bold uppercase">{selectedBooking.consultationType}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Requested Schedule:</span><span className="font-bold text-brand-green">{selectedBooking.date} at {selectedBooking.timeSlot} IST</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Location:</span><span className="font-bold">{selectedBooking.location}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Property:</span><span className="font-bold uppercase">{selectedBooking.propertyType}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
