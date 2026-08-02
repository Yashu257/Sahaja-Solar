/**
 * Sahaja Solar Serverless Quote Request Endpoint (Node.js / Vercel Serverless / Express)
 *
 * PRODUCTION FLOW:
 * 1. Server validation
 * 2. Database persistence (solar_quotes)
 * 3. Business email notification (sahajasolar@gmail.com) AFTER database confirmation
 * 4. Customer quote confirmation email (if valid email provided)
 */

import { dbCreateQuote } from '../src/lib/dbServer';
import { sendQuoteBusinessNotification, sendQuoteCustomerConfirmation } from '../src/lib/emailServer';

export interface QuoteApiRequest {
  name: string;
  phone: string;
  email?: string;
  propertyType: 'residential' | 'commercial';
  location: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  message?: string;
  consent: boolean;
  source?: string;
  calculatorContext?: any;
  conversationSummary?: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data: QuoteApiRequest = req.body;

    // 1. Server-side Input Validation
    if (!data.name || !data.phone || !data.location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required quote fields (name, phone, location).',
      });
    }

    const cleanPhone = data.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid 10-digit Indian phone number.',
      });
    }

    if (!data.consent) {
      return res.status(400).json({
        success: false,
        message: 'Consent is required to submit a quote request.',
      });
    }

    // 2. Database Persistence (Source of Truth)
    const result = await dbCreateQuote({
      name: data.name.trim(),
      phone: cleanPhone,
      email: data.email?.trim(),
      propertyType: data.propertyType,
      location: data.location.trim(),
      monthlyBill: data.monthlyBill,
      interestedCapacityKw: data.interestedCapacityKw,
      message: data.message?.trim(),
      source: data.source || 'website_quote_section',
      calculatorContext: data.calculatorContext,
      conversationSummary: data.conversationSummary,
      consent: data.consent,
    });

    // 3. Email Notifications (ONLY after database persistence confirmation)
    if (result.success) {
      const quotePayload = {
        reference: result.quoteId || 'SSQ-2026-PENDING',
        name: data.name.trim(),
        phone: cleanPhone,
        email: data.email?.trim(),
        propertyType: data.propertyType,
        location: data.location.trim(),
        monthlyBill: data.monthlyBill,
        interestedCapacityKw: data.interestedCapacityKw,
        message: data.message?.trim(),
        source: data.source || 'website_quote_section',
      };

      // Dispatch business notification
      try {
        await sendQuoteBusinessNotification(quotePayload);
      } catch (emailErr) {
        // Email failure must NOT destroy saved quote
        console.error('[Quote API] Business email notification error:', emailErr);
      }

      // Dispatch customer quote confirmation if valid email provided
      if (data.email && data.email.includes('@')) {
        try {
          await sendQuoteCustomerConfirmation(quotePayload);
        } catch (custErr) {
          console.error('[Quote API] Customer quote confirmation error:', custErr);
        }
      }
    }

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Quote API error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error processing quote request.',
    });
  }
}
