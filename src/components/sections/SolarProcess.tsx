import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SOLAR_PROCESS_STAGES } from '@/data/solarProcessData';
import { TracingEnergyPath } from '@/components/ui/TracingEnergyPath';
import { Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SolarProcess: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measure scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 80%'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const effectiveProgress = shouldReduceMotion ? 1 : scrollProgress;

  return (
    <Section
      id="solar-process"
      ref={sectionRef}
      className="py-24 md:py-36 bg-surface-bg text-content-primary relative overflow-hidden"
    >
      {/* Background Subtle Solar Accent */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-green/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-gold/5 blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 md:mb-28">
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
                05 — HOW IT WORKS
              </span>
            </div>

            <h2 className="display-heading text-content-primary tracking-tight">
              FROM YOUR ROOF <br />
              TO RENEWABLE <span className="text-brand-green">ENERGY.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-md"
          >
            <p className="body-large text-content-secondary leading-relaxed">
              A clear journey from understanding your energy needs to installing and supporting your solar system.
            </p>
          </motion.div>
        </div>

        {/* Start Sun Origin Marker */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-brand-gold shadow-gold-glow">
            <Sun className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-green bg-brand-green-light px-3 py-1 rounded-full border border-brand-green/20">
            START YOUR SOLAR JOURNEY
          </span>
        </div>

        {/* DESKTOP ALTERNATING JOURNEY LAYOUT (Hidden on Mobile) */}
        <div className="hidden md:block relative max-w-5xl mx-auto my-12">
          {/* Background Tracing SVG Line Overlay */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <TracingEnergyPath progress={effectiveProgress} isMobile={false} />
          </div>

          {/* 7 Stages Alternating Left / Right */}
          <div className="relative z-10 space-y-24">
            {SOLAR_PROCESS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isEven = idx % 2 === 0;
              // Check if scroll progress has reached this node (~0.14 per stage)
              const threshold = (idx + 0.5) / 7;
              const isActive = effectiveProgress >= threshold - 0.08;

              return (
                <div
                  key={stage.id}
                  className={cn(
                    'flex items-center gap-12 w-full',
                    isEven ? 'flex-row' : 'flex-row-reverse text-right'
                  )}
                >
                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={cn('w-1/2 p-6 md:p-8 rounded-card bg-surface-card border border-surface-border shadow-subtle transition-all duration-300', isActive && 'border-brand-green/40 shadow-card-hover')}
                  >
                    <div className={cn('flex items-center gap-3 mb-3', isEven ? 'justify-start' : 'justify-end')}>
                      <span className={cn('text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors', isActive ? 'bg-brand-green text-white' : 'bg-surface-muted text-content-muted')}>
                        {stage.microLabel}
                      </span>
                    </div>

                    <div className={cn('flex items-center gap-4 mb-3', isEven ? 'flex-row' : 'flex-row-reverse')}>
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300', isActive ? 'bg-brand-green text-brand-gold' : 'bg-surface-muted text-content-muted')}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="h3 text-content-primary font-heading font-bold tracking-tight">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="body-main text-content-secondary leading-relaxed">
                      {stage.description}
                    </p>
                  </motion.div>

                  {/* Central Node Indicator */}
                  <div className="relative flex items-center justify-center flex-shrink-0 z-20">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-surface-card',
                        isActive
                          ? 'border-brand-gold bg-brand-gold text-brand-green-dark shadow-gold-glow scale-110'
                          : 'border-surface-border text-content-muted'
                      )}
                    >
                      <span className="font-mono text-xs font-bold">{stage.index}</span>
                    </div>
                  </div>

                  {/* Empty Spacer Column */}
                  <div className="w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE VERTICAL TIMELINE LAYOUT (Shown on Mobile) */}
        <div className="md:hidden relative my-8 pl-8">
          {/* Vertical Energy Line anchored to left */}
          <div className="absolute top-0 left-3 bottom-0 w-1">
            <TracingEnergyPath progress={effectiveProgress} isMobile={true} />
          </div>

          <div className="space-y-12">
            {SOLAR_PROCESS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const threshold = (idx + 0.5) / 7;
              const isActive = effectiveProgress >= threshold - 0.08;

              return (
                <div key={stage.id} className="relative pl-6">
                  {/* Node Dot on Line */}
                  <div
                    className={cn(
                      'absolute -left-[23px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-surface-card z-10',
                      isActive
                        ? 'border-brand-gold bg-brand-gold text-brand-green-dark shadow-gold-glow'
                        : 'border-surface-border text-content-muted'
                    )}
                  >
                    <span className="font-mono text-[10px] font-bold">{stage.index}</span>
                  </div>

                  {/* Mobile Content Card */}
                  <div className={cn('p-5 rounded-2xl bg-surface-card border border-surface-border shadow-subtle transition-colors', isActive && 'border-brand-green/40')}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {stage.microLabel}
                    </span>

                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isActive ? 'bg-brand-green text-brand-gold' : 'bg-surface-muted text-content-muted')}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-content-primary">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="small-text text-content-secondary leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Closing CTA Callout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-surface-border mt-20 md:mt-28 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left bg-surface-card p-8 md:p-12 rounded-card border border-surface-border shadow-subtle"
        >
          <div className="max-w-xl">
            <span className="label-tag text-brand-green block mb-2">NEXT STEP</span>
            <h3 className="h2 text-content-primary font-heading tracking-tight mb-2">
              READY TO START YOUR SOLAR JOURNEY?
            </h3>
            <p className="body-main text-content-secondary">
              Book a site consultation with Sahaja Solar experts to evaluate your roof and receive a tailored solar system proposal.
            </p>
          </div>

          <Button
            variant="solar"
            size="lg"
            showArrow
            className="shadow-gold-glow flex-shrink-0"
            onClick={() => {
              const target = document.querySelector('#quote');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Book a Solar Consultation
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
