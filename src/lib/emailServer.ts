/**
 * Sahaja Solar Server-Side Transactional Email Service
 *
 * PRODUCTION EMAIL PROVIDER: Resend REST API (https://api.resend.com/emails)
 * BUSINESS RECIPIENT: sahajasolar@gmail.com
 *
 * SECURITY:
 * - Executes server-side ONLY (never in browser)
 * - Uses RESEND_API_KEY from process.env
 * - Sanitizes all customer inputs against HTML injection
 * - Sets Reply-To header to validated customer email
 */

// Centralized Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Sahaja Solar <notifications@sahajasolar.com>';
const BUSINESS_NOTIFICATION_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL || 'sahajasolar@gmail.com';

// Parse business notification emails (supports comma-separated list)
const BUSINESS_EMAILS = BUSINESS_NOTIFICATION_EMAIL.split(',').map(email => email.trim()).filter(email => email.length > 0);

// HTML Sanitization Helper to prevent email injection attacks
function escapeHtml(str: string | number | undefined | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface SendEmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

// Low-level Resend REST API Client
export async function sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!RESEND_API_KEY) {
    console.warn('[EmailServer] RESEND_API_KEY is not configured in process.env. Email sending skipped safely.');
    return { success: false, error: 'CONFIGURATION REQUIRED: RESEND_API_KEY is missing in server environment.' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: Array.isArray(payload.to) ? payload.to : [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        reply_to: payload.replyTo || undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('[EmailServer] Resend API error:', data);
      return { success: false, error: data.message || 'Resend email dispatch failed.' };
    }

    return { success: true, messageId: data.id };
  } catch (err: any) {
    console.error('[EmailServer] Network exception during email dispatch:', err);
    return { success: false, error: err.message || 'Network exception during email dispatch.' };
  }
}

// ============================================================================
// 1. QUOTE BUSINESS NOTIFICATION EMAIL
// ============================================================================
export interface QuoteEmailData {
  reference: string;
  name: string;
  phone: string;
  email?: string;
  propertyType: string;
  location: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  message?: string;
  source?: string;
}

