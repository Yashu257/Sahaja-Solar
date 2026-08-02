import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SAHAJA_SERVICES } from '@/data/servicesData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const Services: React.FC = () => {
  const residential = SAHAJA_SERVICES.find((s) => s.id === 'residential-solar')!;
  const commercial = SAHAJA_SERVICES.find((s) => s.id === 'commercial-solar')!;
  const epc = SAHAJA_SERVICES.find((s) => s.id === 'solar-epc')!;
  const modules = SAHAJA_SERVICES.find((s) => s.id === 'modules-inverters')!;
  const amc = SAHAJA_SERVICES.find((s) => s.id === 'amc-maintenance')!;
  const bos = SAHAJA_SERVICES.find((s) => s.id === 'bos-materials')!;

  return (
    <Section id="solutions" className="py-24 md:py-36 bg-surface-bg text-content-primary relative overflow-hidden">
      {/* Background Subtle Gradient Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-brand-green/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <Container>
        {/* Asymmetric Section Header */}
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
                03 — OUR SOLUTIONS
              </span>
            </div>

            <h2 className="display-heading text-content-primary tracking-tight">
              SOLAR SOLUTIONS, <br />
              <span className="text-brand-green">BUILT AROUND YOU.</span>
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
              From residential rooftops to commercial installations, Sahaja Solar provides complete solar solutions designed around your energy requirements.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-green uppercase tracking-wider">
              <span className="bg-brand-green-light px-3 py-1 rounded-md">Residential</span>
              <span>•</span>
              <span className="bg-brand-green-light px-3 py-1 rounded-md">Commercial</span>
              <span>•</span>
              <span className="bg-brand-green-light px-3 py-1 rounded-md">EPC</span>
              <span>•</span>
              <span className="bg-brand-green-light px-3 py-1 rounded-md">Support</span>
            </div>
          </motion.div>
        </div>

        {/* ROW 1: Visually Dominant Primary Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
          >
            <ServiceCard
              index={residential.index}
              title={residential.title}
              label={residential.label}
              description={residential.description}
              image={residential.image}
              variant={residential.variant}
              tags={residential.tags}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <ServiceCard
              index={commercial.index}
              title={commercial.title}
              label={commercial.label}
              description={commercial.description}
              image={commercial.image}
              variant={commercial.variant}
              tags={commercial.tags}
            />
          </motion.div>
        </div>

        {/* ROW 2: Secondary Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6 }}
          >
            <ServiceCard
              index={epc.index}
              title={epc.title}
              label={epc.label}
              description={epc.description}
              variant={epc.variant}
              featureDetail={epc.featureDetail}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ServiceCard
              index={modules.index}
              title={modules.title}
              label={modules.label}
              description={modules.description}
              variant={modules.variant}
              featureDetail={modules.featureDetail}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ServiceCard
              index={amc.index}
              title={amc.title}
              label={amc.label}
              description={amc.description}
              variant={amc.variant}
              featureDetail={amc.featureDetail}
            />
          </motion.div>
        </div>

        {/* ROW 3: Supporting Wide Card for BOS Materials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-16 md:mb-24"
        >
          <ServiceCard
            index={bos.index}
            title={bos.title}
            label={bos.label}
            description={bos.description}
            variant={bos.variant}
            tags={bos.tags}
          />
        </motion.div>

        {/* Section Closing Microcopy Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="pt-12 border-t border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green-light text-brand-green flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-content-primary tracking-tight block">
                ONE PARTNER. COMPLETE SOLAR SUPPORT.
              </span>
              <span className="text-xs text-content-secondary">
                Turnkey consultation, engineering, installation & DISCOM subsidy guidance in Andhra Pradesh.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-brand-green">
            <CheckCircle2 className="w-4 h-4 text-brand-gold" /> ISO Standard Quality Components
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
