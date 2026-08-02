import { PropertyType } from '@/features/solar-calculator/types';

export type QuoteStatus = 'new' | 'contacted' | 'qualified' | 'quoted' | 'closed';

export interface SolarQuoteRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyType: PropertyType;
  location: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  message?: string;
  calculatorContext?: any;
  conversationSummary?: string;
  bookingId?: string;
  source: string;
  consent: boolean;
  status: QuoteStatus;
  createdAt: number;
}

export interface QuoteProvider {
  submitQuote(
    quoteData: Omit<SolarQuoteRequest, 'id' | 'createdAt' | 'status'>
  ): Promise<{
    success: boolean;
    quoteId?: string;
    message?: string;
  }>;
}