export async function sendQuoteBusinessNotification(data: QuoteEmailData) {
  const safeName = escapeHtml(data.name);
  const safePhone = escapeHtml(data.phone);
  const safeEmail = escapeHtml(data.email);
  const safeLocation = escapeHtml(data.location);
  const safePropertyType = escapeHtml(data.propertyType);
  const safeMessage = escapeHtml(data.message);
  const safeRef = escapeHtml(data.reference);

  const subject = `New Solar Quote Enquiry — ${safeRef}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; color: #111814; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 14px;">
        <div style="background: #0A4D3C; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #F5A623;">SAHAJA SOLAR</h1>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">New Solar Quote Enquiry Received</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Enquiry Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #0A4D3C;">${safeRef}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Customer Name:</td><td style="padding: 8px 0;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone Number:</td><td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #0A4D3C; text-decoration: none;">${safePhone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${safeEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Property Type:</td><td style="padding: 8px 0; text-transform: capitalize;">${safePropertyType}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">City / Location:</td><td style="padding: 8px 0;">${safeLocation}</td></tr>
            ${data.monthlyBill ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Monthly Electricity Bill:</td><td style="padding: 8px 0;">₹${escapeHtml(data.monthlyBill)}</td></tr>` : ''}
            ${data.interestedCapacityKw ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Interested Capacity:</td><td style="padding: 8px 0;">${escapeHtml(data.interestedCapacityKw)} kW</td></tr>` : ''}
          </table>
          ${data.message ? `
            <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-left: 4px solid #F5A623; border-radius: 4px;">
              <strong style="color: #64748b; display: block; margin-bottom: 4px;">Requirement Message:</strong>
              <p style="margin: 0;">${safeMessage}</p>
            </div>
          ` : ''}
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          Sahaja Solar Energy Solutions Pvt. Ltd. • Machalipatnam Road, Pamarru, AP
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: BUSINESS_EMAILS,
    subject,
    html,
    replyTo: data.email && data.email.includes('@') ? data.email : undefined,
  });
}

// ============================================================================
// 1B. CUSTOMER QUOTE CONFIRMATION EMAIL
// ============================================================================
export async function sendQuoteCustomerConfirmation(data: QuoteEmailData) {
  if (!data.email || !data.email.includes('@')) {
    return { success: false, error: 'Customer email address missing or invalid.' };
  }

  const safeName = escapeHtml(data.name);
  const safeRef = escapeHtml(data.reference);
  const safePhone = escapeHtml(data.phone);
  const safeLocation = escapeHtml(data.location);

  const subject = `Sahaja Solar Quote Request Received — ${safeRef}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; color: #111814; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 14px;">
        <div style="background: #0A4D3C; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; font-weight: bold; color: #F5A623;">SAHAJA SOLAR</h1>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Clean Energy Solutions for India</p>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 16px; margin-top: 0;">Dear <strong>${safeName}</strong>,</p>
          <p style="line-height: 1.6;">Thank you for your interest in solar energy solutions with Sahaja Solar. We have successfully received your solar quote request.</p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <h3 style="margin: 0 0 12px 0; color: #0A4D3C; font-size: 15px;">Your Quote Request Summary</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 6px 0; color: #64748b;">Quote Reference:</td><td style="padding: 6px 0; font-weight: bold; color: #0A4D3C;">${safeRef}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Location:</td><td style="padding: 6px 0;">${safeLocation}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Property Type:</td><td style="padding: 6px 0; text-transform: capitalize;">${escapeHtml(data.propertyType)}</td></tr>
              ${data.monthlyBill ? `<tr><td style="padding: 6px 0; color: #64748b;">Monthly Electricity Bill:</td><td style="padding: 6px 0;">₹${escapeHtml(data.monthlyBill)}</td></tr>` : ''}
            </table>
          </div>

          <p style="line-height: 1.6;">Our solar engineering team will review your requirements and contact you on <strong>${safePhone}</strong> within 24-48 hours to discuss customized solar solutions for your property.</p>
          
          <p style="line-height: 1.6; background: #FFF7ED; border-left: 4px solid #F5A623; padding: 12px; margin: 16px 0; font-size: 13px;">
            <strong style="color: #92400E;">What happens next?</strong><br/>
            Our team will prepare a detailed solar assessment including system sizing, estimated savings, government subsidy eligibility, and financing options tailored to your needs.
          </p>

          <p style="margin-top: 24px; line-height: 1.6;">Best regards,<br/><strong>Sahaja Solar Energy Solutions Team</strong><br/>
          Pamarru, Krishna District, Andhra Pradesh<br/>
          Primary Contact: <a href="tel:918019604025" style="color: #0A4D3C;">+91 80196 04025</a></p>
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          Sahaja Solar Energy Solutions Pvt. Ltd. • Machalipatnam Road, Pamarru, AP - 521157
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: data.email,
    subject,
    html,
  });
}

// ============================================================================
// 2. BOOKING BUSINESS NOTIFICATION EMAIL
// ============================================================================
export interface BookingEmailData {
  reference: string;
  name: string;
  phone: string;
  email?: string;
  consultationType: string;
  propertyType: string;
  location: string;
  date: string;
  timeSlot: string;
  timezone?: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
}

