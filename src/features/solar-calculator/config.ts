import { PricingConfig, CalculatorAssumptions } from './types';

export const CALCULATOR_CONFIG = {
  defaultMode: 'bill' as const,
  defaultPropertyType: 'residential' as const,
  defaultState: 'Andhra Pradesh',
  
  // Bill slider range
  billRange: {
    min: 1000,
    max: 50000,
    step: 500,
    default: 6000,
  },

  // Selectable capacity options in kW
  presetCapacities: [1, 2, 3, 5, 10],

  // State selection options
  statesList: [
    'Andhra Pradesh',
    'Telangana',
    'Karnataka',
    'Tamil Nadu',
    'Other State in India',
  ],

  // Real client pricing table (Set to null until verified client pricing is provided)
  productionPricing: {
    1: { baseCostInr: null, residentialSubsidyInr: null, commercialSubsidyInr: null },
    2: { baseCostInr: null, residentialSubsidyInr: null, commercialSubsidyInr: null },
    3: { baseCostInr: null, residentialSubsidyInr: null, commercialSubsidyInr: null },
    5: { baseCostInr: null, residentialSubsidyInr: null, commercialSubsidyInr: null },
    10: { baseCostInr: null, residentialSubsidyInr: null, commercialSubsidyInr: null },
  } as PricingConfig,

  // Development Preview Pricing Table (Explicitly marked for DEV preview testing ONLY)
  devPreviewPricing: {
    1: { baseCostInr: 75000, residentialSubsidyInr: 30000, commercialSubsidyInr: 0 },
    2: { baseCostInr: 145000, residentialSubsidyInr: 60000, commercialSubsidyInr: 0 },
    3: { baseCostInr: 195000, residentialSubsidyInr: 78000, commercialSubsidyInr: 0 },
    5: { baseCostInr: 310000, residentialSubsidyInr: 78000, commercialSubsidyInr: 0 },
    10: { baseCostInr: 580000, residentialSubsidyInr: 78000, commercialSubsidyInr: 0 },
  } as PricingConfig,

  // General engineering assumptions for yield estimation
  assumptions: {
    avgTariffPerKwh: 7.5, // ₹ 7.5 per unit average DISCOM tariff
    generationKwhPerKwPerDay: 4.2, // ~4.2 units/day per kW in AP solar insolation
    daysInMonth: 30,
  } as CalculatorAssumptions,
};
