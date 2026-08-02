import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SAHAJA_COMPANY_INFO } from '@/data/siteConfig';
import { SAHAJA_TESTIMONIALS } from '@/data/testimonialsData';
import {
  PhoneCall,
  Mail,
  Compass,
  Building2,
  Wrench,
  Headphones,
  MessageSquareText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const TrustSection: React.FC = () => {
  const [hoveredPrincipleIndex, setHoveredPrincipleIndex] = useState<number | null>(null);

  const verifiedTestimonials = SAHAJA_TESTIMONIALS.filter((t) => t.verified && t.enabled);

  const TRUST_PRINCIPLES = [
    {
      index: '01',
      title: 'CLEAR GUIDANCE',
      description:
        'We help customers understand their solar options, feasibility and financial aspects before making a decision.',
      icon: Compass,
    },
    {
      index: '02',
      title: 'SYSTEM-FIRST APPROACH',
      description:
        "Every project begins with understanding the property's requirements, roof layout and suitable system configuration.",
      icon: Building2,
    },
    {
      index: '03',
      title: 'PROFESSIONAL EXECUTION',
      description:
        'Planning, equipment coordination, installation and DISCOM commissioning are approached as one connected process.',
      icon: Wrench,
    },
    {
      index: '04',
      title: 'SUPPORT BEYOND INSTALLATION',
      description:
        'Our relationship does not end when the solar system is switched on. We remain available for ongoing support.',
      icon: Headphones,
    },
  ];

  const TRUST_SIGNALS = [
    'CONSULTATION',
    'SITE ASSESSMENT',
    'SYSTEM DESIGN',
    'INSTALLATION',
    'ONGOING SUPPORT',
  ];

  return (
    <Section id="trust" className="py-24 md:py-36 bg-surface-bg text-content-primary relative overflow-hidden">
      {/* Subtle Environmental Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/5 blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* Asymmetric Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
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
                09 — WHY SAHAJA
              </span>
            </div>

            <h2 className="display-heading text-content-primary tracking-tight">
              SOLAR IS A LONG-TERM DECISION. <br />
              <span className="text-brand-green">SO IS THE TEAM BEHIND IT.</span>
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
              From the first conversation to installation and ongoing support, Sahaja Solar focuses on making the solar journey clear, practical and professionally managed.
            </p>

            <span className="text-xs text-content-muted font-medium">
              Transparent engineering • Local expertise in Andhra Pradesh
            </span>
          </motion.div>
        </div>

        {/* 4 Trust Principles Architectural 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-28">
          {TRUST_PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            const isHovered = hoveredPrincipleIndex === idx;

            return (
              <motion.div
                key={principle.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => {
                  if (!window.matchMedia('(pointer: coarse)').matches) {
                    setHoveredPrincipleIndex(idx);
                  }
                }}
                onMouseLeave={() => {
                  if (!window.matchMedia('(pointer: coarse)').matches) {
                    setHoveredPrincipleIndex(null);
                  }
                }}
                className="p-8 rounded-card bg-surface-card border border-surface-border shadow-subtle flex flex-col justify-between relative group transition-all duration-300 hover:border-brand-green/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={cn(
                        'font-mono text-xl font-extrabold transition-colors duration-300',
                        isHovered ? 'text-brand-gold' : 'text-content-muted'
                      )}
                    >
                      {principle.index}
                    </span>

                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
                        isHovered ? 'bg-brand-green text-brand-gold' : 'bg-surface-muted text-content-muted'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className={cn(
                      'h3 text-content-primary font-heading font-bold mb-3 tracking-tight transition-transform duration-300',
                      isHovered && 'translate-x-1 text-brand-green'
                    )}
                  >
                    {principle.title}
                  </h3>

                  <p className="body-main text-content-secondary leading-relaxed mb-8">
                    {principle.description}
                  </p>
                </div>

                {/* Interactive Solar-Gold Line Expanding on Hover */}
                <div className="w-full bg-surface-border h-0.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gold transition-all duration-500 ease-out"
                    style={{
                      width: isHovered ? '100%' : '25%',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Customer Voices / Testimonials Area */}
        <div className="mb-20 md:mb-28 pt-16 border-t border-surface-border">
          <div className="max-w-2xl mb-8">
            <span className="label-tag text-brand-green block mb-2">VERIFIED EXPERIENCES</span>
            <h3 className="h2 text-content-primary font-heading tracking-tight">
              CUSTOMER STORIES
            </h3>
          </div>

          {verifiedTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {verifiedTestimonials.map((t) => (
                <div key={t.id} className="p-8 rounded-card bg-surface-card border border-surface-border shadow-subtle">
                  <p className="body-large text-content-primary italic mb-6">"{t.quote}"</p>
                  <div className="flex items-center justify-between text-xs font-heading font-bold text-content-secondary">
                    <span>{t.name}</span>
                    <span className="text-brand-green">{t.location}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tasteful Intentional Empty State for Unverified Testimonials */
            <div className="p-8 md:p-12 rounded-card bg-surface-card border border-surface-border text-center shadow-subtle max-w-3xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-brand-green-light text-brand-green flex items-center justify-center mx-auto mb-4">
                <MessageSquareText className="w-6 h-6" />
              </div>
              <h4 className="h3 font-heading font-bold text-content-primary mb-2">
                Real Customer Stories
              </h4>
              <p className="body-main text-content-secondary max-w-lg mx-auto leading-relaxed mb-4">
                Verified customer experiences and solar rooftop installation case studies will be featured here as they are published.
              </p>
              <span className="text-xs font-mono text-content-muted">
                Zero fake reviews • 100% verified customer feedback policy
              </span>
            </div>
          )}
        </div>

        {/* Trust Signal Strip */}
        <div className="bg-surface-card rounded-2xl p-6 border border-surface-border mb-20 md:mb-28 overflow-x-auto shadow-subtle">
          <div className="flex items-center justify-between min-w-[700px] text-xs font-heading font-bold tracking-wider text-content-secondary uppercase">
            {TRUST_SIGNALS.map((signal, i) => (
              <React.Fragment key={signal}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-green" />
                  <span>{signal}</span>
                </div>
                {i < TRUST_SIGNALS.length - 1 && <span className="text-surface-border">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Human Contact Cue: "Need to talk to a real person?" */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 md:p-12 rounded-card bg-surface-dark text-white border border-white/10 shadow-2xl mb-20 md:mb-28 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
        >
          <div className="max-w-xl">
            <span className="label-tag text-brand-gold block mb-2 font-mono">HUMAN ASSISTANCE</span>
            <h3 className="h2 text-white font-heading tracking-tight mb-3">
              NEED TO TALK TO A REAL PERSON?
            </h3>
            <p className="body-main text-slate-300 leading-relaxed">
              Connect directly with Sahaja Solar solution advisors for any questions regarding rooftop feasibility, solar capacity, or DISCOM subsidy processes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            {SAHAJA_COMPANY_INFO.contacts.map((contact) => (
              <a
                key={contact.rawPhone}
                href={`tel:${contact.rawPhone}`}
                className="p-4 rounded-xl bg-white/5 border border-white/15 hover:border-brand-gold text-white flex flex-col justify-between gap-2 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-heading font-bold text-brand-gold">{contact.name}</span>
                  <PhoneCall className="w-4 h-4 text-slate-400 group-hover:text-brand-gold transition-colors" />
                </div>
                <span className="text-xs font-mono text-slate-300 font-semibold">{contact.phone}</span>
              </a>
            ))}

            <a
              href={`mailto:${SAHAJA_COMPANY_INFO.email}`}
              className="p-4 rounded-xl bg-brand-green/30 border border-brand-green/50 hover:border-brand-gold text-white flex items-center justify-center gap-2 text-xs font-heading font-bold transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-brand-gold" />
              <span>Email Us</span>
            </a>
          </div>
        </motion.div>

        {/* Section Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-surface-border flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left bg-surface-card p-8 md:p-12 rounded-card border border-surface-border shadow-subtle"
        >
          <div className="max-w-xl">
            <span className="label-tag text-brand-green block mb-2">NEXT STEPS</span>
            <h3 className="h2 text-content-primary font-heading tracking-tight mb-2">
              READY TO TALK ABOUT YOUR ROOFTOP?
            </h3>
            <p className="body-main text-content-secondary">
              Tell us about your property and energy requirements. Our team can help you understand the next step.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="solar"
              size="lg"
              showArrow
              className="shadow-gold-glow"
              onClick={() => {
                const target = document.querySelector('#quote');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Talk to Sahaja Solar
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const target = document.querySelector('#solar-assistant');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ask Our Solar Assistant
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
