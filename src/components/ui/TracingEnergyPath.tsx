import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TracingEnergyPathProps {
  progress: number; // 0 to 1
  isMobile?: boolean;
  className?: string;
}

export const TracingEnergyPath: React.FC<TracingEnergyPathProps> = ({
  progress,
  isMobile = false,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const effectiveProgress = shouldReduceMotion ? 1 : progress;

  if (isMobile) {
    return (
      <div className={cn('relative w-1 h-full bg-surface-border rounded-full overflow-hidden', className)}>
        {/* Active Solar Gold Energy Fill Line */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-gold via-brand-gold-highlight to-brand-green rounded-full transition-all duration-150 ease-out shadow-gold-glow"
          style={{ height: `${effectiveProgress * 100}%` }}
        />
      </div>
    );
  }

  // Desktop SVG Path tracing
  return (
    <svg
      className={cn('w-full h-full pointer-events-none overflow-visible', className)}
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="solarEnergyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="50%" stopColor="#FFD000" />
          <stop offset="100%" stopColor="#0A4D3C" />
        </linearGradient>
        <filter id="solarGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base Muted Path */}
      <path
        d="M 50 0 C 50 100, 20 150, 20 250 C 20 350, 80 400, 80 500 C 80 600, 20 650, 20 750 C 20 850, 50 900, 50 1000"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Active Solar Gold Energy Tracing Path */}
      <motion.path
        d="M 50 0 C 50 100, 20 150, 20 250 C 20 350, 80 400, 80 500 C 80 600, 20 650, 20 750 C 20 850, 50 900, 50 1000"
        fill="none"
        stroke="url(#solarEnergyGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#solarGlow)"
        style={{
          pathLength: effectiveProgress,
        }}
      />
    </svg>
  );
};
