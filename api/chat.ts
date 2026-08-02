/**
 * Sahaja Solar Serverless AI Chat Endpoint (Node.js / Vercel Serverless / Express)
 *
 * PRODUCTION PROVIDER: OpenAI API (gpt-4o-mini)
 * SECURITY: Uses OPENAI_API_KEY server-side. Never exposes key to client.
 */

import { SAHAJA_AI_SYSTEM_PROMPT, SAHAJA_SOLAR_KNOWLEDGE } from '../src/lib/sahajaKnowledge';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute per IP

// Simple in-memory rate limiter (for production, consider Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(clientId: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientId);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

export interface ChatApiRequest {
  message: string;
  history?: Array<{ role: 'user' | 'model'; text: string }>;
  calculatorContext?: {
    monthlyBill?: number;
    recommendedCapacityKw?: number;
    estimatedCost?: number;
    estimatedSubsidy?: number;
    customerInvestment?: number;
  };
  leadContext?: {
    name?: string;
    location?: string;
    propertyType?: string;
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Rate limiting by IP
  const clientIp = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
  const rateLimit = checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  try {
    const body: ChatApiRequest = req.body || {};
    const userMessage = (body.message || '').trim();

    if (!userMessage) {
      return res.status(400).json({ success: false, message: 'User message is required.' });
    }

    // Input length validation
    if (userMessage.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Message is too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`,
      });
    }

    // Determine intent action signal
    const lower = userMessage.toLowerCase();
    let actionSignal = 'NONE';
    if (lower.includes('quote') || lower.includes('price') || lower.includes('cost') || lower.includes('buy')) {
      actionSignal = 'OPEN_QUOTE';
    } else if (lower.includes('book') || lower.includes('visit') || lower.includes('call') || lower.includes('meet')) {
      actionSignal = 'OPEN_BOOKING';
    } else if (lower.includes('calc') || lower.includes('savings') || lower.includes('bill')) {
      actionSignal = 'OPEN_CALCULATOR';
    }

    // 1. Fallback when OPENAI_API_KEY is missing in server environment
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.warn('[Chat API] OPENAI_API_KEY missing or placeholder in process.env. Returning structured local response.');

      let reply = 'Sahaja Solar provides residential and commercial rooftop solar solutions engineered for high efficiency in Andhra Pradesh.';
      if (actionSignal === 'OPEN_CALCULATOR') {
        reply = 'You can calculate your estimated solar system capacity, monthly bill savings, and PM Surya Ghar subsidy using our Solar Calculator.';
      } else if (actionSignal === 'OPEN_QUOTE') {
        reply = 'I can help you get a customized solar quote for your home or commercial property in Andhra Pradesh. Let us open the quote form for you.';
      } else if (actionSignal === 'OPEN_BOOKING') {
        reply = 'Our solar engineering team is available for phone consultations and on-site visits in Andhra Pradesh. Let us schedule your appointment.';
      } else if (lower.includes('subsid') || lower.includes('surya')) {
        reply = 'Eligible residential rooftop solar installations qualify under PM Surya Ghar Muft Bijli Yojana for up to 3kW capacity, subject to government DISCOM eligibility criteria.';
      }

      return res.status(200).json({
        success: true,
        reply,
        action: actionSignal,
        provider: 'LOCAL_FALLBACK',
      });
    }

    // 2. Call OpenAI Chat Completions API
    const systemPromptWithContext = `${SAHAJA_AI_SYSTEM_PROMPT}

CURRENT CONTEXT:
${body.calculatorContext ? `Solar Calculator Active Context: Bill ₹${body.calculatorContext.monthlyBill || 'N/A'}, System Sizing: ${body.calculatorContext.recommendedCapacityKw || 'N/A'} kW.` : 'No calculator context.'}
${body.leadContext?.name ? `Customer Name: ${body.leadContext.name}, Location: ${body.leadContext.location || 'AP'}.` : ''}
`;

    // Limit bounded history to last 4 messages to save tokens
    const recentHistory = (body.history || []).slice(-4);

    // Build OpenAI messages array
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPromptWithContext },
    ];

    // Add conversation history
    for (const h of recentHistory) {
      messages.push({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: h.text,
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: userMessage });

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        temperature: 0.3,
        max_tokens: 350,
      }),
    });

    if (!openaiRes.ok) {
      const errData = await openaiRes.json().catch(() => ({}));
      console.error('[Chat API] OpenAI API error:', errData);
      return res.status(200).json({
        success: true,
        reply: "I am having trouble accessing live AI right now. You can still calculate your savings, request a quote, or book a consultation below.",
        action: actionSignal !== 'NONE' ? actionSignal : 'OPEN_QUOTE',
        provider: 'AI_ERROR_FALLBACK',
      });
    }

    const data = await openaiRes.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';

    const reply = assistantMessage.trim() || 'I am ready to assist with your solar requirements in Andhra Pradesh.';

    return res.status(200).json({
      success: true,
      reply,
      action: actionSignal,
      provider: 'OPENAI',
    });
  } catch (err: any) {
    console.error('[Chat API] Exception:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error processing AI response.',
    });
  }
}
