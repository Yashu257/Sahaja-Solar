import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useBookingState } from '../useBookingState';
import { BOOKING_CONFIG } from '../config';
import {
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Home as HomeIcon,
  Building2,
  CheckCircle2,
  AlertCircle,
  Edit2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const BookingSection: React.FC = () => {
  const {
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
    pincode: _pincode,
    setPincode: _setPincode,
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
    nextStep,
    prevStep,
    submitBooking,
  } = useBookingState();

  const todayStr = new Date().toISOString().split('T')[0];

  const STEPS = [
    { num: 1, label: 'DETAILS' },
    { num: 2, label: 'PROPERTY' },
    { num: 3, label: 'TYPE' },
    { num: 4, label: 'SCHEDULE' },
    { num: 5, label: 'CONFIRM' },
  ];

  return (
    <Section id="booking" className="py-24 md:py-36 bg-surface-bg text-content-primary relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-brand-green/5 blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* Asymmetric Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-subtle animate-pulse" />
              <span className="label-tag text-brand-green font-bold tracking-widest">
                11 — BOOK A CONSULTATION
              </span>
            </div>

            <h2 className="display-heading text-content-primary tracking-tight">
              LET'S TALK <br />
              ABOUT YOUR <span className="text-brand-green">SOLAR REQUIREMENTS.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-md flex flex-col justify-between gap-4"
          >
            <p className="body-large text-content-secondary leading-relaxed">
              Choose a convenient consultation time and tell us a little about your property. The Sahaja Solar team can then discuss suitable next steps with you.
            </p>

            <span className="text-xs text-content-muted font-medium">
              Free consultation • IST timezone • No obligation
            </span>
          </motion.div>
        </div>

        {/* If Booking is Confirmed: Render Success Receipt State */}
        {confirmedBooking ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-surface-card rounded-card border border-brand-green/30 shadow-2xl p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-brand-green text-brand-gold flex items-center justify-center mx-auto mb-6 shadow-gold-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-green bg-brand-green-light px-3.5 py-1 rounded-full inline-block mb-3">
              BOOKING REF: {confirmedBooking.bookingId}
            </span>

            <h3 className="h2 font-heading font-bold text-content-primary mb-3">
              CONSULTATION REQUEST RECEIVED
            </h3>

            <p className="body-main text-content-secondary max-w-lg mx-auto mb-8 leading-relaxed">
              Thank you, {name}. The Sahaja Solar engineering team has received your request and will contact you to review your requirements.
            </p>

            {/* Summary Box */}
            <div className="p-6 rounded-2xl bg-surface-muted border border-surface-border text-left space-y-3 mb-8 text-xs">
              <div className="flex justify-between border-b border-surface-border pb-2">
                <span className="text-content-muted">Consultation Type:</span>
                <span className="font-bold text-content-primary uppercase">
                  {consultationType === 'phone' ? 'Phone Consultation' : 'Site Visit Request'}
                </span>
              </div>
              <div className="flex justify-between border-b border-surface-border pb-2">
                <span className="text-content-muted">Requested Schedule:</span>
                <span className="font-bold text-brand-green">
                  {selectedDate} at {selectedSlot} IST
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-muted">Property Location:</span>
                <span className="font-bold text-content-primary">{location}</span>
              </div>
            </div>

            {/* Direct Phone Numbers */}
            <div className="p-4 rounded-xl bg-surface-bg border border-surface-border mb-8 text-xs text-content-secondary flex flex-wrap items-center justify-center gap-4">
              <span>Immediate questions? Call:</span>
              <a href="tel:8019604025" className="font-bold text-brand-green hover:underline">
                M. Sivaraj (+91 80196 04025)
              </a>
              <span>•</span>
              <a href="tel:7416202494" className="font-bold text-brand-green hover:underline">
                K. Venkateswararao (+91 74162 02494)
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Back to Home
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  const target = document.querySelector('#projects');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Projects
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Multi-Step Guided Booking Form */
          <div className="max-w-4xl mx-auto bg-surface-card rounded-card border border-surface-border shadow-2xl overflow-hidden p-6 sm:p-8 md:p-12">
            {/* Desktop Progress Bar (Hidden on Mobile) */}
            <div className="hidden sm:flex items-center justify-between mb-12 border-b border-surface-border pb-6">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className={cn(
                    'flex items-center gap-2 text-xs font-heading font-bold transition-colors',
                    currentStep === step.num
                      ? 'text-brand-green'
                      : currentStep > step.num
                      ? 'text-brand-gold'
                      : 'text-content-muted'
                  )}
                >
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all',
                      currentStep === step.num
                        ? 'bg-brand-green text-white shadow-subtle'
                        : currentStep > step.num
                        ? 'bg-brand-gold text-brand-green-dark'
                        : 'bg-surface-muted text-content-muted'
                    )}
                  >
                    {step.num}
                  </div>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>

            {/* Mobile Progress Bar (Shown on Mobile) */}
            <div className="sm:hidden flex items-center justify-between mb-8 pb-4 border-b border-surface-border">
              <span className="text-xs font-mono font-bold text-brand-green uppercase tracking-wider">
                STEP {currentStep} OF 5 — {STEPS[currentStep - 1].label}
              </span>
              <div className="flex gap-1">
                {STEPS.map((step) => (
                  <div
                    key={step.num}
                    className={cn(
                      'w-5 h-1.5 rounded-full transition-all',
                      currentStep >= step.num ? 'bg-brand-green' : 'bg-surface-border'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Validation Error Message */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: YOUR DETAILS */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="h3 font-heading font-bold text-content-primary mb-1">01 — YOUR DETAILS</h3>
                  <p className="small-text text-content-secondary">Please enter your primary contact details.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-content-muted absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-surface-muted rounded-xl border border-surface-border py-2.5 pl-10 pr-4 text-xs sm:text-sm text-content-primary focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-1.5">
                      10-Digit Mobile Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-content-muted absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-surface-muted rounded-xl border border-surface-border py-2.5 pl-10 pr-4 text-xs sm:text-sm text-content-primary focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-content-muted absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full bg-surface-muted rounded-xl border border-surface-border py-2.5 pl-10 pr-4 text-xs sm:text-sm text-content-primary focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: YOUR PROPERTY */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="h3 font-heading font-bold text-content-primary mb-1">02 — YOUR PROPERTY</h3>
                  <p className="small-text text-content-secondary">Tell us about your property location and energy requirements.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-2">
                      Property Type *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPropertyType('residential')}
                        className={cn(
                          'py-3 px-4 rounded-xl border text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-2',
                          propertyType === 'residential'
                            ? 'bg-brand-green text-white border-brand-green shadow-subtle'
                            : 'bg-surface-muted text-content-secondary border-surface-border'
                        )}
                      >
                        <HomeIcon className="w-4 h-4" />
                        <span>Residential</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPropertyType('commercial')}
                        className={cn(
                          'py-3 px-4 rounded-xl border text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-2',
                          propertyType === 'commercial'
                            ? 'bg-brand-green text-white border-brand-green shadow-subtle'
                            : 'bg-surface-muted text-content-secondary border-surface-border'
                        )}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Commercial</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-1.5">
                      Property City / District in Andhra Pradesh *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-content-muted absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Vijayawada, Krishna District"
                        className="w-full bg-surface-muted rounded-xl border border-surface-border py-2.5 pl-10 pr-4 text-xs sm:text-sm text-content-primary focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-1.5">
                        Average Monthly Bill (₹ Optional)
                      </label>
                      <input
                        type="number"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(e.target.value)}
                        placeholder="e.g. 5000"
                        className="w-full bg-surface-muted rounded-xl border border-surface-border p-2.5 text-xs sm:text-sm text-content-primary focus:outline-none focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-1.5">
                        System Capacity in Mind (kW Optional)
                      </label>
                      <input
                        type="number"
                        value={interestedCapacityKw}
                        onChange={(e) => setInterestedCapacityKw(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full bg-surface-muted rounded-xl border border-surface-border p-2.5 text-xs sm:text-sm text-content-primary focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONSULTATION TYPE */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="h3 font-heading font-bold text-content-primary mb-1">03 — CONSULTATION TYPE</h3>
                  <p className="small-text text-content-secondary">Choose how you would like to connect with Sahaja Solar.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BOOKING_CONFIG.consultationTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setConsultationType(type.id)}
                      className={cn(
                        'p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[180px]',
                        consultationType === type.id
                          ? 'border-brand-green bg-brand-green-light/40 shadow-subtle'
                          : 'border-surface-border bg-surface-muted hover:border-surface-border/80'
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-heading font-bold text-sm text-content-primary">{type.title}</span>
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full border flex items-center justify-center',
                              consultationType === type.id
                                ? 'border-brand-green bg-brand-green text-white'
                                : 'border-surface-border'
                            )}
                          >
                            {consultationType === type.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                        <p className="text-xs text-content-secondary leading-relaxed mb-4">{type.description}</p>
                      </div>

                      <span className="text-[10px] font-mono text-content-muted">{type.note}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: DATE & TIME */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="h3 font-heading font-bold text-content-primary mb-1">04 — DATE & TIME</h3>
                  <p className="small-text text-content-secondary">Select your preferred date and time slot (IST).</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-2">
                      Select Preferred Date (Mon - Sat)
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={todayStr}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-surface-muted rounded-xl border border-surface-border p-3 text-xs sm:text-sm text-content-primary font-mono focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block mb-2">
                      Available Time Slots (IST)
                    </label>

                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={cn(
                              'py-3 px-3 rounded-xl border text-xs font-heading font-bold transition-all text-center flex items-center justify-center gap-1.5',
                              !slot.available
                                ? 'opacity-40 bg-surface-muted text-content-muted border-surface-border cursor-not-allowed line-through'
                                : selectedSlot === slot.time
                                ? 'bg-brand-green text-white border-brand-green shadow-subtle'
                                : 'bg-surface-card text-content-primary border-surface-border hover:border-brand-green'
                            )}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-surface-muted border border-surface-border text-center text-xs text-content-muted">
                        No slots available for this date (Sundays or holidays). Please select another date.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: REVIEW & CONFIRM */}
            {currentStep === 5 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="h3 font-heading font-bold text-content-primary mb-1">05 — REVIEW YOUR REQUEST</h3>
                  <p className="small-text text-content-secondary">Please review your consultation details before confirming.</p>
                </div>

                <div className="p-6 rounded-2xl bg-surface-muted border border-surface-border space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-surface-border pb-3">
                    <div>
                      <span className="text-content-muted block text-[10px]">Contact Person</span>
                      <span className="font-bold text-content-primary text-sm">{name} ({phone})</span>
                      {email && <span className="text-content-muted block">{email}</span>}
                    </div>
                    <button type="button" onClick={() => setCurrentStep(1)} className="text-brand-green hover:underline flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-b border-surface-border pb-3">
                    <div>
                      <span className="text-content-muted block text-[10px]">Property & Location</span>
                      <span className="font-bold text-content-primary uppercase">{propertyType} • {location}</span>
                    </div>
                    <button type="button" onClick={() => setCurrentStep(2)} className="text-brand-green hover:underline flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-b border-surface-border pb-3">
                    <div>
                      <span className="text-content-muted block text-[10px]">Consultation Type</span>
                      <span className="font-bold text-content-primary uppercase">{consultationType === 'phone' ? 'Phone Consultation' : 'Site Visit Request'}</span>
                    </div>
                    <button type="button" onClick={() => setCurrentStep(3)} className="text-brand-green hover:underline flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-content-muted block text-[10px]">Requested Date & Time</span>
                      <span className="font-bold text-brand-green text-sm">{selectedDate} at {selectedSlot} IST</span>
                    </div>
                    <button type="button" onClick={() => setCurrentStep(4)} className="text-brand-green hover:underline flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-card border border-surface-border text-xs text-content-secondary">
                  <input
                    type="checkbox"
                    id="consent-check"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-brand-green border-surface-border rounded focus:ring-brand-green"
                  />
                  <label htmlFor="consent-check" className="cursor-pointer leading-relaxed">
                    By submitting this request, I agree that Sahaja Solar may contact me regarding my solar enquiry and consultation.
                  </label>
                </div>
              </motion.div>
            )}

            {/* Footer Navigation Buttons */}
            <div className="pt-8 mt-8 border-t border-surface-border flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <Button variant="secondary" size="md" onClick={prevStep} disabled={isSubmitting}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <Button variant="primary" size="md" onClick={nextStep} showArrow>
                  Continue
                </Button>
              ) : (
                <Button
                  variant="solar"
                  size="lg"
                  showArrow
                  disabled={isSubmitting || !consent}
                  onClick={submitBooking}
                  className="shadow-gold-glow"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Consultation'}
                </Button>
              )}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};
