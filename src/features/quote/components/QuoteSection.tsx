import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useQuoteForm } from '../useQuoteForm';
import { SAHAJA_COMPANY_INFO } from '@/data/siteConfig';
import {
  MessageCircle,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Home as HomeIcon,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const QuoteSection: React.FC = () => {
  const {
    name,
    setName,
    phone,
    setPhone,
    email: _email,
    setEmail: _setEmail,
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
  } = useQuoteForm();

  return (
    <Section id="quote" dark className="py-24 md:py-36 bg-surface-dark text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-green/20 blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Asymmetric Header, WhatsApp Action, Direct Contacts & Address (40%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-gold-glow animate-pulse" />
                <span className="label-tag text-brand-gold font-bold tracking-widest">
                  12 — GET YOUR SOLAR QUOTE
                </span>
              </div>

              <h2 className="display-heading text-white tracking-tight mb-4">
                READY TO <br />
                POWER YOUR <br />
                <span className="text-brand-gold">PROPERTY?</span>
              </h2>

              <p className="body-large text-slate-300 leading-relaxed mb-6">
                Tell us about your property and energy requirements. Sahaja Solar can review your enquiry and help you understand the next step.
              </p>

              <span className="text-xs font-mono text-slate-400 block">
                HOME • BUSINESS • SOLAR CONSULTATION
              </span>
            </div>

            {/* Primary WhatsApp Conversion Path */}
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <MessageCircle className="w-4 h-4" />
                <span>FASTEST WAY TO CONNECT</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Prefer to message directly? Connect with Sahaja Solar technical advisors on WhatsApp.
              </p>
              <a
                href={getWhatsAppUrl(submittedQuoteId || undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-subtle"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Sahaja Solar →</span>
              </a>
            </div>

            {/* Direct Phone & Email Contacts */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Direct Contact Lines
              </span>

              {SAHAJA_COMPANY_INFO.contacts.map((contact) => (
                <a
                  key={contact.rawPhone}
                  href={`tel:${contact.rawPhone}`}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold flex items-center justify-between text-xs text-white transition-all duration-300 group"
                >
                  <div>
                    <span className="font-heading font-bold text-brand-gold block">{contact.name}</span>
                    <span className="font-mono text-slate-300">{contact.phone}</span>
                  </div>
                  <PhoneCall className="w-4 h-4 text-slate-400 group-hover:text-brand-gold transition-colors" />
                </a>
              ))}

              <a
                href={`mailto:${SAHAJA_COMPANY_INFO.email}`}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold flex items-center justify-between text-xs text-white transition-all duration-300 group"
              >
                <span className="font-mono text-slate-300">{SAHAJA_COMPANY_INFO.email}</span>
                <Mail className="w-4 h-4 text-slate-400 group-hover:text-brand-gold transition-colors" />
              </a>
            </div>

            {/* Business Address */}
            <div className="pt-6 border-t border-white/10 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-gold font-bold mb-1">
                <MapPin className="w-4 h-4" />
                <span>SAHAJA SOLAR HEAD OFFICE</span>
              </div>
              <p className="leading-relaxed text-slate-400 font-mono">
                #11-228/1, Machalipatnam Road,<br />
                Opp. 132KV S.S, Pamarru, Krishna,<br />
                Andhra Pradesh - 521157, India
              </p>
            </div>
          </motion.div>

          {/* Right Column: High-Conversion Quote Form (60%) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7"
          >
            {submittedQuoteId ? (
              /* Success Receipt State */
              <div className="p-8 sm:p-12 bg-white/5 rounded-card border border-brand-gold/40 shadow-2xl text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-brand-green text-brand-gold flex items-center justify-center mx-auto shadow-gold-glow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3.5 py-1 rounded-full inline-block">
                  ENQUIRY REF: {submittedQuoteId}
                </span>

                <h3 className="h2 font-heading font-bold text-white tracking-tight">
                  REQUEST RECEIVED
                </h3>

                <p className="body-main text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. Your solar enquiry has been received by Sahaja Solar. Our technical team can review the details you provided.
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 text-left space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Property:</span>
                    <span className="font-bold uppercase text-white">{propertyType} ({location})</span>
                  </div>
                  {monthlyBill && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Bill:</span>
                      <span className="font-bold text-brand-gold">₹ {monthlyBill}</span>
                    </div>
                  )}
                  {interestedCapacityKw && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Interested Capacity:</span>
                      <span className="font-bold text-brand-gold">{interestedCapacityKw} kW</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href={getWhatsAppUrl(submittedQuoteId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-subtle"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Us Reference</span>
                  </a>

                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      const target = document.querySelector('#booking');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book A Consultation
                  </Button>
                </div>
              </div>
            ) : (
              /* Quote Form */
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 md:p-10 bg-white/5 rounded-card border border-white/10 shadow-2xl space-y-6"
              >
                <div>
                  <h3 className="h3 font-heading font-bold text-white mb-1 tracking-tight">
                    REQUEST A SOLAR QUOTE
                  </h3>
                  <p className="text-xs text-slate-300">
                    Fill in your details below for a tailored rooftop solar system evaluation.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/80 text-red-300 border border-red-500/40 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      10-Digit Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Property Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPropertyType('residential')}
                        className={cn(
                          'py-2.5 px-3 rounded-xl border text-xs font-heading font-bold transition-all flex items-center justify-center gap-2',
                          propertyType === 'residential'
                            ? 'bg-brand-green text-white border-brand-gold shadow-gold-glow'
                            : 'bg-black/40 text-slate-300 border-white/15'
                        )}
                      >
                        <HomeIcon className="w-3.5 h-3.5" />
                        <span>Residential</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPropertyType('commercial')}
                        className={cn(
                          'py-2.5 px-3 rounded-xl border text-xs font-heading font-bold transition-all flex items-center justify-center gap-2',
                          propertyType === 'commercial'
                            ? 'bg-brand-green text-white border-brand-gold shadow-gold-glow'
                            : 'bg-black/40 text-slate-300 border-white/15'
                        )}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Commercial</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      City / District in AP *
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Vijayawada"
                      className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Monthly Bill (₹ Optional)
                    </label>
                    <input
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Capacity in Mind (kW Optional)
                    </label>
                    <input
                      type="number"
                      value={interestedCapacityKw}
                      onChange={(e) => setInterestedCapacityKw(e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                    Tell Us About Your Requirement (Optional)
                  </label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your rooftop space, energy goals, or specific questions..."
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 text-xs text-slate-300 pt-2">
                  <input
                    type="checkbox"
                    id="quote-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-brand-green border-white/20 rounded focus:ring-brand-gold"
                  />
                  <label htmlFor="quote-consent" className="cursor-pointer leading-relaxed">
                    By submitting this enquiry, I agree that Sahaja Solar may contact me regarding my solar requirement.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="solar"
                  size="lg"
                  showArrow
                  disabled={isSubmitting || !consent}
                  className="w-full shadow-gold-glow mt-4"
                >
                  {isSubmitting ? 'Sending Request...' : 'Get My Solar Quote'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
