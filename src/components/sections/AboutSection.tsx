'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ABOUT_CONTENT } from '@/data/about';
import { Container } from '@/components/ui/Container';
import { ScrollCue } from '@/components/ui/ScrollCue';
import { PrincipleCard } from '@/components/about/PrincipleCard';
import { OrbitalSculpture } from '@/components/about/OrbitalSculpture';
import { createSectionEntranceTimeline } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      createSectionEntranceTimeline(section, [
        { selector: '[data-about-eyebrow]', at: 0, y: 10 },
        {
          selector: '[data-about-headline-line]',
          at: 0.06,
          y: 18,
          stagger: 0.08,
        },
        { selector: '[data-about-intro]', at: 0.18, y: 14 },
        { selector: '[data-about-statement]', at: 0.26, y: 12 },
        {
          selector: '[data-about-principle]',
          at: 0.32,
          y: 16,
          stagger: 0.08,
        },
        { selector: '[data-about-chrome]', at: 0.44, y: 0 },
      ]);
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-screen w-full overflow-hidden bg-obsidian py-24 md:py-28 lg:py-24 flex flex-col justify-between"
    >
      {/* Top & bottom subtle continuity gradient hairlines connecting Hero -> About -> Capabilities */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
      />

      {/* =====================================================================
          1. FADED BACKGROUND IMAGE LAYER (MERGED SEAMLESSLY INTO OBSIDIAN)
         ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[72%]">
          <OrbitalSculpture />
        </div>
      </div>

      {/* =====================================================================
          2. DESKTOP LEFT VERTICAL PROGRESS LINE WITH LUMINOUS FLARE NODE
         ===================================================================== */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute left-5 xl:left-7 inset-y-8 z-20 hidden lg:flex flex-col items-center justify-center"
      >
        <div className="relative h-full w-[1px] bg-gradient-to-b from-gold/20 via-gold/55 to-gold/15">
          <span className="absolute top-[38%] left-1/2 -translate-x-1/2 h-9 w-[2.5px] rounded-full bg-[#FFF2C6] shadow-[0_0_14px_3px_rgba(229,190,120,0.95)]" />
        </div>
      </aside>

      {/* =====================================================================
          3. TOP SECTION BAR: "— 02 / THE PERSON" (LEFT) & "ABOUT ME —" (RIGHT)
         ===================================================================== */}
      <Container className="relative z-20">
        <div className="flex items-center justify-between gap-4">
          <div data-about-eyebrow className="inline-flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[1.5px] w-6 bg-gold-highlight/85"
            />
            <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.2em] uppercase text-gold-highlight">
              {ABOUT_CONTENT.sectionLabel}
            </span>
          </div>

          <div
            data-about-chrome
            aria-hidden="true"
            className="hidden sm:inline-flex items-center gap-4"
          >
            <span className="font-display text-[0.72rem] font-normal tracking-[0.28em] uppercase text-warmWhite/70">
              {ABOUT_CONTENT.topRightLabel}
            </span>
            <span className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-gold/60 to-transparent" />
          </div>
        </div>
      </Container>

      {/* =====================================================================
          4. MAIN EDITORIAL CONTENT OVER THE FADED BACKGROUND
         ===================================================================== */}
      <Container className="relative z-20 my-auto py-10 lg:py-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-20 flex flex-col items-start lg:col-span-7 xl:col-span-6">
            <h2
              id="about-heading"
              aria-label={ABOUT_CONTENT.fullHeadline}
              className="font-serif text-[length:var(--text-editorial-headline)] font-semibold leading-[0.98] tracking-[-0.02em] mb-7 md:mb-8"
            >
              <span
                data-about-headline-line
                className="block text-warmWhite drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              >
                {ABOUT_CONTENT.headline.line1}
              </span>
              <span
                data-about-headline-line
                className="block bg-gradient-to-r from-[#F2D28B] via-[#DFAF60] to-[#B7883E] bg-clip-text text-transparent"
              >
                {ABOUT_CONTENT.headline.line2}
              </span>
            </h2>

            <p
              data-about-intro
              className="max-w-[540px] font-sans text-[length:var(--text-editorial-intro)] font-light leading-[1.6] tracking-[-0.005em] text-warmWhite/90 mb-7 md:mb-8 drop-shadow-[0_2px_14px_rgba(8,9,11,0.8)]"
            >
              {ABOUT_CONTENT.introduction}
            </p>

            <div
              data-about-statement
              className="mb-10 md:mb-12 flex items-center gap-4"
            >
              <span
                aria-hidden="true"
                className="h-7 w-[2px] rounded-full bg-gold-highlight shadow-[0_0_10px_rgba(229,190,120,0.8)]"
              />
              <p className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.24em] uppercase text-gold-highlight">
                {ABOUT_CONTENT.supportingStatement}
              </p>
            </div>

            <div
              role="list"
              aria-label="Guiding engineering principles"
              className="grid w-full max-w-[560px] grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-0 pt-2"
            >
              {ABOUT_CONTENT.principles.map((item, index) => (
                <div key={item.id} role="listitem">
                  <PrincipleCard item={item} showDivider={index > 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* =====================================================================
          5. BOTTOM SCROLL CUE & HORIZONTAL GOLD BASELINE FLARE
         ===================================================================== */}
      <Container className="relative z-20 mt-4">
        <div data-about-chrome>
          <ScrollCue
            label={ABOUT_CONTENT.scrollCue.label}
            href={ABOUT_CONTENT.scrollCue.href}
            ariaLabel="Scroll to explore Capabilities section"
            variant="gold"
            withTrailingLine
          />
        </div>
      </Container>
    </section>
  );
}
