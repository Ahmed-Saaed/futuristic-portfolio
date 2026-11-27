'use client';

import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Loader2,
  Send,
} from 'lucide-react';
import { CONTACT_SECTION_CONTENT, type ContactPathMode } from '@/data/contact';
import {
  BUDGET_RANGES,
  contactFormSchema,
  FREELANCE_INQUIRY_TYPES,
  type ContactApiResponse,
  type ContactFormInput,
} from '@/lib/validation';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

type SubmissionStatus =
  | 'idle'
  | 'submitting'
  | 'sent'
  | 'config_needed'
  | 'error';

export interface ContactFormProps {
  mode: ContactPathMode;
  onModeChange: (mode: ContactPathMode) => void;
}

export function ContactForm({ mode, onModeChange }: ContactFormProps) {
  const { email: recipientEmail, paths } = CONTACT_SECTION_CONTENT;
  const isHireMode = mode === 'hire';
  const activePathConfig = isHireMode ? paths.hire : paths.work;

  const [formData, setFormData] = useState<Omit<ContactFormInput, 'mode'>>({
    name: '',
    email: '',
    company: '',
    roleTitle: '',
    inquiryType: '',
    budgetRange: '',
    message: '',
    websiteHoneypot: '',
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleSelectMode = (nextMode: ContactPathMode) => {
    if (nextMode === mode) return;
    onModeChange(nextMode);
    setFieldErrors({});
    if (status === 'error' || status === 'sent') {
      setStatus('idle');
      setFeedbackMessage('');
    }
  };

  const handleFieldChange = (
    field: keyof Omit<ContactFormInput, 'mode'>,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const buildDirectMailtoFallback = () => {
    const subject = encodeURIComponent(
      isHireMode
        ? `[Hiring / Role Inquiry] ${formData.roleTitle || 'Engineering Role'} at ${formData.company || formData.name || 'Company'}`
        : `[Project Inquiry] ${formData.inquiryType || 'Project'} — from ${formData.name || 'Visitor'}`
    );
    const body = encodeURIComponent(
      isHireMode
        ? `Full Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPosition / Role: ${formData.roleTitle}\n\nMessage:\n${formData.message}`
        : `Full Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.inquiryType}\nBudget Range: ${formData.budgetRange || 'Not specified'}\n\nProject Details:\n${formData.message}`
    );
    return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;
    setFeedbackMessage('');

    const payloadToValidate: ContactFormInput = {
      mode,
      ...formData,
    };

    const parsed = contactFormSchema.safeParse(payloadToValidate);
    if (!parsed.success) {
      const errors: Partial<Record<keyof ContactFormInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormInput | undefined;
        if (key && !errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      setStatus('error');
      setFeedbackMessage('Please check the highlighted fields below.');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await res.json()) as ContactApiResponse;

      if (res.ok && payload.success) {
        setStatus('sent');
        setFeedbackMessage(payload.message);
        setFormData({
          name: '',
          email: '',
          company: '',
          roleTitle: '',
          inquiryType: '',
          budgetRange: '',
          message: '',
          websiteHoneypot: '',
        });
        return;
      }

      if (payload.code === 'CONFIG_NEEDED') {
        setStatus('config_needed');
        setFeedbackMessage(payload.message);
        return;
      }

      if (payload.fieldErrors) {
        setFieldErrors(payload.fieldErrors);
      }

      setStatus('error');
      setFeedbackMessage(
        payload.message ||
          `Could not send message automatically. You can email ${recipientEmail} directly.`
      );
    } catch {
      setStatus('error');
      setFeedbackMessage(
        `Network error while contacting server. Please email ${recipientEmail} directly.`
      );
    }
  };

  const inputBaseClass =
    'h-12 w-full rounded-xl border bg-obsidian/85 px-4 font-sans text-sm text-warmWhite placeholder:text-mutedGrey/65 transition-colors duration-200 focus:outline-none focus:ring-2';

  const getFieldBorderClass = (hasError: boolean) =>
    hasError
      ? 'border-red-400/80 focus:border-red-400 focus:ring-red-400/30'
      : isHireMode
        ? 'border-white/12 focus:border-gold-highlight focus:ring-gold/30'
        : 'border-white/12 focus:border-cyan focus:ring-cyan/30';

  return (
    <div
      data-contact-card
      className={cn(
        'relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border p-6 sm:p-8 lg:p-9 transition-colors duration-300 backdrop-blur-xl',
        isHireMode
          ? 'border-gold/50 bg-gradient-to-b from-[#16140E]/95 via-[#0E1014]/95 to-[#0A0C0F]/95 shadow-[0_18px_48px_-16px_rgba(196,164,90,0.22)]'
          : 'border-cyan/45 bg-gradient-to-b from-[#0A1920]/95 via-[#0B1116]/95 to-[#080D11]/95 shadow-[0_18px_48px_-16px_rgba(0,213,232,0.22)]'
      )}
    >
      {/* Subtle Top & Bottom Edge Hairlines */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute right-10 -top-px h-[1.5px] w-36 bg-gradient-to-r from-transparent to-transparent opacity-80',
          isHireMode ? 'via-gold-highlight' : 'via-cyan'
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-12 -bottom-px h-px bg-gradient-to-r from-transparent to-transparent opacity-60',
          isHireMode ? 'via-gold/45' : 'via-cyan/45'
        )}
      />

      <div>
        {/* Top Interactive Path Switcher: "Work With Me" vs "Hire Me" */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Choose inquiry path"
            className="inline-grid grid-cols-2 rounded-xl border border-white/[0.09] bg-obsidian/90 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isHireMode}
              onClick={() => handleSelectMode('work')}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-sans text-xs sm:text-[0.8125rem] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
                !isHireMode
                  ? 'border border-cyan/50 bg-cyan/15 text-warmWhite shadow-[0_0_16px_-6px_rgba(0,213,232,0.5)]'
                  : 'border border-transparent text-mutedGrey hover:text-warmWhite'
              )}
            >
              <Code2
                className={cn(
                  'h-3.5 w-3.5',
                  !isHireMode ? 'text-cyan' : 'text-mutedGrey'
                )}
                aria-hidden="true"
              />
              <span>{paths.work.tabLabel}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={isHireMode}
              onClick={() => handleSelectMode('hire')}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-sans text-xs sm:text-[0.8125rem] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight',
                isHireMode
                  ? 'border border-gold/55 bg-gold/15 text-warmWhite shadow-[0_0_16px_-6px_rgba(229,190,120,0.5)]'
                  : 'border border-transparent text-mutedGrey hover:text-warmWhite'
              )}
            >
              <Briefcase
                className={cn(
                  'h-3.5 w-3.5',
                  isHireMode ? 'text-gold-highlight' : 'text-mutedGrey'
                )}
                aria-hidden="true"
              />
              <span>{paths.hire.tabLabel}</span>
            </button>
          </div>

          <Badge variant={isHireMode ? 'gold' : 'cyan'}>
            {activePathConfig.formBadge}
          </Badge>
        </div>

        {/* Dynamic Heading & Supporting Copy Based on Selected Path */}
        <div className="mb-6">
          <h3 className="font-serif text-2xl sm:text-[1.85rem] font-semibold leading-tight tracking-tight text-warmWhite">
            {isHireMode ? paths.hire.formHeading : paths.work.title}
          </h3>
          <p className="mt-2 font-sans text-sm sm:text-[0.9375rem] leading-relaxed text-mutedGrey">
            {isHireMode ? paths.hire.formDescription : paths.work.description}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Hidden Honeypot Field for Spam Protection */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="contact-website-hp">Website</label>
            <input
              id="contact-website-hp"
              type="text"
              name="websiteHoneypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.websiteHoneypot}
              onChange={(e) =>
                handleFieldChange('websiteHoneypot', e.target.value)
              }
            />
          </div>

          {/* Row 1: Full Name & Email Address */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block font-display text-xs font-medium tracking-[0.06em] uppercase text-warmWhite/90"
              >
                Full Name <span className="text-gold-highlight">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={
                  fieldErrors.name ? 'contact-name-error' : undefined
                }
                className={cn(
                  inputBaseClass,
                  getFieldBorderClass(Boolean(fieldErrors.name))
                )}
              />
              {fieldErrors.name && (
                <p
                  id="contact-name-error"
                  role="alert"
                  className="mt-1.5 font-sans text-xs text-red-300"
                >
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block font-display text-xs font-medium tracking-[0.06em] uppercase text-warmWhite/90"
              >
                Email Address <span className="text-gold-highlight">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? 'contact-email-error' : undefined
                }
                className={cn(
                  inputBaseClass,
                  getFieldBorderClass(Boolean(fieldErrors.email))
                )}
              />
              {fieldErrors.email && (
                <p
                  id="contact-email-error"
                  role="alert"
                  className="mt-1.5 font-sans text-xs text-red-300"
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Mode-Specific Fields */}
          {isHireMode ? (
            /* HIRE ME MODE: Company & Position / Role */
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-company"
                  className="mb-1.5 block font-display text-xs font-medium tracking-[0.06em] uppercase text-warmWhite/90"
                >
                  Company <span className="text-gold-highlight">*</span>
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Company or team name"
                  value={formData.company}
                  onChange={(e) => handleFieldChange('company', e.target.value)}
                  aria-invalid={Boolean(fieldErrors.company)}
                  aria-describedby={
                    fieldErrors.company ? 'contact-company-error' : undefined
                  }
                  className={cn(
                    inputBaseClass,
                    getFieldBorderClass(Boolean(fieldErrors.company))
                  )}
                />
                {fieldErrors.company && (
                  <p
                    id="contact-company-error"
                    role="alert"
                    className="mt-1.5 font-sans text-xs text-red-300"
                  >
                    {fieldErrors.company}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-role"
                  className="mb-1.5 block font-display text-xs font-medium tracking-[0.06em] uppercase text-warmWhite/90"
                >
                  Position / Role <span className="text-gold-highlight">*</span>
                </label>
                <input
                  id="contact-role"
                  name="roleTitle"
                  type="text"
                  required
                  placeholder="e.g. Senior React Native Engineer"
                  value={formData.roleTitle}
                  onChange={(e) =>
                    handleFieldChange('roleTitle', e.target.value)
                  }
                  aria-invalid={Boolean(fieldErrors.roleTitle)}
                  aria-describedby={
                    fieldErrors.roleTitle ? 'contact-role-error' : undefined
                  }
                  className={cn(
                    inputBaseClass,
                    getFieldBorderClass(Boolean(fieldErrors.roleTitle))
                  )}
                />
                {fieldErrors.roleTitle && (
                  <p
                    id="contact-role-error"
                    role="alert"
                    className="mt-1.5 font-sans text-xs text-red-300"
                  >
                    {fieldErrors.roleTitle}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* WORK WITH ME MODE: Inquiry Type (with explicit placeholder) & Optional Budget Range */
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-inquiry-type"
                  className="mb-1.5 block font-display text-xs font-medium tracking-[0.06em] uppercase text-warmWhite/90"
                >
                  Inquiry Type <span className="text-gold-highlight">*</span>
                </label>
                <select
                  id="contact-inquiry-type"
                  name="inquiryType"
                  required
                  value={formData.inquiryType}
                  onChange={(e) =>
                    handleFieldChange('inquiryType', e.target.value)
                  }
                  aria-invalid={Boolean(fieldErrors.inquiryType)}
                  aria-describedby={
                    fieldErrors.inquiryType
                      ? 'contact-inquiry-type-error'
                      : undefined
                  }
                  className={cn(
                    inputBaseClass,
                    !formData.inquiryType && 'text-mutedGrey/75',
                    getFieldBorderClass(Boolean(fieldErrors.inquiryType))
                  )}
                >
                  <option value="" disabled className="bg-obsidian text-mutedGrey">
                    Select inquiry type
                  </option>
                  {FREELANCE_INQUIRY_TYPES.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-obsidian text-warmWhite"
                    >
                      {type}
                    </option>
                  ))}
                </select>
                {fieldErrors.inquiryType && (
                  <p
                    id="contact-inquiry-type-error"
                    role="alert"
                    className="mt-1.5 font-sans text-xs text-red-300"
                  >
                    {fieldErrors.inquiryType}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-budget"
                  className="mb-1.5 block font-display text-xs font-medium tracking-[0.06em] uppercase text-warmWhite/90"
                >
                  Budget Range{' '}
                  <span className="font-normal lowercase text-mutedGrey">
                    (optional)
                  </span>
                </label>
                <select
                  id="contact-budget"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) =>
                    handleFieldChange('budgetRange', e.target.value)
                  }
                  className={cn(
                    inputBaseClass,
                    !formData.budgetRange && 'text-mutedGrey/75',
                    getFieldBorderClass(false)
                  )}
                >
                  <option value="" className="bg-obsidian text-mutedGrey">
                    Select budget (optional)
                  </option>
                  {BUDGET_RANGES.map((range) => (
                    <option
                      key={range}
                      value={range}
                      className="bg-obsidian text-warmWhite"
                    >
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Row 3: Message / Project Details */}
          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block font-display text-xs font-medium tracking-[0.06em] uppercase text-warmWhite/90"
            >
              {isHireMode ? 'Opportunity & Role Details' : 'Project Details'}{' '}
              <span className="text-gold-highlight">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder={
                isHireMode
                  ? 'Describe the role, tech stack, team structure, and location/remote setup...'
                  : 'Tell me about your product goals, key features, and target timeline...'
              }
              value={formData.message}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={
                fieldErrors.message ? 'contact-message-error' : undefined
              }
              className={cn(
                'w-full resize-none rounded-xl border bg-obsidian/85 p-4 font-sans text-sm text-warmWhite placeholder:text-mutedGrey/65 transition-colors duration-200 focus:outline-none focus:ring-2',
                getFieldBorderClass(Boolean(fieldErrors.message))
              )}
            />
            {fieldErrors.message && (
              <p
                id="contact-message-error"
                role="alert"
                className="mt-1.5 font-sans text-xs text-red-300"
              >
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Status & Feedback Alert Banners */}
          {status === 'sent' && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-cyan/50 bg-cyan/10 p-4 text-xs sm:text-sm text-warmWhite"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-cyan"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-cyan">Inquiry Delivered</p>
                <p className="mt-0.5 text-warmWhite/85">{feedbackMessage}</p>
              </div>
            </div>
          )}

          {status === 'config_needed' && (
            <div
              role="alert"
              className="space-y-3 rounded-xl border border-gold-highlight/60 bg-gold/10 p-4 text-xs sm:text-sm text-warmWhite"
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-highlight"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-gold-highlight">
                    Resend API Key Configuration Needed
                  </p>
                  <p className="mt-1 text-warmWhite/85">{feedbackMessage}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pl-7">
                <a
                  href={buildDirectMailtoFallback()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gold-highlight/70 bg-gold/20 px-3.5 py-2 font-sans text-xs font-medium text-gold-highlight hover:bg-gold/30"
                >
                  <span>Open Pre-filled Email to {recipientEmail}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {status === 'error' && feedbackMessage && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-400/50 bg-red-500/10 p-3.5 text-xs sm:text-sm text-red-200"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                aria-hidden="true"
              />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Submit Footer */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="font-sans text-xs text-mutedGrey">
              Direct recipient:{' '}
              <span className="text-warmWhite/90">{recipientEmail}</span>
            </p>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={cn(
                'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl border px-7 py-3.5 font-sans text-sm font-medium transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight',
                isHireMode
                  ? 'border-[#F5DDA4]/60 bg-gradient-to-r from-[#E8C57B] via-[#D8B268] to-[#C49E50] text-obsidian shadow-[0_0_24px_-6px_rgba(229,190,120,0.5)] hover:brightness-105'
                  : 'border-cyan/75 bg-gradient-to-r from-[#092832] via-[#0D3340] to-[#09252E] text-cyan shadow-[0_0_24px_-6px_rgba(0,213,232,0.45)] hover:border-cyan hover:text-[#8EF8FF]'
              )}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>{activePathConfig.submitLabel}</span>
                  <Send
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
