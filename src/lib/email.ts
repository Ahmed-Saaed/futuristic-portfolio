import { Resend } from 'resend';
import type { ContactFormInput } from '@/lib/validation';

export const CONTACT_RECIPIENT_EMAIL = 'ahmed.saaed.abdelgel@gmail.com';

export interface SendContactEmailResult {
  sent: boolean;
  code: 'SENT' | 'CONFIG_NEEDED' | 'DELIVERY_ERROR';
  message: string;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends a structured inquiry email via Resend to `ahmed.saaed.abdelgel@gmail.com`.
 * Supports both 'hire' (Recruitment & Engineering Opportunities) and 'work' (Freelance & Product Inquiries).
 */
export async function sendContactInquiryEmail(
  data: ContactFormInput
): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return {
      sent: false,
      code: 'CONFIG_NEEDED',
      message:
        'Resend email delivery is not configured yet (RESEND_API_KEY is missing in environment variables). You can send your inquiry directly to ahmed.saaed.abdelgel@gmail.com below.',
    };
  }

  const resend = new Resend(apiKey);
  const fromAddress =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Ahmed Sa'ed Portfolio <onboarding@resend.dev>";

  const isHireMode = data.mode === 'hire';
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeCompany = escapeHtml(data.company || 'Not specified');
  const safeRole = escapeHtml(data.roleTitle || 'Not specified');
  const safeInquiryType = escapeHtml(data.inquiryType || 'Not specified');
  const safeBudget = escapeHtml(data.budgetRange || 'Not specified');
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');

  const subjectLine = isHireMode
    ? `[Hiring / Role Inquiry] ${data.roleTitle || 'Engineering Role'} at ${data.company || data.name}`
    : `[Project Inquiry] ${data.inquiryType || 'Project'} — from ${data.name}`;

  const badgeLabel = isHireMode
    ? 'AHMED SA’ED // ENGINEERING ROLE INQUIRY'
    : 'AHMED SA’ED // PRODUCT & FREELANCE INQUIRY';

  const accentHex = isHireMode ? '#E5BE78' : '#00D5E8';

  const contextRowsHtml = isHireMode
    ? `
      <tr>
        <td style="padding:12px 16px;color:#92949B;font-size:12px;border-bottom:1px solid #30343A;">Company</td>
        <td style="padding:12px 16px;color:#E5BE78;font-size:14px;border-bottom:1px solid #30343A;">${safeCompany}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;color:#92949B;font-size:12px;">Position / Role</td>
        <td style="padding:12px 16px;color:#F2F0E9;font-size:14px;">${safeRole}</td>
      </tr>
    `
    : `
      <tr>
        <td style="padding:12px 16px;color:#92949B;font-size:12px;border-bottom:1px solid #30343A;">Inquiry Type</td>
        <td style="padding:12px 16px;color:#00D5E8;font-size:14px;border-bottom:1px solid #30343A;">${safeInquiryType}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;color:#92949B;font-size:12px;">Budget Range</td>
        <td style="padding:12px 16px;color:#F2F0E9;font-size:14px;">${safeBudget}</td>
      </tr>
    `;

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [CONTACT_RECIPIENT_EMAIL],
      replyTo: data.email,
      subject: subjectLine,
      html: `
        <div style="background-color:#08090B;color:#F2F0E9;font-family:Inter,system-ui,sans-serif;padding:32px;border-radius:16px;border:1px solid #30343A;max-width:620px;margin:0 auto;">
          <p style="color:${accentHex};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 8px 0;">
            ${badgeLabel}
          </p>
          <h1 style="font-size:22px;color:#F2F0E9;margin:0 0 24px 0;font-weight:600;">
            New message from ${safeName}
          </h1>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background-color:#14171A;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:12px 16px;color:#92949B;font-size:12px;border-bottom:1px solid #30343A;width:140px;">Sender Name</td>
              <td style="padding:12px 16px;color:#F2F0E9;font-size:14px;border-bottom:1px solid #30343A;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;color:#92949B;font-size:12px;border-bottom:1px solid #30343A;">Reply-To Email</td>
              <td style="padding:12px 16px;color:#00D5E8;font-size:14px;border-bottom:1px solid #30343A;">
                <a href="mailto:${safeEmail}" style="color:#00D5E8;text-decoration:none;">${safeEmail}</a>
              </td>
            </tr>
            ${contextRowsHtml}
          </table>

          <div style="background-color:#14171A;padding:18px;border-radius:12px;border:1px solid #30343A;">
            <p style="color:${accentHex};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 10px 0;">
              ${isHireMode ? 'Opportunity & Role Details' : 'Project Details'}
            </p>
            <p style="color:#F2F0E9;font-size:14px;line-height:1.65;margin:0;">
              ${safeMessage}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      return {
        sent: false,
        code: 'DELIVERY_ERROR',
        message:
          error.message ||
          'Resend could not deliver the message. You can send your inquiry directly to ahmed.saaed.abdelgel@gmail.com.',
      };
    }

    return {
      sent: true,
      code: 'SENT',
      message: isHireMode
        ? 'Thank you — your engineering role inquiry has been delivered directly to Ahmed Sa’ed.'
        : 'Thank you — your project inquiry has been delivered directly to Ahmed Sa’ed.',
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unexpected email delivery error.';
    return {
      sent: false,
      code: 'DELIVERY_ERROR',
      message: `${errorMessage} You can also reach out directly at ahmed.saaed.abdelgel@gmail.com.`,
    };
  }
}
