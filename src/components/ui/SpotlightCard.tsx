import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(245, 166, 35, 0.15)', // Warm solar gold spotlight default
  className,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Calculate cursor position relative to the card dimensions
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative rounded-card p-7 md:p-9 bg-surface-dark border border-white/10 text-white overflow-hidden transition-all duration-300 ease-out group hover:-translate-y-1 hover:border-brand-gold/40 shadow-2xl',
        className
      )}
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--spotlight-opacity': '0',
        } as React.CSSProperties
      }
      {...props}
    >
      {/* High-Performance Cursor-Tracking Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 ease-out z-0 opacity-[var(--spotlight-opacity)]"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Subtle Inner Highlight Border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-card opacity-[var(--spotlight-opacity)] transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.15), transparent 70%)`,
        }}
      />

      {/* Card Content Wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
