import React, { useState } from 'react';
import { Search, Download, Phone, MessageCircle, Mail, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLeadsPageProps {
  leads: any[];
  onUpdateStatus: (id: string, newStatus: string) => void;
  onAddNote: (id: string, noteText: string) => void;
}

export const AdminLeadsPage: React.FC<AdminLeadsPageProps> = ({
  leads,
  onUpdateStatus,
  onAddNote,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || lead.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // CSV Export with formula injection safeguards
  const handleExportCSV = () => {
    const headers = ['Reference', 'Customer Name', 'Phone', 'Email', 'Property Type', 'Location', 'Monthly Bill', 'Capacity kW', 'Status', 'Created At'];
    const rows = filteredLeads.map((l) => [
      l.id,
      sanitizeCsvCell(l.name),
      sanitizeCsvCell(l.phone),
      sanitizeCsvCell(l.email || ''),
      l.propertyType,
      sanitizeCsvCell(l.location),
      l.monthlyBill || '',
      l.interestedCapacityKw || '',
      l.status,
      new Date(l.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sahaja_solar_leads_${new Date().toISOString().split('T')[0]}.csv`);
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
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green">
            LEAD MANAGEMENT
          </span>
          <h1 className="h3 font-heading font-extrabold text-slate-900 tracking-tight">
            SOLAR QUOTE LEADS
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
            placeholder="Search by name, phone, reference ID, or location..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-body text-slate-900 focus:outline-none focus:border-brand-green"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 text-xs">
          {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'QUOTED', 'CLOSED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-lg font-heading font-bold transition-all text-xs',
                statusFilter === st
                  ? 'bg-[#0A3328] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-heading font-bold text-slate-500 uppercase tracking-wider">
              <th className="p-4">Reference</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Property & Location</th>
              <th className="p-4">Bill / Capacity</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-brand-green">{lead.id}</td>
                <td className="p-4 font-bold text-slate-900">{lead.name}</td>
                <td className="p-4 font-mono text-slate-700">+91 {lead.phone}</td>
                <td className="p-4 uppercase text-slate-700">
                  {lead.propertyType} • {lead.location}
                </td>
                <td className="p-4 text-slate-700 font-mono">
                  {lead.monthlyBill ? `₹${lead.monthlyBill}` : 'N/A'} • {lead.interestedCapacityKw ? `${lead.interestedCapacityKw} kW` : 'N/A'}
                </td>
                <td className="p-4">
                  <span
                    className={cn(
                      'px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider',
                      lead.status === 'new'
                        ? 'bg-emerald-100 text-emerald-800'
                        : lead.status === 'contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-800'
                    )}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (360px–430px) */}
      <div className="md:hidden space-y-3">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-brand-green text-xs">{lead.id}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                {lead.status}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{lead.name}</h3>
              <p className="text-xs text-slate-500 font-mono">+91 {lead.phone}</p>
              <p className="text-xs text-slate-600 uppercase mt-1">
                {lead.propertyType} • {lead.location}
              </p>
            </div>
            <button
              onClick={() => setSelectedLead(lead)}
              className="w-full py-2 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end p-0 sm:p-4">
          <div className="w-full sm:w-[500px] bg-white h-full sm:rounded-2xl border border-slate-200 shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="font-mono font-bold text-brand-green text-xs block">{selectedLead.id}</span>
                <h2 className="font-heading font-extrabold text-lg text-slate-900">{selectedLead.name}</h2>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Customer Action Bar */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${selectedLead.phone}`}
                className="py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/91${selectedLead.phone}?text=${encodeURIComponent(
                  `Hi ${selectedLead.name}, this is Sahaja Solar regarding your enquiry (${selectedLead.id}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${selectedLead.email || 'sahajasolar@gmail.com'}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>

            {/* Status Update Control */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Update Lead Status
              </label>
              <select
                value={selectedLead.status}
                onChange={(e) => {
                  onUpdateStatus(selectedLead.id, e.target.value);
                  setSelectedLead({ ...selectedLead, status: e.target.value });
                }}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
              >
                <option value="new">NEW</option>
                <option value="contacted">CONTACTED</option>
                <option value="qualified">QUALIFIED</option>
                <option value="quoted">QUOTED</option>
                <option value="closed">CLOSED</option>
              </select>
            </div>

            {/* Enquiry Context */}
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 uppercase">ENQUIRY SPECIFICATIONS</h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between"><span className="text-slate-500">Property:</span><span className="font-bold uppercase">{selectedLead.propertyType}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Location:</span><span className="font-bold">{selectedLead.location}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Monthly Bill:</span><span className="font-bold text-brand-green">₹ {selectedLead.monthlyBill || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Capacity:</span><span className="font-bold text-brand-green">{selectedLead.interestedCapacityKw ? `${selectedLead.interestedCapacityKw} kW` : 'N/A'}</span></div>
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 uppercase">INTERNAL ADMIN NOTES</h3>
              <div className="space-y-2">
                {(selectedLead.notes || []).map((n: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs">
                    <p>{n.text}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add internal note..."
                  className="flex-grow bg-white border border-slate-300 rounded-xl p-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newNoteText.trim()) {
                      onAddNote(selectedLead.id, newNoteText.trim());
                      const updatedNotes = [...(selectedLead.notes || []), { text: newNoteText.trim(), createdAt: Date.now() }];
                      setSelectedLead({ ...selectedLead, notes: updatedNotes });
                      setNewNoteText('');
                    }
                  }}
                  className="px-4 rounded-xl bg-brand-green text-white font-bold text-xs"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
