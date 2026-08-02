import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SITE_NAV_ITEMS, SAHAJA_COMPANY_INFO } from '@/data/siteConfig';
import { Sun, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition navbar when scrolled past hero threshold (~100px)
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        isScrolled
          ? 'py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg text-slate-900'
          : 'py-5 md:py-6 bg-white/90 backdrop-blur-sm border-b border-slate-200/50 text-slate-900'
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg p-1"
          aria-label="Sahaja Solar Home"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-green flex items-center justify-center text-brand-gold shadow-subtle group-hover:scale-105 transition-transform duration-300">
            <Sun className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base md:text-lg tracking-tight text-slate-900 group-hover:text-brand-green transition-colors duration-200">
              {SAHAJA_COMPANY_INFO.name}
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold -mt-1 hidden sm:block">
              Solar Energy
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {SITE_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-1 text-slate-700 hover:text-slate-900 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="solar"
            size="sm"
            showArrow
            onClick={() => {
              const target = document.querySelector('#quote');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Free Quote
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile Navigation Drawer / Full-Screen Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-[60px] bg-surface-dark/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between p-6 transition-all duration-400 ease-in-out border-t border-white/10',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <div className="flex flex-col gap-4 mt-4">
          <span className="label-tag text-brand-gold mb-2">Navigation Menu</span>
          {SITE_NAV_ITEMS.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-heading font-semibold text-white hover:text-brand-gold transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-white/10">
          <Button
            variant="solar"
            size="lg"
            className="w-full"
            showArrow
            onClick={() => {
              setMobileMenuOpen(false);
              const target = document.querySelector('#quote');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Free Quote
          </Button>

          <p className="text-xs text-slate-400 text-center">
            {SAHAJA_COMPANY_INFO.legalName} • {SAHAJA_COMPANY_INFO.primaryMarket}
          </p>
        </div>
      </div>
    </header>
  );
};
