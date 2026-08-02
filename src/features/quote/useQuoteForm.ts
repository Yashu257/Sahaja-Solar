import { useState, useEffect } from 'react';
import { PropertyType } from '@/features/solar-calculator/types';
import { SolarQuoteRequest } from './types';
import { ApiQuoteProvider } from './quoteService';
import { useAssistant } from '@/features/solar-assistant/AssistantContext';
import { SAHAJA_COMPANY_INFO } from '@/data/siteConfig';

// PRODUCTION: Use real API provider
const quoteProvider = new ApiQuoteProvider();

export const useQuoteForm = () => {
  const { lead } = useAssistant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [location, setLocation] = useState('');
  const [monthlyBill, setMonthlyBill] = useState<string>('');
  const [interestedCapacityKw, setInterestedCapacityKw] = useState<string>('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  // Auto pre-fill from Assistant / Calculator lead context
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

  // Generate WhatsApp click-to-chat URL with smart pre-filled message
  const getWhatsAppUrl = (customQuoteId?: string) => {
    const primaryPhone = SAHAJA_COMPANY_INFO.contacts[0].rawPhone; // 8019604025

    let msgText = "Hi Sahaja Solar, I'm interested in rooftop solar for my property and would like a quote consultation.";

    if (customQuoteId) {
      msgText = `Hi Sahaja Solar, I just submitted a quote request on your website. My enquiry reference is ${customQuoteId}.`;
    } else if (monthlyBill || interestedCapacityKw) {
      msgText = `Hi Sahaja Solar, I'm interested in solar for my ${propertyType} property in ${location || 'Andhra Pradesh'}.${
        monthlyBill ? ` Average bill: ₹${monthlyBill}.` : ''
      }${interestedCapacityKw ? ` Interested capacity: ${interestedCapacityKw} kW.` : ''}`;
    }

    return `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(msgText)}`;
  };

  const validateForm = (): boolean => {
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return false;
    }

    if (!location.trim()) {
      setErrorMsg('Please enter your city or district in Andhra Pradesh.');
      return false;
    }

    if (!consent) {
      setErrorMsg('Please accept the consent checkbox to proceed.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);

      const payload: Omit<SolarQuoteRequest, 'id' | 'createdAt' | 'status'> = {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        propertyType,
        location: location.trim(),
        monthlyBill: monthlyBill ? Number(monthlyBill) : undefined,
        interestedCapacityKw: interestedCapacityKw ? Number(interestedCapacityKw) : undefined,
        message: message.trim() || undefined,
        source: 'website_quote_section',
        consent,
      };

      const res = await quoteProvider.submitQuote(payload);

      if (!res.success) {
        setErrorMsg(res.message || 'Quote submission failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmittedQuoteId(res.quoteId!);
    } catch (err) {
      setErrorMsg('A network error occurred. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    monthlyBill,
    setMonthlyBill,
    interestedCapacityKw,
    setInterestedCapacityKw,
    message,
    setMessage,
    consent,
    setConsent,
    isSubmitting,
    errorMsg,
    submittedQuoteId,
    getWhatsAppUrl,
    handleSubmit,
  };
};
