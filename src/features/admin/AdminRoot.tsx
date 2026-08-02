import React, { useState, useEffect } from 'react';
import { AdminAuthProviderComponent, useAdminAuth } from './AdminAuthContext';
import { AdminLayout, AdminTab } from './components/AdminLayout';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLeadsPage } from './pages/AdminLeadsPage';
import { AdminBookingsPage } from './pages/AdminBookingsPage';
import { AdminAvailabilityPage } from './pages/AdminAvailabilityPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

function getLocalLeads() {
  try {
    const str = localStorage.getItem('sahaja_local_quotes');
    return str ? JSON.parse(str) : [];
  } catch (e) {
    return [];
  }
}

function getLocalBookings() {
  try {
    const str = localStorage.getItem('sahaja_local_bookings');
    return str ? JSON.parse(str) : [];
  } catch (e) {
    return [];
  }
}

const AdminContent: React.FC = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [leads, setLeads] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [_loadingData, setLoadingData] = useState(false);

  // Fetch database records or load local submissions
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    let active = true;
    setLoadingData(true);

    const fetchAdminData = async () => {
      let loadedLeads: any[] = [];
      let loadedBookings: any[] = [];

      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [leadsRes, bookingsRes] = await Promise.all([
          fetch('/api/admin/leads', { headers }),
          fetch('/api/admin/bookings', { headers }),
        ]);

        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          if (leadsData.leads && leadsData.leads.length > 0) {
            loadedLeads = leadsData.leads;
          }
        }

        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          if (bookingsData.bookings && bookingsData.bookings.length > 0) {
            loadedBookings = bookingsData.bookings;
          }
        }
      } catch (err) {
        // Local dev mode fallback when serverless route is not hosted
      }

      // Merge local storage submissions so every local booking/quote appears immediately
      const localL = getLocalLeads();
      const localB = getLocalBookings();

      const combinedLeads = [...loadedLeads];
      localL.forEach((ll: any) => {
        if (!combinedLeads.some((c) => c.id === ll.id || c.reference === ll.id)) {
          combinedLeads.push(ll);
        }
      });

      const combinedBookings = [...loadedBookings];
      localB.forEach((lb: any) => {
        if (!combinedBookings.some((c) => c.id === lb.id || c.reference === lb.id)) {
          combinedBookings.push(lb);
        }
      });

      if (active) {
        setLeads(combinedLeads);
        setBookings(combinedBookings);
        setLoadingData(false);
      }
    };

    fetchAdminData();

    return () => {
      active = false;
    };
  }, [isAuthenticated, token]);

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
      try {
        localStorage.setItem('sahaja_local_quotes', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (!token) return;

    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reference: id,
          action: 'update_status',
          status: newStatus,
        }),
      });
    } catch (e) {}
  };

  const handleAddLeadNote = async (id: string, noteText: string) => {
    const newNote = { text: noteText, createdAt: Date.now() };

    setLeads((prev) => {
      const updated = prev.map((l) => {
        if (l.id === id) {
          const notes = l.notes || [];
          return { ...l, notes: [...notes, newNote] };
        }
        return l;
      });
      try {
        localStorage.setItem('sahaja_local_quotes', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (!token) return;

    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reference: id,
          action: 'add_note',
          noteText,
          author: 'Staff',
        }),
      });
    } catch (e) {}
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
      try {
        localStorage.setItem('sahaja_local_bookings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (!token) return;

    try {
      await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reference: id,
          status: newStatus,
        }),
      });
    } catch (e) {}
  };

  const handleClearAllData = () => {
    try {
      localStorage.removeItem('sahaja_local_bookings');
      localStorage.removeItem('sahaja_local_quotes');
    } catch (e) {}
    setLeads([]);
    setBookings([]);
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'overview' && (
        <AdminDashboardPage
          onNavigateTab={setActiveTab}
          mockLeads={leads}
          mockBookings={bookings}
          onClearData={handleClearAllData}
        />
      )}
      {activeTab === 'leads' && (
        <AdminLeadsPage
          leads={leads}
          onUpdateStatus={handleUpdateLeadStatus}
          onAddNote={handleAddLeadNote}
        />
      )}
      {activeTab === 'bookings' && (
        <AdminBookingsPage
          bookings={bookings}
          onUpdateStatus={handleUpdateBookingStatus}
        />
      )}
      {activeTab === 'availability' && <AdminAvailabilityPage />}
      {activeTab === 'settings' && <AdminSettingsPage onClearData={handleClearAllData} />}
    </AdminLayout>
  );
};

export const AdminRoot: React.FC = () => {
  return (
    <AdminAuthProviderComponent>
      <AdminContent />
    </AdminAuthProviderComponent>
  );
};

export default AdminRoot;
