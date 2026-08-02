import { SolarCalculatorInput, SolarCalculatorResult } from './types';
import { CALCULATOR_CONFIG } from './config';

/**
 * Pure calculation engine for Sahaja Solar calculator.
 * Gracefully handles production unconfigured state vs dev preview state.
 */
export function calculateSolarEstimate(
  input: SolarCalculatorInput,
  useDevPreviewPricing = false
): SolarCalculatorResult {
  const assumptions = CALCULATOR_CONFIG.assumptions;
  const pricingTable = useDevPreviewPricing
    ? CALCULATOR_CONFIG.devPreviewPricing
    : CALCULATOR_CONFIG.productionPricing;

  let recommendedCapacityKw = 1;

  if (input.mode === 'bill') {
    // Estimate monthly kWh requirement: Monthly Bill / Average DISCOM Tariff
    const estimatedMonthlyUnits = input.monthlyBill / assumptions.avgTariffPerKwh;
    // Estimate kW required: Monthly Units / (4.2 units/day * 30 days)
    const requiredKw = estimatedMonthlyUnits / (assumptions.generationKwhPerKwPerDay * assumptions.daysInMonth);
    // Round to nearest practical capacity tier
    recommendedCapacityKw = Math.max(1, Math.round(requiredKw));
  } else {
    recommendedCapacityKw = Math.max(1, Math.min(100, Math.round(input.capacityKw)));
  }

  // Lookup pricing for closest preset capacity
  const presetCapacities = Object.keys(pricingTable).map(Number);
  const closestPreset = presetCapacities.reduce((prev, curr) =>
    Math.abs(curr - recommendedCapacityKw) < Math.abs(prev - recommendedCapacityKw) ? curr : prev
  );

  const priceItem = pricingTable[closestPreset];
  const isConfigured = priceItem && priceItem.baseCostInr !== null;

  if (!isConfigured) {
    // Safe production unconfigured state
    const monthlyGen = Math.round(recommendedCapacityKw * assumptions.generationKwhPerKwPerDay * assumptions.daysInMonth);
    const monthlySave = Math.round(monthlyGen * assumptions.avgTariffPerKwh);

    return {
      recommendedCapacityKw,
      estimatedSystemCost: null,
      estimatedSubsidy: null,
      estimatedFinalCost: null,
      monthlyGenerationKwh: monthlyGen,
      monthlySavingsInr: monthlySave,
      paybackPeriodYears: null,
      isConfigured: false,
      notes: [
        'Pricing configuration pending official Sahaja Solar rate card.',
        'Generation & bill reduction estimates are based on typical Andhra Pradesh solar insolation.',
      ],
    };
  }

  // Configured pricing logic
  const baseCost = priceItem.baseCostInr!;
  const subsidy =
    input.propertyType === 'residential'
      ? priceItem.residentialSubsidyInr || 0
      : priceItem.commercialSubsidyInr || 0;

  const finalCost = Math.max(0, baseCost - subsidy);
  const monthlyGenerationKwh = Math.round(
    recommendedCapacityKw * assumptions.generationKwhPerKwPerDay * assumptions.daysInMonth
  );
  const monthlySavingsInr = Math.round(monthlyGenerationKwh * assumptions.avgTariffPerKwh);
  const paybackPeriodYears =
    monthlySavingsInr > 0 ? parseFloat((finalCost / (monthlySavingsInr * 12)).toFixed(1)) : null;

  return {
    recommendedCapacityKw,
    estimatedSystemCost: baseCost,
    estimatedSubsidy: subsidy,
    estimatedFinalCost: finalCost,
    monthlyGenerationKwh,
    monthlySavingsInr,
    paybackPeriodYears,
    isConfigured: true,
    notes: [
      'Indicative estimate based on configured DISCOM & PM Surya Ghar guidelines.',
    ],
  };
}

/**
 * Formats numbers into Indian Rupees format (e.g. ₹ 1,25,000)
 */
export function formatIndianCurrency(amount: number | null): string {
  if (amount === null || isNaN(amount)) return 'Pending Quote';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
