import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  index: string;
  title: string;
  label: string;
  description: string;
  image?: string;
  variant?: 'primary' | 'secondary' | 'wide';
  featureDetail?: string;
  tags?: string[];
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  index,
  title,
  label,
  description,
  image,
  variant = 'secondary',
  featureDetail,
  tags,
  className,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Disable 3D tilt effect on touch/coarse devices
    if (window.matchMedia('(pointer: coarse)').matches || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ~3 degrees
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    cardRef.current.style.setProperty('--card-rotate-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--card-rotate-y', `${rotateY}deg`);
    cardRef.current.style.setProperty('--light-x', `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--light-y', `${(y / rect.height) * 100}%`);
    cardRef.current.style.setProperty('--light-opacity', '1');
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--card-rotate-x', '0deg');
    cardRef.current.style.setProperty('--card-rotate-y', '0deg');
    cardRef.current.style.setProperty('--light-opacity', '0');
  };

  if (variant === 'primary') {
    return (
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn(
          'relative rounded-card overflow-hidden bg-surface-card border border-surface-border text-white shadow-subtle hover:shadow-card-hover transition-all duration-400 ease-out group min-h-[480px] md:min-h-[540px] flex flex-col justify-between p-6 md:p-8',
          className
        )}
        style={
          {
            perspective: '1000px',
            transform: 'perspective(1000px) rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg))',
            transformStyle: 'preserve-3d',
            '--light-x': '50%',
            '--light-y': '50%',
            '--light-opacity': '0',
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Full Card Background Image */}
        {image && (
          <div className="absolute inset-0 z-0 overflow-hidden bg-surface-dark">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/95 via-surface-dark/45 to-black/30 pointer-events-none" />
          </div>
        )}

        {/* Solar Glass Light Reflection Overlay */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10 opacity-[var(--light-opacity)]"
          style={{
            background: `radial-gradient(400px circle at var(--light-x) var(--light-y), rgba(255, 255, 255, 0.25), transparent 75%)`,
          }}
        />

        {/* Top Bar: Index & Label */}
        <div className="relative z-20 flex items-center justify-between">
          <span className="font-heading font-extrabold text-sm text-brand-gold font-mono tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {index}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {label}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="relative z-20 mt-auto pt-16">
          <h3 className="h2 text-white font-heading font-bold mb-3 tracking-tight group-hover:text-brand-gold transition-colors duration-300">
            {title}
          </h3>
          <p className="body-main text-slate-200 mb-6 max-w-md leading-relaxed">
            {description}
          </p>

          {/* Optional Tag Pills */}
          {tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold text-slate-300 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="inline-flex items-center gap-2 text-xs font-heading font-bold text-brand-gold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
            <span>Explore Solution</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'wide') {
    return (
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn(
          'relative rounded-card p-6 md:p-8 bg-surface-card border border-surface-border text-content-primary shadow-subtle hover:shadow-card-hover transition-all duration-300 ease-out group',
          className
        )}
        style={
          {
            perspective: '1000px',
            transform: 'perspective(1000px) rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg))',
            transformStyle: 'preserve-3d',
            '--light-x': '50%',
            '--light-y': '50%',
            '--light-opacity': '0',
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10 opacity-[var(--light-opacity)] rounded-card"
          style={{
            background: `radial-gradient(350px circle at var(--light-x) var(--light-y), rgba(10, 77, 60, 0.08), transparent 75%)`,
          }}
        />

        <div className="relative z-20 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="font-heading font-extrabold text-sm text-brand-green font-mono tracking-widest bg-brand-green-light px-3 py-1 rounded-full">
              {index}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-green block mb-1">
                {label}
              </span>
              <h3 className="h3 text-content-primary font-heading font-bold tracking-tight group-hover:text-brand-green transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>

          <p className="body-main text-content-secondary lg:max-w-md">
            {description}
          </p>

          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-brand-green bg-brand-green-light/70 px-3 py-1.5 rounded-lg border border-brand-green/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default / Secondary Card
  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative rounded-card p-6 md:p-8 bg-surface-card border border-surface-border text-content-primary shadow-subtle hover:shadow-card-hover transition-all duration-300 ease-out group flex flex-col justify-between min-h-[320px]',
        className
      )}
      style={
        {
          perspective: '1000px',
          transform: 'perspective(1000px) rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg))',
          transformStyle: 'preserve-3d',
          '--light-x': '50%',
          '--light-y': '50%',
          '--light-opacity': '0',
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10 opacity-[var(--light-opacity)] rounded-card"
        style={{
          background: `radial-gradient(350px circle at var(--light-x) var(--light-y), rgba(10, 77, 60, 0.08), transparent 75%)`,
        }}
      />

      <div className="relative z-20">
        <div className="flex items-center justify-between mb-6">
          <span className="font-heading font-extrabold text-sm text-brand-green font-mono tracking-widest bg-brand-green-light px-3 py-1 rounded-full">
            {index}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-content-muted">
            {label}
          </span>
        </div>

        <h3 className="h3 text-content-primary font-heading font-bold mb-3 tracking-tight group-hover:text-brand-green transition-colors duration-300 whitespace-pre-line">
          {title}
        </h3>

        <p className="small-text text-content-secondary leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="relative z-20 pt-4 border-t border-surface-border flex items-center justify-between">
        {featureDetail ? (
          <span className="text-xs font-mono font-semibold text-brand-green">
            {featureDetail}
          </span>
        ) : (
          <span className="text-xs font-semibold text-content-muted group-hover:text-brand-green transition-colors">
            Learn More
          </span>
        )}
        <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand-green transition-colors duration-300" />
      </div>
    </div>
  );
};
