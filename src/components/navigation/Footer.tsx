import React, { useRef } from 'react';
import { SAHAJA_COMPANY_INFO } from '@/data/siteConfig';
import { ArrowUpRight, ArrowUp, MessageCircle, Sun } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const textRef = useRef<HTMLDivElement>(null);

  const primaryPhone = SAHAJA_COMPANY_INFO.contacts[0].rawPhone; // 8019604025
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    "Hi Sahaja Solar, I'm interested in solar for my property."
  )}`;

  const FOOTER_NAV = [
    { label: 'About Sahaja', href: '#about' },
    { label: 'Why Solar', href: '#why-solar' },
    { label: 'Solutions & Services', href: '#solutions' },
    { label: 'Solar Calculator', href: '#solar-calculator' },
    { label: 'Installation Process', href: '#solar-process' },
    { label: 'Government Subsidy', href: '#subsidy' },
    { label: 'Projects Portfolio', href: '#projects' },
    { label: 'Solar Technology', href: '#products' },
    { label: 'Why Sahaja', href: '#trust' },
    { label: 'Ask Sahaja AI', href: '#solar-assistant' },
    { label: 'Book Consultation', href: '#booking' },
    { label: 'Get Solar Quote', href: '#quote' },
  ];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || !textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    textRef.current.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`);
    textRef.current.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`);
    textRef.current.style.setProperty('--spot-opacity', '1');
  };

  const handlePointerLeave = () => {
    if (!textRef.current) return;
    textRef.current.style.setProperty('--spot-opacity', '0');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051F18] text-white pt-20 pb-28 sm:pb-24 md:pb-20 relative overflow-hidden font-body border-t border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/20 blur-3xl pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Pre-Footer Minimal CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-16 border-b border-white/15">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold block mb-3">
              YOUR SOLAR JOURNEY STARTS HERE
            </span>
            <h3 className="h2 text-white font-heading font-extrabold tracking-tight">
              READY FOR A <br />
              <span className="text-brand-gold">BRIGHTER FUTURE?</span>
            </h3>
          </div>

          <a
            href="#quote"
            className="inline-flex items-center gap-3 text-sm sm:text-base font-heading font-bold uppercase tracking-wider text-white hover:text-brand-gold transition-colors duration-300 group"
          >
            <span>Start Your Solar Journey</span>
            <ArrowUpRight className="w-5 h-5 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* MASSIVE BRAND TYPOGRAPHY HERO STATEMENT */}
        <div
          ref={textRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative my-12 sm:my-16 select-none group"
          style={
            {
              '--spot-x': '50%',
              '--spot-y': '50%',
              '--spot-opacity': '0',
            } as React.CSSProperties
          }
        >
          <div className="text-center md:text-left leading-none tracking-tighter font-heading font-extrabold text-white">
            <div className="text-[clamp(3.8rem,14vw,13rem)] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              SAHAJA
            </div>
            <div className="text-[clamp(3.8rem,14vw,13rem)] uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-white flex items-center justify-center md:justify-start gap-4">
              <span>SOLAR</span>
              <div className="hidden lg:flex w-16 h-16 rounded-full bg-brand-gold text-brand-green items-center justify-center shadow-gold-glow">
                <Sun className="w-8 h-8 animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Pointer Spotlight Overlay on Typography */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10 opacity-[var(--spot-opacity)] hidden md:block"
            style={{
              background: `radial-gradient(400px circle at var(--spot-x) var(--spot-y), rgba(245, 166, 35, 0.2), transparent 70%)`,
            }}
          />
        </div>

        {/* FOOTER INFORMATION GRID (EDITORIAL LAYOUT) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-12 border-t border-b border-white/15">
          {/* Navigation Links Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold block mb-2">
              EXPLORE WEBSITE
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-heading font-semibold text-slate-300">
              {FOOTER_NAV.map((nav) => (
                <a
                  key={nav.href}
                  href={nav.href}
                  className="hover:text-brand-gold transition-colors flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{nav.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Direct Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold block mb-2">
              DIRECT CONTACT
            </span>
            <div className="space-y-3 text-xs text-slate-300 font-medium">
              {SAHAJA_COMPANY_INFO.contacts.map((contact) => (
                <div key={contact.rawPhone} className="flex items-center justify-between">
                  <span className="text-slate-400">{contact.name}:</span>
                  <a
                    href={`tel:${contact.rawPhone}`}
                    className="font-mono font-bold text-white hover:text-brand-gold transition-colors"
                  >
                    +91 {contact.phone}
                  </a>
                </div>
              ))}

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-slate-400">Email:</span>
                <a
                  href={`mailto:${SAHAJA_COMPANY_INFO.email}`}
                  className="font-mono font-bold text-white hover:text-brand-gold transition-colors"
                >
                  {SAHAJA_COMPANY_INFO.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 font-heading font-bold uppercase tracking-wider hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Sahaja Solar →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Location Column (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold block mb-2">
              HEADQUARTERS
            </span>
            <div className="text-xs text-slate-300 leading-relaxed font-mono">
              <span className="font-heading font-bold text-white block mb-1">PAMARRU • KRISHNA</span>
              <p className="text-slate-400">
                #11-228/1, Machalipatnam Road,<br />
                Opp. 132KV S.S, Pamarru,<br />
                Krishna District, AP - 521157
              </p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT & BACK TO TOP ROW */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {currentYear} {SAHAJA_COMPANY_INFO.legalName}. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-white hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 text-brand-gold" />
          </button>
        </div>
      </div>
    </footer>
  );
};
