export type CalculationMode = 'bill' | 'capacity';
export type PropertyType = 'residential' | 'commercial';

export interface SolarCalculatorInput {
  mode: CalculationMode;
  monthlyBill: number; // in INR ₹
  capacityKw: number; // in kW
  propertyType: PropertyType;
  stateLocation: string;
}

export interface SolarCalculatorResult {
  recommendedCapacityKw: number;
  estimatedSystemCost: number | null;
  estimatedSubsidy: number | null;
  estimatedFinalCost: number | null;
  monthlyGenerationKwh: number | null;
  monthlySavingsInr: number | null;
  paybackPeriodYears: number | null;
  isConfigured: boolean;
  notes: string[];
}

export interface PricingConfig {
  [capacityKw: number]: {
    baseCostInr: number | null;
    residentialSubsidyInr: number | null;
    commercialSubsidyInr: number | null;
  };
}

export interface CalculatorAssumptions {
  avgTariffPerKwh: number; // e.g. 7.5 INR per unit
  generationKwhPerKwPerDay: number; // e.g. 4.2 units per kW per day
  daysInMonth: number; // 30
}
