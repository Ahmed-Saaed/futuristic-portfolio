import { z } from 'zod';

export type ContactInquiryMode = 'hire' | 'work';

export const FREELANCE_INQUIRY_TYPES = [
  'React Native mobile application',
  'Web application',
  'Full-stack product',
  'Existing product improvement',
  'Other',
] as const;

export const BUDGET_RANGES = [
  '< $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
] as const;

export const contactFormSchema = z
  .object({
    mode: z.enum(['hire', 'work']),
    name: z
      .string()
      .trim()
      .min(2, 'Please enter your full name (at least 2 characters).')
      .max(100, 'Name must be 100 characters or fewer.'),
    email: z
      .string()
      .trim()
      .email('Please enter a valid email address.')
      .max(160, 'Email must be 160 characters or fewer.'),
    // Hire Me (Recruitment) specific fields
    company: z
      .string()
      .trim()
      .max(120, 'Company name must be 120 characters or fewer.')
      .optional()
      .or(z.literal('')),
    roleTitle: z
      .string()
      .trim()
      .max(120, 'Position / role must be 120 characters or fewer.')
      .optional()
      .or(z.literal('')),
    // Work With Me (Freelance) specific fields
    inquiryType: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal('')),
    budgetRange: z
      .string()
      .trim()
      .max(100)
      .optional()
      .or(z.literal('')),
    message: z
      .string()
      .trim()
      .min(15, 'Please share a few details (at least 15 characters).')
      .max(3000, 'Message must be 3000 characters or fewer.'),
    /** Honeypot anti-spam field — must remain empty */
    websiteHoneypot: z.string().max(0).optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.mode === 'hire') {
      if (!data.company || data.company.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['company'],
          message: 'Please enter the company or organization name.',
        });
      }
      if (!data.roleTitle || data.roleTitle.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['roleTitle'],
          message: 'Please specify the position or engineering role.',
        });
      }
    } else if (data.mode === 'work') {
      if (!data.inquiryType || data.inquiryType.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['inquiryType'],
          message: 'Please select an inquiry type.',
        });
      }
    }
  });

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export interface ContactApiResponse {
  success: boolean;
  code:
    | 'SENT'
    | 'CONFIG_NEEDED'
    | 'VALIDATION_ERROR'
    | 'RATE_LIMITED'
    | 'DELIVERY_ERROR';
  message: string;
  recipientEmail?: string;
  fieldErrors?: Partial<Record<keyof ContactFormInput, string>>;
}
