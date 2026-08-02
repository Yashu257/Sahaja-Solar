import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SolarSystemExplorer } from '@/components/ui/SolarSystemExplorer';
import { SAHAJA_BRANDS } from '@/data/solarBrandsData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProductsSection: React.FC = () => {
  const verifiedBrands = SAHAJA_BRANDS.filter((b) => b.verified && b.enabled);

  return (
    <Section id="products" dark className="py-24 md:py-36 bg-surface-dark text-white relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-green/10 blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* Asymmetric Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-gold-glow animate-pulse" />
              <span className="label-tag text-brand-gold font-bold tracking-widest">
                08 — SOLAR TECHNOLOGY
              </span>
            </div>

            <h2 className="display-heading text-white tracking-tight">
              THE TECHNOLOGY <br />
              BEHIND THE <span className="text-brand-gold">POWER.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-md flex flex-col justify-between gap-4"
          >
            <p className="body-large text-slate-300 leading-relaxed">
              A solar system is more than panels. Modules, inverters, mounting and electrical components work together to convert sunlight into dependable energy.
            </p>

            <span className="text-xs text-slate-400 font-mono">
              PANELS • INVERTERS • BOS • PROTECTION
            </span>
          </motion.div>
        </div>

        {/* Interactive Solar System Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28"
        >
          <SolarSystemExplorer />
        </motion.div>

        {/* Brand Architecture Section */}
        {verifiedBrands.length > 0 ? (
          <div className="mb-20 md:mb-28 text-center">
            <span className="label-tag text-brand-gold block mb-4">EQUIPMENT BRANDS</span>
            <h3 className="h3 text-white font-heading mb-8">BRANDS WE WORK WITH</h3>
            {/* Logo rail when verified brands exist */}
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
              {verifiedBrands.map((brand) => (
                <div key={brand.id} className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 text-slate-200 font-bold text-sm">
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Default Neutral Supplier Capability Panel when brands are unverified */
          <div className="p-8 md:p-10 bg-white/5 rounded-card border border-white/10 mb-20 md:mb-28 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-green text-brand-gold flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-white mb-1">
                  EQUIPMENT SELECTION & COMPLIANCE
                </h4>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Component selection is customized based on project capacity, DISCOM grid standards, and climate durability requirements. We utilize certified Tier-1 equipment.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-full border border-brand-gold/20 flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Grid Net-Metering Approved</span>
            </div>
          </div>
        )}

        {/* Quality Editorial Statement & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left bg-white/5 p-8 md:p-12 rounded-card border border-white/10"
        >
          <div className="max-w-xl">
            <span className="label-tag text-brand-gold block mb-2 font-mono">SYSTEM INTEGRATION</span>
            <h3 className="h2 text-white font-heading tracking-tight mb-2">
              RIGHT COMPONENTS. RIGHT SYSTEM. BUILT TO WORK TOGETHER.
            </h3>
            <p className="body-main text-slate-300">
              Solar performance depends on more than one component. System design, equipment compatibility and installation quality all matter.
            </p>
          </div>

          <Button
            variant="solar"
            size="lg"
            showArrow
            className="shadow-gold-glow flex-shrink-0"
            onClick={() => {
              const target = document.querySelector('#solar-calculator');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Solar Estimate
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
