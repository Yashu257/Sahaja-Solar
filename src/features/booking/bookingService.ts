import { BookingProvider, BookingSlot, SolarBooking, BookingStatus } from './types';
import { BOOKING_CONFIG } from './config';
import { API_ENDPOINTS } from '@/config/api';

// Helper to save booking to localStorage for local dev synchronization with Admin panel
function saveLocalBooking(booking: SolarBooking) {
  try {
    const existingStr = localStorage.getItem('sahaja_local_bookings');
    const existingArr: SolarBooking[] = existingStr ? JSON.parse(existingStr) : [];
    existingArr.unshift(booking);
    localStorage.setItem('sahaja_local_bookings', JSON.stringify(existingArr));
  } catch (e) {
    console.error('Failed to save booking to local storage:', e);
  }
}

export class MockBookingProvider implements BookingProvider {
  private bookedSlots: Set<string> = new Set();

  async getAvailableSlots(dateStr: string): Promise<BookingSlot[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const selectedDate = new Date(dateStr);
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 0 || BOOKING_CONFIG.blockedDates.includes(dateStr)) {
      return [];
    }

    const slots: BookingSlot[] = [];
    const { startHour, endHour } = BOOKING_CONFIG.workingHours;
    const now = new Date();

    for (let hour = startHour; hour < endHour; hour++) {
      if (hour === 13) continue; // Lunch break

      const timeLabel =
        hour < 12
          ? `${hour}:00 AM`
          : hour === 12
          ? `12:00 PM`
          : `${hour - 12}:00 PM`;

      const slotKey = `${dateStr}_${timeLabel}`;
      let available = !this.bookedSlots.has(slotKey);

      const slotTime = new Date(`${dateStr}T${hour.toString().padStart(2, '0')}:00:00`);
      if (slotTime.getTime() < now.getTime() + BOOKING_CONFIG.minimumNoticeHours * 3600 * 1000) {
        available = false;
      }

      slots.push({
        time: timeLabel,
        isoString: slotTime.toISOString(),
        available,
      });
    }

    return slots;
  }

  async createBooking(
    bookingData: Omit<SolarBooking, 'id' | 'createdAt' | 'status'>
  ): Promise<{
    success: boolean;
    bookingId?: string;
    status?: BookingStatus;
    message?: string;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const slotKey = `${bookingData.date}_${bookingData.timeSlot}`;

    if (this.bookedSlots.has(slotKey)) {
      return {
        success: false,
        message: 'That specific time slot was just reserved. Please select another available slot.',
      };
    }

    this.bookedSlots.add(slotKey);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SS-2026-${randomCode}`;

    const status: BookingStatus =
      bookingData.consultationType === 'site_visit' ? 'pending_confirmation' : 'confirmed';

    const newBookingRecord: SolarBooking = {
      id: bookingId,
      ...bookingData,
      status,
      createdAt: Date.now(),
    };

    saveLocalBooking(newBookingRecord);

    return {
      success: true,
      bookingId,
      status,
      message: 'Your consultation request has been received.',
    };
  }
}

export class ApiBookingProvider implements BookingProvider {
  async getAvailableSlots(dateStr: string): Promise<BookingSlot[]> {
    try {
      const res = await fetch(`${API_ENDPOINTS.availability}?date=${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        return (data.slots || []).map((s: any) => ({
          time: s.time,
          isoString: new Date(`${dateStr} ${s.time}`).toISOString(),
          available: s.available,
        }));
      }
    } catch (e) {
      // Local dev fallback if serverless endpoint is unhosted
    }

    const mock = new MockBookingProvider();
    return mock.getAvailableSlots(dateStr);
  }

  async createBooking(
    bookingData: Omit<SolarBooking, 'id' | 'createdAt' | 'status'>
  ): Promise<{
    success: boolean;
    bookingId?: string;
    status?: BookingStatus;
    message?: string;
  }> {
    try {
      const res = await fetch(API_ENDPOINTS.bookings, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (res.ok || res.status === 409 || res.status === 400) {
        const data = await res.json();
        if (data.success && data.bookingId) {
          saveLocalBooking({
            id: data.bookingId,
            ...bookingData,
            status: data.status || 'confirmed',
            createdAt: Date.now(),
          });
        }
        return data;
      }
    } catch (e) {
      // Local dev fallback if serverless endpoint is unhosted
    }

    const mock = new MockBookingProvider();
    return mock.createBooking(bookingData);
  }
}
