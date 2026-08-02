import { QuoteProvider, SolarQuoteRequest } from './types';
import { API_ENDPOINTS } from '@/config/api';

function saveLocalQuote(quote: SolarQuoteRequest) {
  try {
    const existingStr = localStorage.getItem('sahaja_local_quotes');
    const existingArr: SolarQuoteRequest[] = existingStr ? JSON.parse(existingStr) : [];
    existingArr.unshift(quote);
    localStorage.setItem('sahaja_local_quotes', JSON.stringify(existingArr));
  } catch (e) {
    console.error('Failed to save quote to local storage:', e);
  }
}

export class MockQuoteProvider implements QuoteProvider {
  async submitQuote(
    quoteData: Omit<SolarQuoteRequest, 'id' | 'createdAt' | 'status'>
  ): Promise<{
    success: boolean;
    quoteId?: string;
    message?: string;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const quoteId = `SSQ-2026-${randomNum}`;

    const newQuote: SolarQuoteRequest = {
      id: quoteId,
      ...quoteData,
      status: 'new',
      createdAt: Date.now(),
    };

    saveLocalQuote(newQuote);

    return {
      success: true,
      quoteId,
      message: 'Solar enquiry received successfully.',
    };
  }
}

export class ApiQuoteProvider implements QuoteProvider {
  async submitQuote(
    quoteData: Omit<SolarQuoteRequest, 'id' | 'createdAt' | 'status'>
  ): Promise<{
    success: boolean;
    quoteId?: string;
    message?: string;
  }> {
    try {
      const res = await fetch(API_ENDPOINTS.quotes, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });

      if (res.ok || res.status === 400) {
        const data = await res.json();
        if (data.success && data.quoteId) {
          saveLocalQuote({
            id: data.quoteId,
            ...quoteData,
            status: 'new',
            createdAt: Date.now(),
          });
        }
        return data;
      }
    } catch (e) {
      // Local dev fallback if serverless endpoint is unhosted
    }

    const mock = new MockQuoteProvider();
    return mock.submitQuote(quoteData);
  }
}
