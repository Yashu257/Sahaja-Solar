import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, ArrowRight, Sun } from 'lucide-react';

export interface CapabilityItem {
  number: string;
  title: string;
  description: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    title: 'SOLAR MODULES',
    description: 'High-efficiency Mono PERC & TOPCon PV modules optimized for maximum solar yield.',
  },
  {
    number: '02',
    title: 'INVERTERS',
    description: 'Smart grid-tied string and central solar inverters with real-time cloud monitoring.',
  },
  {
    number: '03',
    title: 'EPC',
    description: 'Turnkey Engineering, Procurement, and Construction with end-to-end quality standards.',
  },
  {
    number: '04',
    title: 'AMC',
    description: 'Comprehensive Annual Maintenance Contracts, panel cleaning & thermal inspections.',
  },
  {
    number: '05',
    title: 'BOS MATERIALS',
    description: 'Certified Balance of System components, HDG mounting structures & solar safety DBs.',
  },
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle Parallax Effect for the main solar visual
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-25, 25]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [1.04, 1, 1.02]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-surface-bg text-content-primary overflow-hidden transition-colors duration-500"
    >
      {/* Background Subtle Solar Accent Pattern */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-green/5 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <Container>
        {/* Section Header & Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-2xl"
          >
            {/* Section Tag with Warm Gold Sun Accent */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-gold-glow animate-pulse" />
              <span className="label-tag text-brand-green font-bold tracking-widest">
                01 — ABOUT SAHAJA SOLAR
              </span>
            </div>

            <h2 className="display-heading text-content-primary tracking-tight">
              SOLAR ENERGY, <br />
              <span className="text-brand-green">MADE SIMPLER.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-md flex flex-col justify-between gap-6"
          >
            <p className="body-large text-content-secondary leading-relaxed">
              Sahaja Solar delivers dependable solar solutions for homes and businesses, helping customers move toward cleaner energy with professional guidance from consultation to installation and support.
            </p>

            <a
              href="#solutions"
              className="inline-flex items-center gap-2 font-heading font-semibold text-brand-green hover:text-brand-green-hover text-base group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
            >
              <span>Discover Our Solutions</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-brand-gold" />
            </a>
          </motion.div>
        </div>

        {/* Large Solar Installation Visual with Subtle Reveal & Parallax */}
        <div
          ref={imageContainerRef}
          className="relative w-full rounded-card overflow-hidden my-16 md:my-24 shadow-subtle border border-surface-border bg-surface-muted"
        >
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full h-[320px] sm:h-[450px] lg:h-[580px] overflow-hidden"
          >
            <img
              src="/assets/images/about-solar-installation.jpg"
              alt="Sahaja Solar Rooftop Solar Installation in India"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Inset Badge Overlay */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 glass-panel-dark px-5 py-3 rounded-2xl border border-white/15 text-white max-w-sm">
              <div className="flex items-center gap-2 mb-1">
                <Sun className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Turnkey Execution</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-normal">
                Engineered for maximum solar yield and long-term durability in Indian climate conditions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Secondary Editorial Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <p className="body-large text-content-primary font-medium leading-relaxed">
            From solar modules and inverters to EPC execution, maintenance, and BOS materials, our goal is to make the transition to solar straightforward and practical.
          </p>
        </motion.div>

        {/* Capability Strip / List */}
        <div className="my-16 md:my-24">
          <div className="flex items-center justify-between pb-6 border-b border-surface-border mb-8">
            <span className="label-tag text-content-muted">Core Capabilities</span>
            <span className="text-xs font-mono text-brand-green font-semibold hidden md:block">01 — 05 Offerings</span>
          </div>

          {/* Desktop Capability Strip & Mobile Stacked List */}
          <div className="divide-y divide-surface-border">
            {CAPABILITIES.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="py-6 md:py-8 group flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300 hover:bg-brand-green-light/40 -mx-4 px-4 rounded-2xl"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-heading font-bold text-sm text-brand-gold font-mono tracking-tight">
                    {item.number}
                  </span>
                  <h3 className="h3 text-content-primary group-hover:text-brand-green transition-colors duration-300 font-heading font-bold">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/2">
                  <p className="small-text text-content-secondary group-hover:text-content-primary transition-colors duration-300 max-w-md">
                    {item.description}
                  </p>
                  <div className="w-8 h-8 rounded-full border border-surface-border group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-white flex items-center justify-center text-content-muted transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Positioning Statement & Final Section Callout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="pt-16 border-t border-surface-border mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <p className="h2 text-content-primary font-heading leading-snug">
              "From the first site visit to long-term support, we stay focused on one thing —{' '}
              <span className="text-brand-green underline decoration-brand-gold/60 decoration-2 underline-offset-4">
                making solar work for you."
              </span>
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            showArrow
            onClick={() => {
              const target = document.querySelector('#solutions');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Solar Solutions
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};
