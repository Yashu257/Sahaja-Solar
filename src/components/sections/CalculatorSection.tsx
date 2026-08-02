import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SolarCalculator } from '@/features/solar-calculator/SolarCalculator';
import { ShieldCheck } from 'lucide-react';

export const CalculatorSection: React.FC = () => {
  return (
    <Section
      id="solar-calculator"
      dark
      className="py-24 md:py-36 relative overflow-hidden bg-surface-dark"
    >
      {/* Environmental Glow Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-brand-green/20 via-brand-gold/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-gold-glow animate-pulse" />
              <span className="label-tag text-brand-gold font-bold tracking-widest">
                04 — SOLAR CALCULATOR
              </span>
            </div>

            <h2 className="display-heading text-white tracking-tight mb-4">
              WHAT COULD SOLAR <br />
              LOOK LIKE FOR <span className="text-brand-gold">YOU?</span>
            </h2>

            <p className="body-large text-slate-300 mb-4 leading-relaxed">
              Enter your electricity usage or choose a solar capacity to explore an estimated system requirement and potential savings.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Indicative tool for Andhra Pradesh & Indian residential/commercial solar planning.</span>
            </div>
          </motion.div>
        </div>

        {/* Calculator Feature Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <SolarCalculator />
        </motion.div>
      </Container>
    </Section>
  );
};
