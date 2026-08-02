/**
 * Quotes API - Production version without TypeScript path aliases
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Email sending
async function sendEmail(to, subject, html) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: false };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Sahaja Solar <notifications@sahajasolar.com>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.name || !data.phone || !data.propertyType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Generate reference
    const ref = `SSQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Insert into database
    const { error: dbError } = await supabase
      .from('solar_quotes')
      .insert([{
        reference: ref,
        customer_name: data.name,
        customer_phone: data.phone,
        customer_email: data.email || null,
        property_type: data.propertyType,
        monthly_bill: data.monthlyBill || null,
        recommended_capacity_kw: data.recommendedCapacityKw || null,
        estimated_cost: data.estimatedCost || null,
        estimated_subsidy: data.estimatedSubsidy || null,
        customer_investment: data.customerInvestment || null,
        source: data.source || 'website',
        consent: data.consent || false,
        status: 'new',
      }]);

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        success: false, 
        message: 'Database error' 
      });
    }

    // Send emails (non-blocking)
    const businessEmails = (process.env.BUSINESS_NOTIFICATION_EMAIL || '').split(',').map(e => e.trim()).filter(Boolean);
    
    if (businessEmails.length > 0) {
      sendEmail(
        businessEmails,
        `New Solar Quote Request - ${ref}`,
        `<h2>New Quote Request</h2><p><strong>Reference:</strong> ${ref}</p><p><strong>Name:</strong> ${data.name}</p><p><strong>Phone:</strong> ${data.phone}</p>`
      ).catch(console.error);
    }

    if (data.email) {
      sendEmail(
        data.email,
        'Your Sahaja Solar Quote Request',
        `<h2>Thank you for your interest!</h2><p>Your reference: ${ref}</p>`
      ).catch(console.error);
    }

    return res.status(200).json({ 
      success: true, 
      quoteId: ref,
      message: 'Quote request received' 
    });

  } catch (error) {
    console.error('Quote API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