export async function sendBookingBusinessNotification(data: BookingEmailData) {
  const safeName = escapeHtml(data.name);
  const safePhone = escapeHtml(data.phone);
  const safeEmail = escapeHtml(data.email);
  const safeLocation = escapeHtml(data.location);
  const safeConsultType = escapeHtml(data.consultationType === 'site_visit' ? 'In-Person Site Visit' : 'Phone / Video Call');
  const safeDate = escapeHtml(data.date);
  const safeTimeSlot = escapeHtml(data.timeSlot);
  const safeRef = escapeHtml(data.reference);

  const subject = `New Solar Consultation Booking — ${safeRef}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; color: #111814; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 14px;">
        <div style="background: #0A4D3C; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #F5A623;">SAHAJA SOLAR</h1>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">New Consultation Booking Received</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Booking Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #0A4D3C;">${safeRef}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Customer Name:</td><td style="padding: 8px 0;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone Number:</td><td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #0A4D3C; text-decoration: none;">${safePhone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${safeEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Consultation Type:</td><td style="padding: 8px 0; font-weight: bold;">${safeConsultType}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Requested Date & Time:</td><td style="padding: 8px 0; font-weight: bold; color: #F5A623;">${safeDate} @ ${safeTimeSlot} IST</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">City / Location:</td><td style="padding: 8px 0;">${safeLocation}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Property Type:</td><td style="padding: 8px 0; text-transform: capitalize;">${escapeHtml(data.propertyType)}</td></tr>
            ${data.interestedCapacityKw ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Interested Capacity:</td><td style="padding: 8px 0;">${escapeHtml(data.interestedCapacityKw)} kW</td></tr>` : ''}
          </table>
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          Sahaja Solar Energy Solutions Pvt. Ltd. • Machalipatnam Road, Pamarru, AP
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: BUSINESS_EMAILS,
    subject,
    html,
    replyTo: data.email && data.email.includes('@') ? data.email : undefined,
  });
}

// ============================================================================
// 3. CUSTOMER BOOKING CONFIRMATION EMAIL
// ============================================================================
export async function sendBookingCustomerConfirmation(data: BookingEmailData) {
  if (!data.email || !data.email.includes('@')) {
    return { success: false, error: 'Customer email address missing or invalid.' };
  }

  const safeName = escapeHtml(data.name);
  const safeConsultType = escapeHtml(data.consultationType === 'site_visit' ? 'In-Person Site Visit' : 'Phone Consultation');
  const safeDate = escapeHtml(data.date);
  const safeTimeSlot = escapeHtml(data.timeSlot);
  const safeRef = escapeHtml(data.reference);

  const subject = `Sahaja Solar Consultation Request Received — ${safeRef}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; color: #111814; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 14px;">
        <div style="background: #0A4D3C; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; font-weight: bold; color: #F5A623;">SAHAJA SOLAR</h1>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Clean Energy Solutions for India</p>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 16px; margin-top: 0;">Dear <strong>${safeName}</strong>,</p>
          <p style="line-height: 1.6;">Thank you for contacting Sahaja Solar. We have received your consultation request. Our solar engineering team is reviewing your details.</p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <h3 style="margin: 0 0 12px 0; color: #0A4D3C; font-size: 15px;">Your Consultation Request Summary</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 6px 0; color: #64748b;">Booking Reference:</td><td style="padding: 6px 0; font-weight: bold; color: #0A4D3C;">${safeRef}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Consultation Type:</td><td style="padding: 6px 0; font-weight: bold;">${safeConsultType}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Requested Date:</td><td style="padding: 6px 0; font-weight: bold;">${safeDate}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Requested Time Slot:</td><td style="padding: 6px 0; font-weight: bold; color: #F5A623;">${safeTimeSlot} IST</td></tr>
            </table>
          </div>

          <p style="line-height: 1.6;">A Sahaja Solar representative will reach out to you on <strong>${escapeHtml(data.phone)}</strong> to confirm your appointment and provide initial technical guidance.</p>
          
          <p style="margin-top: 24px; line-height: 1.6;">Best regards,<br/><strong>Sahaja Solar Energy Solutions Team</strong><br/>
          Pamarru, Krishna District, Andhra Pradesh<br/>
          Primary Contact: <a href="tel:918019604025" style="color: #0A4D3C;">+91 80196 04025</a></p>
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          Sahaja Solar Energy Solutions Pvt. Ltd. • Machalipatnam Road, Pamarru, AP - 521157
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: data.email,
    subject,
    html,
  });
}
