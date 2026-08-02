import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Zap, Sun, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';

export interface BenefitItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accentDetail: string;
}

const WHY_SOLAR_BENEFITS: BenefitItem[] = [
  {
    number: '01',
    title: 'LOWER ELECTRICITY COSTS',
    description: 'Generate your own electricity and reduce dependence on expensive grid power.',
    icon: Zap,
    accentDetail: 'M 0 10 Q 50 0 100 10',
  },
  {
    number: '02',
    title: 'CLEANER ENERGY',
    description: 'Produce electricity from sunlight and reduce reliance on conventional energy sources.',
    icon: Sun,
    accentDetail: 'M 10 10 A 8 8 0 0 1 90 10',
  },
  {
    number: '03',
    title: 'ENERGY INDEPENDENCE',
    description: 'Generate power where it is consumed and reduce your exposure to future electricity price increases.',
    icon: ShieldCheck,
    accentDetail: 'M 0 10 H 100',
  },
  {
    number: '04',
    title: 'LONG-TERM VALUE',
    description: 'A professionally designed solar system can provide useful energy generation for decades.',
    icon: TrendingUp,
    accentDetail: 'M 0 20 L 40 10 L 70 15 L 100 0',
  },
];

export const WhySolar: React.FC = () => {
  return (
    <Section id="why-solar" dark className="py-24 md:py-36 relative overflow-hidden bg-surface-dark">
      {/* Subtle Environmental Glow Layers */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-brand-green/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-brand-gold/10 blur-[140px] pointer-events-none" />

      {/* Subtle Ambient Background Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-heading font-extrabold text-white/[0.015] select-none pointer-events-none tracking-widest uppercase z-0">
        ENERGY
      </div>

      <Container className="relative z-10">
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
              <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-gold-glow animate-pulse" />
              <span className="label-tag text-brand-gold font-bold tracking-widest">
                02 — WHY SOLAR
              </span>
            </div>

            <h2 className="display-heading text-white tracking-tight">
              WHY PAY FOR POWER <br />
              YOU CAN <span className="text-brand-gold">PRODUCE?</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-md"
          >
            <p className="body-large text-slate-300 leading-relaxed">
              Solar turns unused rooftop space into a long-term energy asset — helping reduce electricity expenses while generating cleaner power for your home or business.
            </p>
          </motion.div>
        </div>

        {/* 2x2 Interactive Benefit Cards (Spotlight Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20 md:mb-28">
          {WHY_SOLAR_BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <SpotlightCard className="h-full flex flex-col justify-between group">
                  <div>
                    {/* Top Row: Index Number & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-heading font-extrabold text-sm text-brand-gold font-mono tracking-wider">
                        {item.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:border-brand-gold/50 group-hover:bg-brand-green/20 flex items-center justify-center text-slate-300 group-hover:text-brand-gold transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="h3 text-white font-heading font-bold mb-3 tracking-tight group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="body-main text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Subtle Visual Line Detail */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-slate-400">
                    <span>Sahaja Energy Benefit</span>
                    <svg className="w-16 h-3 stroke-brand-gold/40 group-hover:stroke-brand-gold fill-none transition-colors duration-300" viewBox="0 0 100 20">
                      <path d={item.accentDetail} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Section Closing Editorial Statement & Energy Line */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="pt-16 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="h2 text-white font-heading leading-snug mb-3">
              "EVERY UNIT YOU GENERATE IS ONE LESS UNIT YOU NEED FROM THE GRID."
            </h3>
            <p className="body-main text-slate-300">
              Solar gives your roof a job — producing energy for your everyday needs.
            </p>

            {/* Growing Gold Energy Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="w-full h-0.5 bg-gradient-to-r from-brand-gold via-brand-green to-transparent origin-left mt-6"
            />
          </div>

          {/* Future Solar Calculator Link */}
          <a
            href="#solar-calculator"
            className="inline-flex items-center gap-2 font-heading font-semibold text-brand-gold hover:text-brand-gold-highlight text-sm md:text-base group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded py-2 px-1"
          >
            <span>See what solar could mean for your bill</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </Container>
    </Section>
  );
};
