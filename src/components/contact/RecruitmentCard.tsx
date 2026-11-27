'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Mail,
} from 'lucide-react';
import { CONTACT_SECTION_CONTENT, type ContactPathMode } from '@/data/contact';
import { SOCIAL_LINKS } from '@/data/navigation';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface RecruitmentCardProps {
  activeMode: ContactPathMode;
  onSelectMode: (mode: ContactPathMode) => void;
}

export function RecruitmentCard({
  activeMode,
  onSelectMode,
}: RecruitmentCardProps) {
  const [copied, setCopied] = useState(false);
  const { email, paths } = CONTACT_SECTION_CONTENT;
  const hirePath = paths.hire;
  const isHireActive = activeMode === 'hire';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      data-contact-card
      className={cn(
        'relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border bg-gradient-to-b from-[#14130F]/95 via-[#0E1014]/95 to-[#0A0C0F]/95 p-6 sm:p-8 lg:p-9 transition-colors duration-300 backdrop-blur-xl',
        isHireActive
          ? 'border-gold/55 shadow-[0_18px_48px_-16px_rgba(196,164,90,0.22)]'
          : 'border-gold/30 hover:border-gold/45'
      )}
    >
      {/* Subtle champagne-gold top & bottom edge hairlines */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute left-8 -top-px h-[1.5px] w-32 bg-gradient-to-r from-transparent via-gold-highlight to-transparent transition-opacity duration-300',
          isHireActive ? 'opacity-80' : 'opacity-40'
        )}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 -bottom-px h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-60"
      />

      <div className="space-y-6">
        {/* Path Badge & Subtle Professional Availability Status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="gold">{hirePath.badge}</Badge>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1 font-sans text-xs text-warmWhite/85">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-highlight" />
            <span>{hirePath.availabilityLabel}</span>
          </span>
        </div>

        {/* Title & Supporting Copy */}
        <div>
          <h3 className="font-serif text-2xl sm:text-[1.85rem] font-semibold leading-tight tracking-tight text-warmWhite">
            {hirePath.title}
          </h3>
          <p className="mt-3 font-sans text-sm sm:text-[0.9375rem] leading-relaxed text-mutedGrey">
            {hirePath.description}
          </p>
        </div>

        {/* 1. Dedicated Document-Oriented CV Download Card */}
        <div className="rounded-2xl border border-gold/35 bg-[#12110E]/90 p-5 transition-colors duration-200 hover:border-gold/55">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/45 bg-gold/10 text-gold-highlight">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <span className="block font-display text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold-highlight">
                  Official Resume
                </span>
                <h4 className="mt-0.5 font-display text-base font-medium text-warmWhite">
                  {hirePath.cvTitle}
                </h4>
                <p className="mt-1 font-sans text-xs leading-relaxed text-mutedGrey">
                  {hirePath.cvDescription}
                </p>
              </div>
            </div>

            <a
              href={hirePath.cvHref}
              download={hirePath.cvDownloadName}
              aria-label="Download Ahmed Saeed CV PDF"
              className="group/cv inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#F5DDA4]/55 bg-gradient-to-r from-[#E8C57B] via-[#D8B268] to-[#C49E50] px-5 py-3 font-sans text-xs sm:text-sm font-medium text-obsidian shadow-[0_0_20px_-6px_rgba(229,190,120,0.45)] transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight"
            >
              <span>{hirePath.cvLabel}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover/cv:translate-x-0.5 group-hover/cv:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* 2. Direct Email Contact Block with Copy-to-Clipboard */}
        <div className="rounded-2xl border border-white/[0.08] bg-obsidian/80 p-5">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="inline-flex items-center gap-2 font-display text-[0.68rem] font-medium uppercase tracking-[0.2em] text-mutedGrey">
              <Mail className="h-3.5 w-3.5 text-gold-highlight" aria-hidden="true" />
              <span>Direct Email Address</span>
            </span>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-1 font-sans text-xs text-warmWhite/85 transition-colors duration-200 hover:border-gold-highlight hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-gold-highlight" aria-hidden="true" />
                  <span className="text-gold-highlight font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          <a
            href={`mailto:${email}?subject=Engineering%20Opportunity%20%E2%80%94%20Ahmed%20Sa'ed`}
            className="group/mail inline-flex items-center gap-2 font-display text-sm sm:text-base font-medium text-warmWhite break-all transition-colors duration-200 hover:text-gold-highlight"
          >
            <span>{email}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-gold-highlight transition-transform duration-200 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* Footer: Interactive "Hire Me" Form Switcher + Verified Social Profiles */}
      <div className="mt-7 space-y-5 border-t border-white/[0.08] pt-5">
        {/* Path Selection Trigger inside Recruitment Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="font-sans text-xs text-mutedGrey">
            {isHireActive
              ? 'Recruitment inquiry form is active →'
              : 'Hiring for a team or engineering role?'}
          </span>

          <button
            type="button"
            onClick={() => onSelectMode('hire')}
            aria-pressed={isHireActive}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 font-sans text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight',
              isHireActive
                ? 'border-gold-highlight/70 bg-gold/20 text-gold-highlight'
                : 'border-gold/40 bg-gold/10 text-warmWhite hover:border-gold-highlight hover:text-gold-highlight'
            )}
          >
            <span>
              {isHireActive ? 'Hiring Form Selected' : 'Discuss a Role (Hire Me)'}
            </span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Verified GitHub, LinkedIn & Email Profiles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-mutedGrey">
            Verified Profiles
          </span>

          <div className="flex flex-wrap items-center gap-2.5">
            {SOCIAL_LINKS.map((item) => {
              const isExternal = item.href.startsWith('http');
              return (
                <a
                  key={item.id}
                  href={item.id === 'email' ? `mailto:${email}` : item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={item.ariaLabel}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 font-sans text-xs text-warmWhite/85 transition-colors duration-200 hover:border-gold-highlight hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
