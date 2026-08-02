import React, { useState, useId } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CalculationMode,
  PropertyType,
  SolarCalculatorInput,
  SolarCalculatorResult,
} from './types';
import { CALCULATOR_CONFIG } from './config';
import { calculateSolarEstimate, formatIndianCurrency } from './calculatorEngine';
import {
  Sun,
  Building2,
  Home as HomeIcon,
  Calculator,
  ShieldAlert,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const SolarCalculator: React.FC = () => {
  const billInputId = useId();
  const capacityInputId = useId();
  const propertyTypeId = useId();
  const stateInputId = useId();

  // Input states
  const [mode, setMode] = useState<CalculationMode>(CALCULATOR_CONFIG.defaultMode);
  const [monthlyBill, setMonthlyBill] = useState<number>(CALCULATOR_CONFIG.billRange.default);
  const [capacityKw, setCapacityKw] = useState<number>(3);
  const [isCustomCapacity, setIsCustomCapacity] = useState<boolean>(false);
  const [propertyType, setPropertyType] = useState<PropertyType>(CALCULATOR_CONFIG.defaultPropertyType);
  const [stateLocation, setStateLocation] = useState<string>(CALCULATOR_CONFIG.defaultState);

  // Dev preview mode toggle for development testing
  const [useDevPreview, setUseDevPreview] = useState<boolean>(false);

  // Calculated results state
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);
  const [result, setResult] = useState<SolarCalculatorResult>(() =>
    calculateSolarEstimate(
      {
        mode: CALCULATOR_CONFIG.defaultMode,
        monthlyBill: CALCULATOR_CONFIG.billRange.default,
        capacityKw: 3,
        propertyType: CALCULATOR_CONFIG.defaultPropertyType,
        stateLocation: CALCULATOR_CONFIG.defaultState,
      },
      false
    )
  );

  const handleCalculate = () => {
    const input: SolarCalculatorInput = {
      mode,
      monthlyBill: Math.max(1000, Math.min(100000, monthlyBill)),
      capacityKw: Math.max(1, Math.min(100, capacityKw)),
      propertyType,
      stateLocation,
    };
    const res = calculateSolarEstimate(input, useDevPreview);
    setResult(res);
    setHasCalculated(true);
  };

  return (
    <div className="w-full bg-surface-card rounded-card border border-surface-border shadow-2xl p-6 sm:p-8 md:p-12 overflow-hidden text-content-primary">
      {/* Dev Preview Toggle Bar */}
      <div className="flex items-center justify-between bg-surface-muted p-3 px-4 rounded-xl mb-8 border border-surface-border text-xs">
        <span className="flex items-center gap-2 text-content-secondary font-medium">
          <Info className="w-4 h-4 text-brand-green" />
          <span>Rate Card Status: {useDevPreview ? 'Dev Preview Active' : 'Production Unconfigured'}</span>
        </span>
        <button
          onClick={() => {
            const nextVal = !useDevPreview;
            setUseDevPreview(nextVal);
            setResult(
              calculateSolarEstimate(
                { mode, monthlyBill, capacityKw, propertyType, stateLocation },
                nextVal
              )
            );
          }}
          className="text-brand-green hover:text-brand-green-hover font-semibold underline focus-visible:outline-none"
        >
          {useDevPreview ? 'Switch to Production Unconfigured' : 'Test Dev Preview Rates'}
        </button>
      </div>

      {/* Mode Segmented Toggle Bar */}
      <div className="grid grid-cols-2 p-1.5 bg-surface-muted rounded-2xl border border-surface-border mb-10 max-w-lg mx-auto">
        <button
          onClick={() => {
            setMode('bill');
            setHasCalculated(false);
          }}
          className={cn(
            'py-3 px-4 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
            mode === 'bill'
              ? 'bg-brand-green text-white shadow-subtle'
              : 'text-content-secondary hover:text-content-primary'
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>BY ELECTRICITY BILL</span>
        </button>

        <button
          onClick={() => {
            setMode('capacity');
            setHasCalculated(false);
          }}
          className={cn(
            'py-3 px-4 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
            mode === 'capacity'
              ? 'bg-brand-green text-white shadow-subtle'
              : 'text-content-secondary hover:text-content-primary'
          )}
        >
          <Sun className="w-4 h-4" />
          <span>BY SOLAR CAPACITY</span>
        </button>
      </div>

      {/* Main Split Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-7 space-y-8">
          {mode === 'bill' ? (
            /* MODE A: Electricity Bill Input */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label htmlFor={billInputId} className="font-heading font-bold text-sm text-content-primary uppercase tracking-wider">
                  Average Monthly Bill
                </label>
                <span className="text-xs text-content-muted font-mono">Range: ₹1,000 – ₹50,000+</span>
              </div>

              {/* Large Currency Input Box */}
              <div className="relative flex items-center bg-surface-muted rounded-2xl border border-surface-border p-4 px-6 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/20 transition-all">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-green mr-2">₹</span>
                <input
                  id={billInputId}
                  type="number"
                  min={1000}
                  max={100000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full bg-transparent font-heading font-extrabold text-2xl sm:text-3xl text-content-primary focus:outline-none"
                />
              </div>

              {/* Custom Styled Interactive Range Slider */}
              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min={CALCULATOR_CONFIG.billRange.min}
                  max={CALCULATOR_CONFIG.billRange.max}
                  step={CALCULATOR_CONFIG.billRange.step}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2.5 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-brand-green focus:outline-none"
                />
                <div className="flex justify-between text-xs font-mono text-content-muted">
                  <span>₹ 1,000</span>
                  <span>₹ 25,000</span>
                  <span>₹ 50,000+</span>
                </div>
              </div>
            </div>
          ) : (
            /* MODE B: Solar Capacity Selection */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label htmlFor={capacityInputId} className="font-heading font-bold text-sm text-content-primary uppercase tracking-wider">
                  Select Solar System Capacity
                </label>
                <span className="text-xs text-content-muted font-mono">1 kW to 100 kW</span>
              </div>

              {/* Preset Capacity Buttons Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {CALCULATOR_CONFIG.presetCapacities.map((cap) => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => {
                      setCapacityKw(cap);
                      setIsCustomCapacity(false);
                    }}
                    className={cn(
                      'py-3 rounded-xl font-heading font-bold text-sm transition-all duration-200 border text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                      capacityKw === cap && !isCustomCapacity
                        ? 'bg-brand-green text-white border-brand-green shadow-subtle'
                        : 'bg-surface-muted text-content-primary border-surface-border hover:border-brand-green/40'
                    )}
                  >
                    {cap} kW
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustomCapacity(true)}
                  className={cn(
                    'py-3 rounded-xl font-heading font-bold text-sm transition-all duration-200 border text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                    isCustomCapacity
                      ? 'bg-brand-green text-white border-brand-green shadow-subtle'
                      : 'bg-surface-muted text-content-primary border-surface-border hover:border-brand-green/40'
                  )}
                >
                  Custom
                </button>
              </div>

              {/* Custom Input Field if selected */}
              {isCustomCapacity && (
                <div className="pt-2">
                  <label htmlFor={capacityInputId} className="block text-xs font-semibold text-content-secondary mb-2">
                    Enter Required Capacity (kW):
                  </label>
                  <input
                    id={capacityInputId}
                    type="number"
                    min={1}
                    max={100}
                    value={capacityKw}
                    onChange={(e) => setCapacityKw(Math.max(1, Math.min(100, Number(e.target.value))))}
                    className="w-full bg-surface-muted rounded-xl border border-surface-border p-3 px-4 font-heading font-bold text-lg text-content-primary focus:outline-none focus:border-brand-green"
                  />
                </div>
              )}
            </div>
          )}

          {/* Property Type Selection */}
          <div className="space-y-3">
            <label id={propertyTypeId} className="font-heading font-bold text-sm text-content-primary uppercase tracking-wider block">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPropertyType('residential')}
                className={cn(
                  'p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                  propertyType === 'residential'
                    ? 'border-brand-green bg-brand-green-light/40 text-brand-green font-bold'
                    : 'border-surface-border bg-surface-muted text-content-secondary hover:border-surface-border'
                )}
              >
                <HomeIcon className="w-5 h-5" />
                <div>
                  <span className="block font-heading font-bold text-sm">Residential</span>
                  <span className="text-[11px] text-content-muted">Home / Rooftop</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPropertyType('commercial')}
                className={cn(
                  'p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                  propertyType === 'commercial'
                    ? 'border-brand-green bg-brand-green-light/40 text-brand-green font-bold'
                    : 'border-surface-border bg-surface-muted text-content-secondary hover:border-surface-border'
                )}
              >
                <Building2 className="w-5 h-5" />
                <div>
                  <span className="block font-heading font-bold text-sm">Commercial</span>
                  <span className="text-[11px] text-content-muted">Business / Industrial</span>
                </div>
              </button>
            </div>
          </div>

          {/* Optional State Dropdown */}
          <div className="space-y-2">
            <label htmlFor={stateInputId} className="font-heading font-bold text-xs text-content-secondary uppercase tracking-wider block">
              Installation Location
            </label>
            <select
              id={stateInputId}
              value={stateLocation}
              onChange={(e) => setStateLocation(e.target.value)}
              className="w-full bg-surface-muted rounded-xl border border-surface-border p-3 px-4 text-sm font-medium text-content-primary focus:outline-none focus:border-brand-green"
            >
              {CALCULATOR_CONFIG.statesList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Main Action Button */}
          <Button
            variant="solar"
            size="lg"
            className="w-full shadow-gold-glow"
            showArrow
            onClick={handleCalculate}
          >
            Calculate My Solar
          </Button>
        </div>

        {/* Right Column: Result Panel */}
        <div className="lg:col-span-5">
          <div className="bg-surface-dark text-white rounded-card p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <span className="label-tag text-brand-gold">YOUR SOLAR ESTIMATE</span>
              <Sun className="w-5 h-5 text-brand-gold" />
            </div>

            {hasCalculated ? (
              <div aria-live="polite" className="space-y-6">
                {/* Recommended Capacity Hero Metric */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                  <span className="text-xs uppercase font-semibold tracking-wider text-slate-300 block mb-1">
                    Recommended System Capacity
                  </span>
                  <div className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-gold tracking-tight">
                    {result.recommendedCapacityKw} <span className="text-2xl text-white">kW</span>
                  </div>

                  {/* Abstract Solar Panel Tile Visualization */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono w-full mb-1">Capacity Tile Visual</span>
                    {Array.from({ length: Math.min(10, result.recommendedCapacityKw) }).map((_, i) => (
                      <div key={i} className="w-5 h-7 rounded bg-brand-green border border-brand-gold/60 flex items-center justify-center">
                        <div className="w-3 h-4 border-t border-l border-brand-gold/40" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimate Breakdown Metrics */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-300">Estimated System Cost</span>
                    <span className="font-heading font-bold text-white">
                      {result.isConfigured ? formatIndianCurrency(result.estimatedSystemCost) : 'Pending Configuration'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-300">Applicable Subsidy</span>
                    <span className="font-heading font-bold text-brand-gold">
                      {result.isConfigured ? formatIndianCurrency(result.estimatedSubsidy) : 'Pending Verification'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-300 font-bold">Estimated Final Investment</span>
                    <span className="font-heading font-extrabold text-white text-base">
                      {result.isConfigured ? formatIndianCurrency(result.estimatedFinalCost) : 'Request Quote'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-300">Est. Monthly Generation</span>
                    <span className="font-heading font-bold text-slate-100">
                      ~{result.monthlyGenerationKwh || '—'} kWh / units
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-300">Est. Monthly Bill Savings</span>
                    <span className="font-heading font-bold text-brand-gold">
                      ~{formatIndianCurrency(result.monthlySavingsInr)} / mo
                    </span>
                  </div>
                </div>

                {/* Status Badges & Notes */}
                {!result.isConfigured && (
                  <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-3 text-xs text-brand-gold flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Official Sahaja Solar rate card configuration pending. Request exact quote below for guaranteed pricing.</span>
                  </div>
                )}

                {/* Action CTA */}
                <Button
                  variant="solar"
                  size="md"
                  className="w-full shadow-gold-glow mt-4"
                  showArrow
                  onClick={() => {
                    const target = document.querySelector('#quote');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Exact Quote
                </Button>
              </div>
            ) : (
              /* Empty Initial State */
              <div className="py-12 text-center text-slate-300 space-y-4">
                <Calculator className="w-12 h-12 text-brand-gold mx-auto" />
                <p className="small-text text-slate-300 max-w-xs mx-auto">
                  Enter your electricity bill or select a solar capacity to generate an estimate.
                </p>
              </div>
            )}

            {/* Disclaimers */}
            <p className="text-[10px] text-slate-400 mt-6 pt-4 border-t border-white/10 leading-normal">
              Disclaimer: All calculator outputs are indicative estimates only. Final system capacity, generation, pricing, subsidy eligibility, and savings may vary based on site conditions, DISCOM policies, and equipment selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
