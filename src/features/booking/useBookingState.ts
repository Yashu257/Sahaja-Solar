import { useState, useEffect } from 'react';
import {
  BookingStep,
  ConsultationType,
  SolarBooking,
  BookingSlot,
  BookingStatus,
} from './types';
import { PropertyType } from '@/features/solar-calculator/types';
import { BOOKING_CONFIG } from './config';
import { ApiBookingProvider } from './bookingService';
import { useAssistant } from '@/features/solar-assistant/AssistantContext';

// PRODUCTION: Use real API provider
const bookingProvider = new ApiBookingProvider();

export const useBookingState = () => {
  const { lead } = useAssistant();

  const [currentStep, setCurrentStep] = useState<BookingStep>(1);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [monthlyBill, setMonthlyBill] = useState<string>('');
  const [interestedCapacityKw, setInterestedCapacityKw] = useState<string>('');

  const [consultationType, setConsultationType] = useState<ConsultationType>('phone');

  // Date & Slot Selection
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);

  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Success state
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingId: string;
    status: BookingStatus;
  } | null>(null);

  // Auto-prefill lead details from AI Assistant if available
  useEffect(() => {
    if (lead) {
      if (lead.name && !name) setName(lead.name);
      if (lead.phone && !phone) setPhone(lead.phone);
      if (lead.email && !email) setEmail(lead.email);
      if (lead.propertyType) setPropertyType(lead.propertyType);
      if (lead.location && !location) setLocation(lead.location);
      if (lead.monthlyBill) setMonthlyBill(lead.monthlyBill.toString());
      if (lead.interestedCapacityKw) setInterestedCapacityKw(lead.interestedCapacityKw.toString());
    }
  }, [lead]);

  // Fetch available slots whenever selectedDate changes
  useEffect(() => {
    let active = true;
    bookingProvider.getAvailableSlots(selectedDate).then((slots) => {
      if (active) {
        setAvailableSlots(slots);
        // Pre-select first available slot if previous is unselectable
        const firstAvail = slots.find((s) => s.available);
        setSelectedSlot(firstAvail ? firstAvail.time : '');
      }
    });
    return () => {
      active = false;
    };
  }, [selectedDate]);

  // Validation per step
  const validateStep = (step: BookingStep): boolean => {
    setErrorMsg(null);

    if (step === 1) {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return false;
      }
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        return false;
      }
    }

    if (step === 2) {
      if (!location.trim()) {
        setErrorMsg('Please enter your property city or district in Andhra Pradesh.');
        return false;
      }
    }

    if (step === 4) {
      if (!selectedDate) {
        setErrorMsg('Please select a preferred date.');
        return false;
      }
      if (!selectedSlot) {
        setErrorMsg('Please select an available time slot.');
        return false;
      }
    }

    if (step === 5) {
      if (!consent) {
        setErrorMsg('Please accept the consent terms to proceed with submission.');
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5) as BookingStep);
    }
  };

  const prevStep = () => {
    setErrorMsg(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1) as BookingStep);
  };

  const submitBooking = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);

      const payload: Omit<SolarBooking, 'id' | 'createdAt' | 'status'> = {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        propertyType,
        location: location.trim(),
        pincode: pincode.trim() || undefined,
        monthlyBill: monthlyBill ? Number(monthlyBill) : undefined,
        interestedCapacityKw: interestedCapacityKw ? Number(interestedCapacityKw) : undefined,
        consultationType,
        date: selectedDate,
        timeSlot: selectedSlot,
        timezone: BOOKING_CONFIG.timezone,
        source: 'website_booking_section',
        consent,
      };

      const res = await bookingProvider.createBooking(payload);

      if (!res.success) {
        setErrorMsg(res.message || 'Booking submission failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking({
        bookingId: res.bookingId!,
        status: res.status!,
      });
    } catch (err) {
      setErrorMsg('A network error occurred. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    propertyType,
    setPropertyType,
    location,
    setLocation,
    pincode,
    setPincode,
    monthlyBill,
    setMonthlyBill,
    interestedCapacityKw,
    setInterestedCapacityKw,
    consultationType,
    setConsultationType,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    availableSlots,
    consent,
    setConsent,
    isSubmitting,
    errorMsg,
    confirmedBooking,
    validateStep,
    nextStep,
    prevStep,
    submitBooking,
  };
};
