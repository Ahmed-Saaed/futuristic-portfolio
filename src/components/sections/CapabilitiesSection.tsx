'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAPABILITIES_CONTENT } from '@/data/capabilities';
import { Container } from '@/components/ui/Container';
import { ScrollCue } from '@/components/ui/ScrollCue';
import { CapabilitiesCenterpiece } from '@/components/capabilities/CapabilitiesCenterpiece';
import { CapabilityCard } from '@/components/capabilities/CapabilityCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { CapabilityAreaId } from '@/types/common';

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Default active selection to 'mobile' (Card 02) so the middle cyan card & centerpiece layer glow on load like the reference
  const [activeArea, setActiveArea] = useState<CapabilityAreaId>('mobile');
  const [expandedArea, setExpandedArea] = useState<CapabilityAreaId | null>(
    null
  );
  const prefersReducedMotion = useReducedMotion();

  const handleSelectOrToggle = (id: CapabilityAreaId) => {
    setActiveArea(id);
    setExpandedArea((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Progressive reveal for headline, intro, 3 capability cards, and staggered technology tags
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
        '[data-cap-eyebrow]',
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.7 },
        0
      )
        .fromTo(
          '[data-cap-headline-line]',
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.88, stagger: 0.14 },
          0.1
        )
        .fromTo(
          '[data-cap-intro]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          0.32
        )
        .fromTo(
          '[data-capability-card]',
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.14 },
          0.45
        )
        .fromTo(
          '[data-capability-tag]',
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.04 },
          0.65
        )
        .fromTo(
          '[data-cap-chrome]',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          0.8
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="capabilities-heading"
      className="relative min-h-screen w-full overflow-hidden bg-obsidian py-24 md:py-28 lg:py-20 flex flex-col justify-between"
    >
      {/* =====================================================================
          1. CONTINUOUS ABOUT-TO-CAPABILITIES ORBITAL BRIDGE & ATMOSPHERE
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top orbital light bridge connecting Section 02's orbital elements directly into Section 03's 3D stack */}
        <div className="absolute right-[26%] top-0 h-36 w-[1.5px] bg-gradient-to-b from-gold/60 via-cyan/35 to-transparent hidden lg:block" />
        <div className="absolute right-[16%] -top-20 h-64 w-96 rounded-full bg-cyan/10 blur-[120px]" />

        {/* Subtle dark architectural pillar & diagonal lighting in upper-right background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 68% 38%, rgba(0, 213, 232, 0.11) 0%, rgba(196, 164, 90, 0.09) 34%, rgba(8, 9, 11, 0.98) 72%)',
          }}
        />
      </div>

      {/* =====================================================================
          2. DESKTOP LEFT & RIGHT VERTICAL PROGRESS / TECHNICAL RAILS
         ===================================================================== */}
      {/* Left vertical progress line with luminous flare node */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute left-5 xl:left-7 inset-y-8 z-20 hidden lg:flex flex-col items-center justify-center"
      >
        <div className="relative h-full w-[1px] bg-gradient-to-b from-gold/15 via-gold/55 to-gold/15">
          <span className="absolute top-[36%] left-1/2 -translate-x-1/2 h-9 w-[2.5px] rounded-full bg-[#FFF2C6] shadow-[0_0_14px_3px_rgba(229,190,120,0.95)]" />
        </div>
      </aside>

      {/* Right vertical technical dotted rail with gold node matching the reference */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute right-5 xl:right-7 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
      >
        <div className="h-24 w-[1px] border-r border-dashed border-gold/35" />
        <span className="h-5 w-[2.5px] rounded-full bg-gold-highlight shadow-[0_0_12px_2px_rgba(229,190,120,0.9)]" />
        <div className="h-16 w-[1px] border-r border-dashed border-gold/35" />
      </aside>

      {/* =====================================================================
          3. UPPER SPLIT STAGE: EDITORIAL HEADLINE (LEFT) + 3D CENTERPIECE (RIGHT)
         ===================================================================== */}
      <Container className="relative z-20 my-auto pt-2 pb-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* LEFT 6 COLUMNS: Section Label, Serif Display Headline & Vertical-Bar Intro */}
          <div className="relative z-20 flex flex-col items-start lg:col-span-6">
            {/* Section Label: — 03 / CAPABILITIES */}
            <div
              data-cap-eyebrow
              className="mb-5 md:mb-6 inline-flex items-center gap-3.5"
            >
              <span
                aria-hidden="true"
                className="h-[1.5px] w-8 bg-gold-highlight/90"
              />
              <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.22em] uppercase text-gold-highlight">
                {CAPABILITIES_CONTENT.sectionLabel}
              </span>
            </div>

            {/* Editorial Serif Headline: "From interface to" / "architecture." */}
            <h2
              id="capabilities-heading"
              aria-label={CAPABILITIES_CONTENT.fullHeadline}
              className="font-serif text-[length:var(--text-editorial-headline)] font-semibold leading-[1.0] tracking-[-0.02em] mb-7 md:mb-8"
            >
              <span
                data-cap-headline-line
                className="block text-warmWhite drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
              >
                {CAPABILITIES_CONTENT.headline.line1}
              </span>
              <span
                data-cap-headline-line
                className="block bg-gradient-to-r from-[#F2D28B] via-[#DFAF60] to-[#B7883E] bg-clip-text text-transparent"
              >
                {CAPABILITIES_CONTENT.headline.line2}
              </span>
            </h2>

            {/* Introduction with Left Vertical Gold Accent Bar */}
            <div data-cap-intro className="flex items-stretch gap-4 max-w-[490px]">
              <span
                aria-hidden="true"
                className="my-1 w-[2px] shrink-0 rounded-full bg-gold-highlight/90 shadow-[0_0_10px_rgba(229,190,120,0.75)]"
              />
              <p className="font-sans text-[length:var(--text-subtitle)] font-light leading-[1.6] text-warmWhite/85">
                {CAPABILITIES_CONTENT.introduction}
              </p>
            </div>
          </div>

          {/* RIGHT 6 COLUMNS: Interactive 3D Isometric Technical Layers Centerpiece */}
          <div className="relative z-10 w-full lg:col-span-6">
            <CapabilitiesCenterpiece
              activeArea={activeArea}
              onSelectArea={handleSelectOrToggle}
              className="lg:scale-[1.06] xl:scale-[1.1]"
            />
          </div>
        </div>

        {/* ===================================================================
            4. LOWER 3-COLUMN HYBRID CAPABILITY CARDS GRID (01, 02, 03)
           =================================================================== */}
        <div
          role="list"
          aria-label="Core engineering capability areas"
          className="relative z-20 mt-8 lg:mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start"
        >
          {CAPABILITIES_CONTENT.areas.map((area) => (
            <div key={area.id} role="listitem">
              <CapabilityCard
                area={area}
                isSelected={activeArea === area.id}
                isExpanded={expandedArea === area.id}
                onSelect={handleSelectOrToggle}
              />
            </div>
          ))}
        </div>
      </Container>

      {/* =====================================================================
          5. BOTTOM OBSIDIAN TERRAIN RIDGE & SCROLL CUE
         ===================================================================== */}
      {/* Low-poly dark obsidian ridge along the bottom-right edge matching the reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 md:h-28 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient
              id="cap-ridge-gold"
              x1="880"
              y1="20"
              x2="1440"
              y2="110"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E5BE78" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#C4A45A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#08090B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 120L420 120L540 94L690 112L860 78L1040 98L1240 48L1370 64L1440 28L1440 120Z"
            fill="#0A0C0F"
          />
          <path
            d="M860 78L1040 98L1240 48L1370 64L1440 28"
            stroke="url(#cap-ridge-gold)"
            strokeWidth="1.8"
          />
          <path
            d="M0 120L520 120L660 104L840 116L1010 88L1190 106L1350 66L1440 82L1440 120Z"
            fill="#08090B"
          />
        </svg>
      </div>

      {/* Bottom Scroll Cue */}
      <Container className="relative z-30 mt-6">
        <div data-cap-chrome>
          <ScrollCue
            label={CAPABILITIES_CONTENT.scrollCue.label}
            href={CAPABILITIES_CONTENT.scrollCue.href}
            ariaLabel="Scroll to explore Selected Work section"
            variant="gold"
          />
        </div>
      </Container>
    </section>
  );
}
