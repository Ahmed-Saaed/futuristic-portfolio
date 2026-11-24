'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import { HERO_CONTENT, SOCIAL_LINKS } from '@/data/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollCue } from '@/components/ui/ScrollCue';
import { HeroBackgroundVideo } from '@/components/sections/HeroBackgroundVideo';
import { MOTION_TOKENS } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SocialLinkItem } from '@/types/common';

function SocialIcon({ id }: { id: SocialLinkItem['id'] }) {
  switch (id) {
    case 'github':
      return (
        <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-warmWhite text-obsidian shadow-[0_0_14px_rgba(242,240,233,0.2)] transition-all duration-200 group-hover:bg-gold-highlight group-hover:shadow-gold-glow">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem] fill-current"
            aria-hidden="true"
          >
            <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63 0.3 12 0.3z" />
          </svg>
        </span>
      );
    case 'linkedin':
      return (
        <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[7px] bg-warmWhite text-obsidian shadow-[0_0_14px_rgba(242,240,233,0.2)] transition-all duration-200 group-hover:bg-gold-highlight group-hover:shadow-gold-glow">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem] fill-current"
            aria-hidden="true"
          >
            <path d="M6.94 8.5v12.06H2.92V8.5h4.02zm.26-3.72c0 1.16-.87 2.09-2.26 2.09-1.35 0-2.22-.93-2.22-2.09 0-1.18.9-2.09 2.27-2.09s2.21.91 2.21 2.09zM21.08 13.66v6.9h-4.01v-6.44c0-1.62-.58-2.72-2.03-2.72-1.11 0-1.77.75-2.06 1.47-.11.26-.13.62-.13.99v6.7H8.84s.05-10.87 0-12.06h4.01v1.71c.53-.82 1.49-1.99 3.62-1.99 2.64 0 4.61 1.72 4.61 5.44z" />
          </svg>
        </span>
      );
    case 'email':
      return (
        <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[7px] border-[1.75px] border-warmWhite/90 bg-obsidian/50 text-warmWhite transition-all duration-200 group-hover:border-gold-highlight group-hover:text-gold-highlight group-hover:shadow-gold-glow">
          <Mail
            className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem]"
            aria-hidden="true"
          />
        </span>
      );
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgSceneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Restrained editorial entrance (400–700ms, power2.out, small vertical movement)
      const tl = gsap.timeline({
        defaults: {
          ease: MOTION_TOKENS.ease.primary,
          duration: MOTION_TOKENS.duration.entrance,
        },
      });

      tl.fromTo(
        '[data-hero-portrait]',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.75 },
        0
      )
        .fromTo(
          '[data-hero-eyebrow]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' },
          0.1
        )
        .fromTo(
          '[data-hero-headline-line]',
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            clearProps: 'transform,opacity,visibility',
          },
          0.16
        )
        .fromTo(
          '[data-hero-roles]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' },
          0.35
        )
        .fromTo(
          '[data-hero-ctas]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' },
          0.42
        )
        .fromTo(
          '[data-hero-chrome]',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, clearProps: 'opacity,visibility' },
          0.48
        );

      // Restrained Hero -> About continuity transition (subtle 24px shift and gentle fade, no excessive zoom)
      gsap.registerPlugin(ScrollTrigger);
      if (bgSceneRef.current) {
        gsap.fromTo(
          bgSceneRef.current,
          { y: 0, opacity: 1 },
          {
            y: 24,
            opacity: 0.72,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const { headlineLines } = HERO_CONTENT;

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction and Hero"
      className="relative min-h-screen w-full overflow-hidden bg-obsidian pt-24 pb-10 md:pt-28 lg:pt-24 lg:pb-10 flex flex-col justify-between"
    >
      {/* =====================================================================
          1. LAYERED HERO BACKGROUND:
             (a) Portrait & Orbital Environment Base
             (b) Atmospheric Classical Architecture Background Video + Dark Gold Vignette
             (c) Bottom Seam Dissolve into Section 02
         ===================================================================== */}
      <div
        ref={bgSceneRef}
        data-hero-portrait
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Base Layer: Ahmed's Widescreen Portrait & Orbital Scene (Desktop) */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src={HERO_CONTENT.portrait.src}
            alt={HERO_CONTENT.portrait.alt}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-right-bottom xl:object-center select-none"
          />
        </div>

        {/* Atmospheric Classical Architecture Video Layer (Sunlit Ancient Ruins & Columns)
            Blended softly into the dark obsidian negative space with a strong dark vignette */}
        <HeroBackgroundVideo posterSrc={HERO_CONTENT.portrait.src} />

        {/* Smooth bottom-edge transition gradient into Section 02 (About) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian via-obsidian/65 to-transparent"
        />
      </div>

      {/* =====================================================================
          2. DESKTOP LEFT VERTICAL SECTION PROGRESS RAIL (01 / 07)
         ===================================================================== */}
      <aside
        data-hero-chrome
        aria-label="Section progress indicator"
        className="pointer-events-none absolute left-5 xl:left-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        <div className="relative h-36 w-[1.5px] bg-gradient-to-b from-transparent via-gold/55 to-gold-highlight">
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-highlight shadow-[0_0_10px_2px_rgba(229,190,120,0.9)]" />
        </div>

        <span
          className="py-2 font-display text-[0.75rem] font-medium tracking-[0.26em] text-gold-highlight/90 select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {HERO_CONTENT.sectionIndex} / {HERO_CONTENT.totalSections}
        </span>

        <div className="relative h-36 w-[1.5px] bg-gradient-to-t from-transparent via-gold/45 to-gold-highlight">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-highlight shadow-[0_0_10px_2px_rgba(229,190,120,0.9)]" />
        </div>
      </aside>

      {/* =====================================================================
          3. FOREGROUND EDITORIAL HEADLINE, ROLES & CTAS
         ===================================================================== */}
      <div className="relative z-20 my-auto w-full flex-1 flex items-center">
        <Container className="py-6 lg:py-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="relative z-30 flex flex-col items-start lg:col-span-8 xl:col-span-8">
              {/* Eyebrow with top glowing gold accent rule */}
              <div data-hero-eyebrow className="mb-5 md:mb-6">
                <div className="mb-3.5 relative h-[2px] w-16 bg-gradient-to-r from-gold-highlight via-gold to-transparent">
                  <span className="absolute left-3 -top-[2px] h-1.5 w-6 rounded-full bg-gold-highlight/80 blur-[3px]" />
                </div>
                <p className="font-display text-[length:var(--text-eyebrow)] font-medium tracking-[0.18em] uppercase text-gold-highlight">
                  {HERO_CONTENT.eyebrow}
                </p>
              </div>

              {/* Primary Dominant Headline */}
              <h1
                aria-label={HERO_CONTENT.fullHeadline}
                className="font-display text-[length:var(--text-hero-headline)] leading-[1.05] tracking-[-0.02em] uppercase text-warmWhite mb-6 md:mb-7 drop-shadow-[0_4px_24px_rgba(8,9,11,0.85)]"
              >
                <span data-hero-headline-line className="block">
                  <span className="font-bold text-warmWhite">
                    {headlineLines.line1Prefix}
                  </span>{' '}
                  <span className="font-light text-warmWhite/95">
                    {headlineLines.line1Build}
                  </span>{' '}
                  <span className="font-bold text-warmWhite">
                    {headlineLines.line1Digital}
                  </span>
                </span>

                <span data-hero-headline-line className="block">
                  <span className="font-bold text-warmWhite">
                    {headlineLines.line2Products}
                  </span>{' '}
                  <span className="font-light text-warmWhite/90">
                    {headlineLines.line2That}
                  </span>
                </span>

                <span
                  data-hero-headline-line
                  className="block lg:whitespace-nowrap"
                >
                  <span className="font-bold bg-gradient-to-r from-[#F3D592] via-[#E5BE78] to-[#C8A258] bg-clip-text text-transparent">
                    {headlineLines.line3MoveIdeas}
                  </span>{' '}
                  <span className="font-light bg-gradient-to-r from-[#F6DDA4] via-[#E5BE78] to-[#C49C50] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(229,190,120,0.35)]">
                    {headlineLines.line3Forward}
                  </span>
                </span>
              </h1>

              {/* Professional Title Row */}
              <p
                data-hero-roles
                className="mb-8 md:mb-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-[length:var(--text-subtitle)] font-normal text-warmWhite/95 drop-shadow-[0_2px_12px_rgba(8,9,11,0.9)]"
              >
                {HERO_CONTENT.roles.map((role, index) => (
                  <span key={role} className="inline-flex items-center gap-3">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-gold-highlight shadow-[0_0_8px_rgba(229,190,120,0.85)]"
                      />
                    )}
                    <span>{role}</span>
                  </span>
                ))}
              </p>

              {/* Primary & Secondary CTAs */}
              <div
                data-hero-ctas
                className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-5"
              >
                <Button
                  href={HERO_CONTENT.primaryCta.href}
                  variant="primary-gold"
                  size="lg"
                  className="w-full sm:w-auto justify-center min-w-[205px]"
                >
                  {HERO_CONTENT.primaryCta.label}
                </Button>

                <Button
                  href={HERO_CONTENT.secondaryCta.href}
                  variant="secondary-cyan"
                  size="lg"
                  className="w-full sm:w-auto justify-center min-w-[225px]"
                >
                  {HERO_CONTENT.secondaryCta.label}
                </Button>
              </div>
            </div>

            {/* MOBILE/TABLET (< 1024px) PORTRAIT */}
            <div className="relative mx-auto w-full max-w-[540px] aspect-[16/11] lg:hidden overflow-hidden rounded-2xl">
              <Image
                src={HERO_CONTENT.portrait.src}
                alt={HERO_CONTENT.portrait.alt}
                fill
                priority
                sizes="95vw"
                className="object-cover object-right"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* =====================================================================
          4. BOTTOM BAR: SCROLL CUE (LEFT) & LARGER SOCIAL LINKS STACK (RIGHT)
         ===================================================================== */}
      <Container className="relative z-30 mt-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-hero-chrome>
            <ScrollCue
              label={HERO_CONTENT.scrollCueLabel}
              href="#about"
              ariaLabel="Scroll to explore About section"
            />
          </div>

          <ul
            data-hero-chrome
            aria-label="Social and contact links"
            className="flex flex-row items-center gap-6 sm:flex-col sm:items-start sm:gap-3.5"
          >
            {SOCIAL_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="group inline-flex items-center gap-3.5 font-sans text-sm sm:text-[0.9375rem] font-medium tracking-wide text-warmWhite/95 transition-colors duration-200 hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                >
                  <SocialIcon id={item.id} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
