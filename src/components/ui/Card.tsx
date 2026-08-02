import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'glass' | 'dark';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hoverEffect = true, children, className, ...props }, ref) => {
    const baseStyles = 'rounded-card p-6 md:p-8 transition-all duration-300 ease-out relative overflow-hidden';

    const variants = {
      default:
        'bg-surface-card border border-surface-border text-content-primary shadow-subtle',
      outline:
        'bg-transparent border border-surface-border text-content-primary',
      glass:
        'glass-panel text-content-primary shadow-subtle',
      dark:
        'bg-surface-dark border border-white/10 text-white shadow-2xl',
    };

    const hoverStyles = hoverEffect
      ? 'hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-card-hover'
      : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
