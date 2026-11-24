'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
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
  const bgImageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Restrained background fade & subtle parallax as Section 04 enters from Capabilities
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { y: -36, scale: 1.02, autoAlpha: 0.45 },
          {
            y: 20,
            scale: 1.06,
            autoAlpha: 0.9,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 95%',
              end: 'bottom 10%',
              scrub: 0.9,
            },
          }
        );
      }

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
          1. FADED BACKGROUND ENVIRONMENT IMAGE MATCHING THE REFERENCE
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          ref={bgImageRef}
          className="relative h-full w-full opacity-85"
          style={{
            maskImage:
              'radial-gradient(ellipse 92% 88% at 62% 48%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.65) 72%, transparent 98%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 92% 88% at 62% 48%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.65) 72%, transparent 98%)',
          }}
        >
          <Image
            src="/images/proof-section-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right-top lg:object-center contrast-[1.04] brightness-[0.92]"
          />

          {/* Soft obsidian edge blends so the background image melts into the page */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-obsidian via-obsidian/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-obsidian via-obsidian/45 to-transparent" />
        </div>
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
          3. MAIN CONTENT: HEADER + EQUAL PROJECT GALLERY OVER FADED BACKGROUND
         ===================================================================== */}
      <Container className="relative z-20 my-auto">
        {/* Upper Header: Section Label, "Proof." Display Headline & Subtitle */}
        <div className="mb-7 lg:mb-8 max-w-2xl">
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

          {/* Editorial Serif Headline — Visually "Proof." with full accessible label "Proof, not promises." */}
          <h2
            id="proof-heading"
            data-proof-headline
            aria-label={WORK_SECTION_CONTENT.fullHeadline}
            className="font-serif text-[clamp(3.25rem,6vw+0.8rem,5.85rem)] font-semibold leading-[0.96] tracking-[-0.02em] mb-4 md:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)]"
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
            className="max-w-[520px] font-sans text-[length:var(--text-subtitle)] font-light leading-[1.6] text-warmWhite/90 drop-shadow-[0_2px_14px_rgba(8,9,11,0.85)]"
          >
            {WORK_SECTION_CONTENT.supportingText}
          </p>
        </div>

        {/* Lower Gallery Stage: Horizontal Filter Bar + 3 Equal Project Cards + Pagination */}
        <ProjectGallery />
      </Container>
    </section>
  );
}
