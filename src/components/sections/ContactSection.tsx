'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { CONTACT_SECTION_CONTENT, type ContactPathMode } from '@/data/contact';
import { Container } from '@/components/ui/Container';
import { RecruitmentCard } from '@/components/contact/RecruitmentCard';
import { ContactForm } from '@/components/contact/ContactForm';
import { createSectionEntranceTimeline } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState<ContactPathMode>('work');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      createSectionEntranceTimeline(section, [
        { selector: '[data-contact-eyebrow]', at: 0, y: 10 },
        {
          selector: '[data-contact-headline-line]',
          at: 0.06,
          y: 14,
          stagger: 0.08,
        },
        { selector: '[data-contact-subtitle]', at: 0.16, y: 12 },
        {
          selector: '[data-contact-card]',
          at: 0.22,
          y: 16,
          stagger: 0.09,
        },
      ]);
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden bg-obsidian scroll-mt-24 pt-28 pb-24 md:pt-32 md:pb-28 lg:pt-32 lg:pb-28"
    >
      {/* =====================================================================
          1. SUBTLE CLOSING-SCENE ARCHITECTURAL BACKGROUND
             Toned down behind the cards & bottom wave masked out so content is 100% priority
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="relative h-full w-full opacity-45"
          style={{
            // Crop out the bottom decorative wave and soften intensity behind the cards
            maskImage:
              'radial-gradient(ellipse 88% 72% at 52% 32%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.35) 58%, transparent 86%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 88% 72% at 52% 32%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.35) 58%, transparent 86%)',
          }}
        >
          <Image
            src="/images/contact-finale-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top brightness-[0.78] contrast-[1.02] select-none"
          />
        </div>

        {/* Deep obsidian top & bottom fades */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-obsidian via-obsidian/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-obsidian via-obsidian/95 to-transparent" />
      </div>

      {/* =====================================================================
          2. DESKTOP LEFT VERTICAL PROGRESS LINE WITH LUMINOUS FLARE NODE
         ===================================================================== */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute left-5 xl:left-7 inset-y-12 z-20 hidden lg:flex flex-col items-center justify-center"
      >
        <div className="relative h-full w-[1px] bg-gradient-to-b from-gold/15 via-gold/50 to-transparent">
          <span className="absolute top-[26%] left-1/2 -translate-x-1/2 h-8 w-[2px] rounded-full bg-[#FFF2C6] shadow-[0_0_12px_2px_rgba(229,190,120,0.85)]" />
        </div>
      </aside>

      {/* =====================================================================
          3. CENTERED CONTENT CONTAINER & BALANCED TWO-COLUMN GRID
         ===================================================================== */}
      <Container className="relative z-20">
        {/* Centered / Balanced Editorial Header with full top clearance */}
        <div className="mb-10 lg:mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div
              data-contact-eyebrow
              className="mb-4 inline-flex items-center gap-3.5"
            >
              <span
                aria-hidden="true"
                className="h-[1.5px] w-8 bg-gold-highlight/90"
              />
              <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.22em] uppercase text-gold-highlight">
                {CONTACT_SECTION_CONTENT.sectionLabel}
              </span>
            </div>

            <h2
              id="contact-heading"
              aria-label={CONTACT_SECTION_CONTENT.fullHeadline}
              className="font-serif text-[length:var(--text-editorial-headline)] font-semibold leading-[1.04] tracking-[-0.02em]"
            >
              <span
                data-contact-headline-line
                className="block text-warmWhite"
              >
                {CONTACT_SECTION_CONTENT.headline.line1}
              </span>
              <span
                data-contact-headline-line
                className="block bg-gradient-to-r from-[#F5D794] via-[#E5BE78] to-[#B9893E] bg-clip-text text-transparent pb-1"
              >
                {CONTACT_SECTION_CONTENT.headline.line2}
              </span>
            </h2>
          </div>

          <p
            data-contact-subtitle
            className="max-w-[460px] font-sans text-sm sm:text-base font-light leading-[1.65] text-warmWhite/85 lg:pb-2"
          >
            {CONTACT_SECTION_CONTENT.supportingText}
          </p>
        </div>

        {/* Balanced 12-Column Split (6 cols Recruitment + 6 cols Interactive Form) */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="lg:col-span-6">
            <RecruitmentCard
              activeMode={activeMode}
              onSelectMode={setActiveMode}
            />
          </div>

          <div className="lg:col-span-6">
            <ContactForm mode={activeMode} onModeChange={setActiveMode} />
          </div>
        </div>
      </Container>
    </section>
  );
}
