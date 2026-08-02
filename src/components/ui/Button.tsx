import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'solar' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      showArrow = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-heading font-medium tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none group active:scale-[0.98]';

    const variants = {
      primary:
        'bg-brand-green text-white hover:bg-brand-green-hover shadow-subtle hover:shadow-card-hover border border-transparent',
      solar:
        'bg-brand-gold text-brand-green-dark hover:bg-brand-gold-hover font-semibold shadow-subtle hover:shadow-gold-glow border border-transparent',
      secondary:
        'border border-brand-green/30 text-brand-green bg-transparent hover:bg-brand-green-light hover:border-brand-green',
      ghost:
        'text-content-primary bg-transparent hover:bg-surface-muted border border-transparent',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs rounded-lg gap-1.5',
      md: 'h-11 md:h-12 px-6 text-sm md:text-base rounded-button gap-2',
      lg: 'h-13 md:h-14 px-8 text-base md:text-lg rounded-button gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span>{children}</span>
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
