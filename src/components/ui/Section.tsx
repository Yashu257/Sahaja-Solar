import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  dark?: boolean;
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  id,
  dark = false,
  children,
  className,
  ...props
}, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'py-16 md:py-24 lg:py-32 relative overflow-hidden transition-colors duration-500',
        dark ? 'bg-surface-dark text-white' : 'bg-surface-bg text-content-primary',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';
