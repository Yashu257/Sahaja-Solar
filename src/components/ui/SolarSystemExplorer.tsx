import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOLAR_PRODUCT_CATEGORIES } from '@/data/solarProductsData';
import { Sun, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SolarSystemExplorer: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('modules');
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const activeProduct = SOLAR_PRODUCT_CATEGORIES.find((p) => p.id === activeCategoryId)!;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    imageContainerRef.current.style.setProperty('--glass-x', `${(x / rect.width) * 100}%`);
    imageContainerRef.current.style.setProperty('--glass-y', `${(y / rect.height) * 100}%`);
    imageContainerRef.current.style.setProperty('--glass-opacity', '1');
  };

  const handlePointerLeave = () => {
    if (!imageContainerRef.current) return;
    imageContainerRef.current.style.setProperty('--glass-opacity', '0');
  };

  return (
    <div className="w-full bg-surface-dark text-white rounded-card border border-white/10 shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
      {/* Background Subtle Solar Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />

      {/* Energy Flow Diagram Bar */}
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-10 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 text-brand-gold font-bold">
            <Sun className="w-4 h-4 animate-spin-slow" />
            <span>SUNLIGHT</span>
          </div>

          <div className="h-0.5 w-12 bg-gradient-to-r from-brand-gold to-brand-green relative">
            <div className="absolute inset-0 bg-brand-gold animate-pulse" />
          </div>

          <div className={cn('px-3 py-1.5 rounded-lg border transition-all', activeCategoryId === 'modules' ? 'bg-brand-green text-white border-brand-gold' : 'bg-white/5 border-white/10 text-slate-300')}>
            01 SOLAR MODULE
          </div>

          <div className="h-0.5 w-12 bg-brand-green" />

          <div className={cn('px-3 py-1.5 rounded-lg border transition-all', activeCategoryId === 'inverters' ? 'bg-brand-green text-white border-brand-gold' : 'bg-white/5 border-white/10 text-slate-300')}>
            02 INVERTER
          </div>

          <div className="h-0.5 w-12 bg-brand-green" />

          <div className={cn('px-3 py-1.5 rounded-lg border transition-all', activeCategoryId === 'protection' || activeCategoryId === 'bos' ? 'bg-brand-green text-white border-brand-gold' : 'bg-white/5 border-white/10 text-slate-300')}>
            03 BOS & PROTECTION
          </div>

          <div className="h-0.5 w-12 bg-gradient-to-r from-brand-green to-brand-gold" />

          <div className="flex items-center gap-1.5 text-white font-bold bg-brand-gold/20 px-3 py-1.5 rounded-lg border border-brand-gold/40">
            <Zap className="w-3.5 h-3.5 text-brand-gold" />
            <span>PROPERTY POWER</span>
          </div>
        </div>
      </div>

      {/* Category Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {SOLAR_PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategoryId(cat.id)}
            className={cn(
              'py-3.5 px-4 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-between border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
              activeCategoryId === cat.id
                ? 'bg-brand-green text-white border-brand-gold shadow-gold-glow'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
            )}
          >
            <span>{cat.index} {cat.category.toUpperCase()}</span>
            <ArrowRight className={cn('w-3.5 h-3.5 transition-transform', activeCategoryId === cat.id ? 'translate-x-1 text-brand-gold' : 'opacity-0')} />
          </button>
        ))}
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Product Visual Container with Subtle Pointer Reflection */}
        <div
          ref={imageContainerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="lg:col-span-7 relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden bg-surface-dark border border-white/15 shadow-subtle group"
          style={
            {
              '--glass-x': '50%',
              '--glass-y': '50%',
              '--glass-opacity': '0',
            } as React.CSSProperties
          }
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeProduct.id}
              src={activeProduct.image}
              alt={activeProduct.title}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-transparent to-transparent pointer-events-none" />

          {/* Glass Reflection Pointer Effect */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10 opacity-[var(--glass-opacity)]"
            style={{
              background: `radial-gradient(350px circle at var(--glass-x) var(--glass-y), rgba(255, 255, 255, 0.25), transparent 75%)`,
            }}
          />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
            <span className="font-mono text-xs text-brand-gold font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              {activeProduct.index} — {activeProduct.category}
            </span>
            <span className="text-[10px] text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              High Performance Component
            </span>
          </div>
        </div>

        {/* Product Information Details Column */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <span className="label-tag text-brand-gold block mb-2">{activeProduct.category}</span>
                <h3 className="h2 text-white font-heading font-bold tracking-tight whitespace-pre-line">
                  {activeProduct.title}
                </h3>
              </div>

              <p className="body-main text-slate-300 leading-relaxed">
                {activeProduct.description}
              </p>

              {activeProduct.explanationNote && (
                <div className="p-3 bg-brand-green/20 border border-brand-green/40 rounded-xl text-xs text-brand-gold font-medium">
                  {activeProduct.explanationNote}
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  Key Quality Considerations
                </span>
                <div className="space-y-2.5">
                  {activeProduct.considerations.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
