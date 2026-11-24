'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { ProofOrbitalFrame } from '@/components/project/ProofOrbitalFrame';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const WORK_SECTION_CONTENT = {
  sectionIndex: '04',
  sectionLabel: '04 / PROOF',
  headline: {
    prefix: 'Pro',
    highlight: 'of.',
  },
  fullHeadline: 'Proof, not promises.',
  supportingText: 'A glimpse into projects where ideas meet engineering.',
} as const;

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 74%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '[data-proof-eyebrow]',
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.7 },
        0
      )
        .fromTo(
          '[data-proof-headline]',
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.85 },
          0.1
        )
        .fromTo(
          '[data-proof-subtitle]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          0.24
        )
        .fromTo(
          '[data-proof-filters]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.35
        )
        .fromTo(
          '[data-proof-pagination]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.65
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="proof-heading"
      className="relative min-h-screen w-full overflow-hidden bg-obsidian py-24 md:py-28 lg:py-20 flex flex-col justify-between"
    >
      {/* =====================================================================
          1. CONTINUOUS SECTION 03 -> SECTION 04 TRANSITION & ATMOSPHERE
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top vertical light bridge connecting Capabilities 3D stack into Proof's converged glass frame */}
        <div className="absolute right-[25%] top-0 h-36 w-[1.5px] bg-gradient-to-b from-cyan/60 via-gold/40 to-transparent hidden lg:block" />
        <div className="absolute right-[14%] -top-16 h-72 w-96 rounded-full bg-gold/12 blur-[125px]" />
        <div className="absolute right-[6%] top-[10%] h-72 w-96 rounded-full bg-cyan/14 blur-[135px]" />

        {/* Subtle radial spotlight behind the 3 project cards */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 62%, rgba(0, 213, 232, 0.11) 0%, rgba(196, 164, 90, 0.08) 38%, rgba(8, 9, 11, 0.98) 76%)',
          }}
        />
      </div>

      {/* =====================================================================
          2. DESKTOP LEFT VERTICAL PROGRESS LINE WITH LUMINOUS FLARE NODE
         ===================================================================== */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute left-5 xl:left-7 inset-y-8 z-20 hidden lg:flex flex-col items-center justify-center"
      >
        <div className="relative h-full w-[1px] bg-gradient-to-b from-gold/15 via-gold/60 to-gold/15">
          <span className="absolute top-[22%] left-1/2 -translate-x-1/2 h-9 w-[2.5px] rounded-full bg-[#FFF2C6] shadow-[0_0_14px_3px_rgba(229,190,120,0.95)]" />
        </div>
      </aside>

      {/* =====================================================================
          3. MAIN CONTENT: HEADER + CONVERGED 3D FRAME + EQUAL PROJECT GALLERY
         ===================================================================== */}
      <Container className="relative z-20 my-auto">
        {/* Upper Header Split: Headline & Supporting Text (Left) + Converged 3D Glass Frame (Right) */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-6 mb-4 lg:mb-2">
          {/* LEFT 6 COLUMNS: Section Label, "Proof." Display Headline & Subtitle */}
          <div className="relative z-20 flex flex-col items-start lg:col-span-6">
            {/* Section Label: — 04 / PROOF */}
            <div
              data-proof-eyebrow
              className="mb-4 md:mb-5 inline-flex items-center gap-3.5"
            >
              <span
                aria-hidden="true"
                className="h-[1.5px] w-7 bg-gold-highlight/90"
              />
              <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.22em] uppercase text-gold-highlight">
                {WORK_SECTION_CONTENT.sectionLabel}
              </span>
            </div>

            {/* Editorial Serif Headline — Visually "Proof." as in the reference with full accessible label "Proof, not promises." */}
            <h2
              id="proof-heading"
              data-proof-headline
              aria-label={WORK_SECTION_CONTENT.fullHeadline}
              className="font-serif text-[clamp(3.25rem,6vw+0.8rem,5.85rem)] font-semibold leading-[0.96] tracking-[-0.02em] mb-4 md:mb-5"
            >
              <span className="text-warmWhite">
                {WORK_SECTION_CONTENT.headline.prefix}
              </span>
              <span className="bg-gradient-to-r from-[#F5D794] via-[#E5BE78] to-[#B9893E] bg-clip-text text-transparent">
                {WORK_SECTION_CONTENT.headline.highlight}
              </span>
              <span className="sr-only">, not promises.</span>
            </h2>

            {/* Supporting Text */}
            <p
              data-proof-subtitle
              className="max-w-[520px] font-sans text-[length:var(--text-subtitle)] font-light leading-[1.6] text-warmWhite/85"
            >
              {WORK_SECTION_CONTENT.supportingText}
            </p>
          </div>

          {/* RIGHT 6 COLUMNS: Converged 3D Glass Orbital Frame (`</>`) */}
          <div className="relative z-10 w-full lg:col-span-6 lg:-mb-8">
            <ProofOrbitalFrame className="lg:scale-105 xl:scale-110" />
          </div>
        </div>

        {/* Lower Gallery Stage: Horizontal Filter Bar + 3 Equal Project Cards + Pagination */}
        <ProjectGallery />
      </Container>

      {/* =====================================================================
          4. BOTTOM OBSIDIAN TERRAIN RIDGE WITH CYAN & GOLD RIM LIGHTING
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 md:h-24 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient
              id="proof-ridge-cyan"
              x1="640"
              y1="20"
              x2="1120"
              y2="95"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E5BE78" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#00D5E8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#08090B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 100L220 100L340 78L480 94L670 42L810 82L980 56L1160 88L1340 62L1440 78L1440 100Z"
            fill="#090C10"
          />
          <path
            d="M620 82L670 42L810 82L980 56L1140 84"
            stroke="url(#proof-ridge-cyan)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
}
