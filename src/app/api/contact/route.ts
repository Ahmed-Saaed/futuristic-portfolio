import { NextResponse } from 'next/server';
import {
  contactFormSchema,
  type ContactApiResponse,
  type ContactFormInput,
} from '@/lib/validation';
import {
  CONTACT_RECIPIENT_EMAIL,
  sendContactInquiryEmail,
} from '@/lib/email';

// Simple in-memory per-IP rate limiter (max 5 submissions per 60 seconds)
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipTimestamps.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipTimestamps.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipTimestamps.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor?.split(',')[0]?.trim() || 'local';

    if (isRateLimited(clientIp)) {
      const response: ContactApiResponse = {
        success: false,
        code: 'RATE_LIMITED',
        message:
          'Too many requests in a short period. Please wait a minute before trying again.',
        recipientEmail: CONTACT_RECIPIENT_EMAIL,
      };
      return NextResponse.json(response, { status: 429 });
    }

    const body: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ContactFormInput | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      const response: ContactApiResponse = {
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Please check the highlighted form fields and try again.',
        fieldErrors,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Honeypot spam protection: if a bot filled in the hidden field, return early quietly
    if (
      parsed.data.websiteHoneypot &&
      parsed.data.websiteHoneypot.trim().length > 0
    ) {
      const response: ContactApiResponse = {
        success: true,
        code: 'SENT',
        message: 'Thank you — your message has been received.',
      };
      return NextResponse.json(response, { status: 200 });
    }

    const result = await sendContactInquiryEmail(parsed.data);

    if (result.code === 'CONFIG_NEEDED') {
      const response: ContactApiResponse = {
        success: false,
        code: 'CONFIG_NEEDED',
        message: result.message,
        recipientEmail: CONTACT_RECIPIENT_EMAIL,
      };
      return NextResponse.json(response, { status: 503 });
    }

    if (!result.sent) {
      const response: ContactApiResponse = {
        success: false,
        code: 'DELIVERY_ERROR',
        message: result.message,
        recipientEmail: CONTACT_RECIPIENT_EMAIL,
      };
      return NextResponse.json(response, { status: 502 });
    }

    const response: ContactApiResponse = {
      success: true,
      code: 'SENT',
      message: result.message,
      recipientEmail: CONTACT_RECIPIENT_EMAIL,
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: ContactApiResponse = {
      success: false,
      code: 'DELIVERY_ERROR',
      message:
        'Unable to process your request right now. Please email ahmed.saaed.abdelgel@gmail.com directly.',
      recipientEmail: CONTACT_RECIPIENT_EMAIL,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
