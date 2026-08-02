import { PropertyType } from '@/features/solar-calculator/types';

export type ConsultationType = 'phone' | 'site_visit' | 'video';

export type BookingStatus = 'pending_confirmation' | 'confirmed' | 'cancelled';

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingSlot {
  time: string; // e.g. "10:00 AM"
  isoString: string;
  available: boolean;
}

export interface SolarBooking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyType: PropertyType;
  location: string;
  pincode?: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  consultationType: ConsultationType;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  timezone: string;
  calculatorContext?: any;
  conversationSummary?: string;
  source: string;
  consent: boolean;
  status: BookingStatus;
  createdAt: number;
}

export interface BookingProvider {
  getAvailableSlots(date: string): Promise<BookingSlot[]>;
  createBooking(bookingData: Omit<SolarBooking, 'id' | 'createdAt' | 'status'>): Promise<{
    success: boolean;
    bookingId?: string;
    status?: BookingStatus;
    message?: string;
  }>;
}
