import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SUBSIDY_CONFIG } from '@/features/subsidy/config';
import { PropertyType } from '@/features/solar-calculator/types';
import {
  Landmark,
  FileCheck,
  BadgeCheck,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Building2,
  Home as HomeIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const SubsidySection: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyType>('residential');
  const [selectedState, setSelectedState] = useState<string>('Andhra Pradesh');

  return (
    <Section
      id="subsidy"
      className="py-24 md:py-36 bg-surface-bg text-content-primary relative overflow-hidden"
    >
      {/* Environmental Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-green/5 blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* Asymmetric Header */}
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
                06 — SOLAR SUBSIDY
              </span>
            </div>

            <h2 className="display-heading text-content-primary tracking-tight">
              SOLAR MADE <br />
              <span className="text-brand-green">MORE ACCESSIBLE.</span>
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
              Eligible residential rooftop solar customers may be able to receive financial assistance under applicable government schemes.
            </p>

            <span className="text-xs text-content-muted font-medium">
              Sahaja Solar can help you understand the process, required information and next steps.
            </span>
          </motion.div>
        </div>

        {/* Hero Feature Panel & Mini-Checker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28 items-stretch">
          {/* Left Column: Scheme Feature Panel */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-surface-dark text-white rounded-card p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green text-brand-gold flex items-center justify-center shadow-gold-glow">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block">Government Scheme</span>
                    <span className="text-sm font-heading font-semibold text-white">{SUBSIDY_CONFIG.schemeShortName}</span>
                  </div>
                </div>

                {SUBSIDY_CONFIG.lastVerified && (
                  <span className="text-[11px] font-mono text-slate-400 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    Verified: {SUBSIDY_CONFIG.lastVerified}
                  </span>
                )}
              </div>

              <h3 className="h2 text-white font-heading mb-4 tracking-tight">
                {SUBSIDY_CONFIG.schemeName}
              </h3>

              <p className="body-main text-slate-300 leading-relaxed mb-8">
                {SUBSIDY_CONFIG.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-brand-gold">
                <BadgeCheck className="w-4 h-4" />
                <span>Subject to DISCOM & Government Policy</span>
              </div>

              <Button
                variant="solar"
                size="sm"
                showArrow
                onClick={() => {
                  const target = document.querySelector('#quote');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Subsidy Guidance
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Quick Eligibility Checker */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 bg-surface-card rounded-card p-6 sm:p-8 border border-surface-border shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="label-tag text-brand-green font-bold">START WITH A QUICK CHECK</span>
              </div>

              <h4 className="h3 text-content-primary mb-4 font-heading font-bold">
                Check General Eligibility
              </h4>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-content-secondary uppercase tracking-wider block mb-2">
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProperty('residential')}
                      className={cn(
                        'py-2.5 px-3 rounded-xl border text-xs font-heading font-bold transition-all flex items-center justify-center gap-2',
                        selectedProperty === 'residential'
                          ? 'bg-brand-green text-white border-brand-green'
                          : 'bg-surface-muted text-content-secondary border-surface-border'
                      )}
                    >
                      <HomeIcon className="w-3.5 h-3.5" />
                      <span>Residential</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedProperty('commercial')}
                      className={cn(
                        'py-2.5 px-3 rounded-xl border text-xs font-heading font-bold transition-all flex items-center justify-center gap-2',
                        selectedProperty === 'commercial'
                          ? 'bg-brand-green text-white border-brand-green'
                          : 'bg-surface-muted text-content-secondary border-surface-border'
                      )}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Commercial</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-content-secondary uppercase tracking-wider block mb-1">
                    State Location
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-surface-muted rounded-xl border border-surface-border p-2.5 px-3 text-xs font-medium text-content-primary focus:outline-none focus:border-brand-green"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Other State">Other State in India</option>
                  </select>
                </div>
              </div>

              {/* Contextual Guidance Response Box */}
              <div className="bg-surface-muted p-4 rounded-xl border border-surface-border text-xs text-content-secondary leading-relaxed">
                {selectedProperty === 'residential' ? (
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>
                      Residential rooftop solar in <strong>{selectedState}</strong> may qualify under central PM Surya Ghar & DISCOM schemes. Sahaja Solar helps evaluate your connection and documentation.
                    </span>
                  </p>
                ) : (
                  <p className="flex items-start gap-2 text-content-primary font-medium">
                    <HelpCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span>
                      Commercial incentives differ from residential rooftop subsidies. Commercial customers can utilize Accelerated Depreciation & OpEx tax benefits.
                    </span>
                  </p>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full mt-6"
              showArrow
              onClick={() => {
                const target = document.querySelector('#quote');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Eligibility Guidance
            </Button>
          </motion.div>
        </div>

        {/* Subsection: Who May Be Eligible? Editorial Checklist */}
        <div className="my-20 md:my-28">
          <div className="max-w-2xl mb-12">
            <span className="label-tag text-brand-green block mb-2">CRITERIA OVERVIEW</span>
            <h3 className="h2 text-content-primary font-heading tracking-tight">
              WHO MAY BE ELIGIBLE?
            </h3>
          </div>

          <div className="space-y-6">
            {SUBSIDY_CONFIG.eligibilityChecklist.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 md:p-8 rounded-card bg-surface-card border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-green/30 transition-colors shadow-subtle"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-heading font-extrabold text-base text-brand-gold font-mono tracking-widest">
                    {item.number}
                  </span>
                  <div>
                    <h4 className="h3 text-content-primary font-heading font-bold mb-1">
                      {item.title}
                    </h4>
                    <p className="body-main text-content-secondary max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-brand-green-light text-brand-green flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subsection: How Subsidy Support Works (5 Stages) */}
        <div className="my-20 md:my-28 pt-16 border-t border-surface-border">
          <div className="max-w-2xl mb-12">
            <span className="label-tag text-brand-green block mb-2">PROCESS STAGES</span>
            <h3 className="h2 text-content-primary font-heading tracking-tight">
              HOW SUBSIDY SUPPORT WORKS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SUBSIDY_CONFIG.processSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-surface-card border border-surface-border flex flex-col justify-between min-h-[200px] shadow-subtle hover:border-brand-green/30 transition-all"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-brand-green block mb-2">
                    STAGE {step.step}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-content-primary mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-content-muted mt-4 text-center">
            *Actual application steps, documentation, verification and disbursement are governed by applicable government schemes and electricity authorities.
          </p>
        </div>

        {/* Subsection: We Help You Navigate the Process */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="bg-surface-dark text-white rounded-card p-8 md:p-12 border border-white/10 shadow-2xl my-20 md:my-28 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
        >
          <div className="max-w-xl">
            <span className="label-tag text-brand-gold block mb-2">SAHAJA ASSISTANCE</span>
            <h3 className="h2 text-white font-heading tracking-tight mb-4">
              WE HELP YOU NAVIGATE THE PROCESS.
            </h3>
            <p className="body-main text-slate-300 mb-6 leading-relaxed">
              Solar subsidy processes involve eligibility checks, DISCOM filings, and documentation coordination. Sahaja Solar guides customers through each step.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUBSIDY_CONFIG.sahajaSupportServices.map((service) => (
                <div key={service} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <Button
              variant="solar"
              size="lg"
              showArrow
              className="shadow-gold-glow w-full sm:w-auto"
              onClick={() => {
                const target = document.querySelector('#quote');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Subsidy Guidance
            </Button>
          </div>
        </motion.div>

        {/* Policy Disclaimer */}
        <div className="pt-12 border-t border-surface-border text-center">
          <p className="text-xs text-content-muted max-w-3xl mx-auto leading-relaxed">
            Disclaimer: Government solar schemes, eligibility requirements, subsidy amounts, DISCOM approvals, and disbursement timelines are governed strictly by the applicable government program and relevant authorities. Sahaja Solar provides assistance with documentation and system compliance; final eligibility and financial disbursements are determined by official sanctioning bodies.
          </p>

          {/* Micro Transition to Future Projects Section */}
          <div className="mt-12 text-xs font-mono font-bold text-brand-green uppercase tracking-widest">
            REAL SOLAR • REAL INSTALLATIONS
          </div>
        </div>
      </Container>
    </Section>
  );
};
