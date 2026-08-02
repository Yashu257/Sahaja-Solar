export interface BrandItem {
  id: string;
  name: string;
  logoUrl?: string;
  verified: boolean;
  enabled: boolean;
  relationship: 'official-partner' | 'supplier' | 'unverified';
}

export const SAHAJA_BRANDS: BrandItem[] = [
  {
    id: 'waaree',
    name: 'Waaree Energies',
    verified: false, // Unverified until confirmed by Sahaja Solar
    enabled: false,
    relationship: 'unverified',
  },
  {
    id: 'tata-power',
    name: 'Tata Power Solar',
    verified: false,
    enabled: false,
    relationship: 'unverified',
  },
  {
    id: 'vikram-solar',
    name: 'Vikram Solar',
    verified: false,
    enabled: false,
    relationship: 'unverified',
  },
  {
    id: 'goldi-solar',
    name: 'Goldi Solar',
    verified: false,
    enabled: false,
    relationship: 'unverified',
  },
];
