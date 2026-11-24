'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Mail } from 'lucide-react';
import { HERO_CONTENT, SOCIAL_LINKS } from '@/data/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SocialLinkItem } from '@/types/common';

function SocialIcon({ id }: { id: SocialLinkItem['id'] }) {
  switch (id) {
    case 'github':
      return (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-warmWhite text-obsidian transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-highlight">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 fill-current"
            aria-hidden="true"
          >
            <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63 0.3 12 0.3z" />
          </svg>
        </span>
      );
    case 'linkedin':
      return (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-warmWhite text-obsidian transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-highlight">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 fill-current"
            aria-hidden="true"
          >
            <path d="M6.94 8.5v12.06H2.92V8.5h4.02zm.26-3.72c0 1.16-.87 2.09-2.26 2.09-1.35 0-2.22-.93-2.22-2.09 0-1.18.9-2.09 2.27-2.09s2.21.91 2.21 2.09zM21.08 13.66v6.9h-4.01v-6.44c0-1.62-.58-2.72-2.03-2.72-1.11 0-1.77.75-2.06 1.47-.11.26-.13.62-.13.99v6.7H8.84s.05-10.87 0-12.06h4.01v1.71c.53-.82 1.49-1.99 3.62-1.99 2.64 0 4.61 1.72 4.61 5.44z" />
          </svg>
        </span>
      );
    case 'email':
      return (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[5px] border border-warmWhite/80 text-warmWhite transition-colors duration-300 group-hover:border-gold-highlight group-hover:text-gold-highlight">
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      );
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered editorial entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '[data-hero-eyebrow]',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.75 },
        0.15
      )
        .fromTo(
          '[data-hero-headline-line]',
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.11 },
          0.25
        )
        .fromTo(
          '[data-hero-roles]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.55
        )
        .fromTo(
          '[data-hero-ctas]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          0.65
        )
        .fromTo(
          '[data-hero-portrait]',
          { autoAlpha: 0, scale: 0.96, y: 20 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          0.2
        )
        .fromTo(
          '[data-hero-chrome]',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.9, stagger: 0.1 },
          0.75
        );

      // Continuous subtle orbital pulse and floating shard motion
      if (haloRef.current) {
        gsap.to(haloRef.current, {
          rotation: 6,
          scale: 1.02,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (shardsRef.current) {
        gsap.to('[data-floating-shard]', {
          y: 'random(-10, 10)',
          x: 'random(-6, 6)',
          rotation: 'random(-8, 8)',
          duration: 'random(4, 6.5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.3,
        });
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
      className="relative min-h-screen w-full overflow-hidden bg-obsidian pt-24 pb-16 md:pt-28 lg:pt-24 lg:pb-12 flex flex-col justify-between"
    >
      {/* =====================================================================
          1. AMBIENT VOLUMETRIC BACKGROUND LIGHTING & ATMOSPHERE
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Warm champagne gold atmospheric haze behind portrait left */}
        <div className="absolute right-[18%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#C4A45A]/15 blur-[130px]" />
        {/* Electric cyan atmospheric haze behind portrait right & bottom */}
        <div className="absolute right-[4%] top-[24%] h-[460px] w-[460px] rounded-full bg-[#00D5E8]/15 blur-[140px]" />
        <div className="absolute bottom-[-8%] right-[16%] h-[320px] w-[540px] rounded-full bg-[#00D5E8]/20 blur-[120px]" />
        {/* Warm gold bottom-left terrain glow */}
        <div className="absolute bottom-[-10%] left-[4%] h-[260px] w-[460px] rounded-full bg-[#E5BE78]/15 blur-[110px]" />

        {/* Subtle atmospheric diagonal dark beams */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 72% 44%, rgba(196, 164, 90, 0.12) 0%, rgba(0, 213, 232, 0.08) 32%, rgba(8, 9, 11, 0.96) 70%)',
          }}
        />
      </div>

      {/* =====================================================================
          2. DESKTOP LEFT VERTICAL SECTION PROGRESS RAIL (01 / 07)
         ===================================================================== */}
      <aside
        data-hero-chrome
        aria-label="Section progress indicator"
        className="pointer-events-none fixed left-5 xl:left-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        {/* Top vertical gold line with glowing node */}
        <div className="relative h-36 w-[1.5px] bg-gradient-to-b from-transparent via-gold/55 to-gold-highlight">
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-highlight shadow-[0_0_10px_2px_rgba(229,190,120,0.9)]" />
        </div>

        {/* Vertical 01 / 07 text */}
        <span
          className="py-2 font-display text-[0.75rem] font-medium tracking-[0.26em] text-gold-highlight/90 select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {HERO_CONTENT.sectionIndex} / {HERO_CONTENT.totalSections}
        </span>

        {/* Bottom vertical gold line with glowing node */}
        <div className="relative h-36 w-[1.5px] bg-gradient-to-t from-transparent via-gold/45 to-gold-highlight">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-highlight shadow-[0_0_10px_2px_rgba(229,190,120,0.9)]" />
        </div>
      </aside>

      {/* =====================================================================
          3. MAIN ASYMMETRIC 12-COLUMN HERO COMPOSITION
         ===================================================================== */}
      <Container className="relative z-20 my-auto pt-4 pb-8 lg:py-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-6">
          {/* LEFT COLUMN: Editorial Headline, Positioning & CTAs */}
          <div className="relative z-20 flex flex-col items-start lg:col-span-7 xl:col-span-7">
            {/* Eyebrow with top glowing gold accent rule */}
            <div data-hero-eyebrow className="mb-5 md:mb-6">
              <div className="mb-3.5 relative h-[2px] w-16 bg-gradient-to-r from-gold-highlight via-gold to-transparent">
                <span className="absolute left-3 -top-[2px] h-1.5 w-6 rounded-full bg-gold-highlight/80 blur-[3px]" />
              </div>
              <p className="font-display text-[length:var(--text-eyebrow)] font-medium tracking-[0.18em] uppercase text-gold-highlight">
                {HERO_CONTENT.eyebrow}
              </p>
            </div>

            {/* Primary Dominant Headline — Exact preservation with dual-weight editorial styling */}
            <h1
              aria-label={HERO_CONTENT.fullHeadline}
              className="font-display text-[length:var(--text-hero-headline)] leading-[1.06] tracking-[-0.02em] uppercase text-warmWhite mb-6 md:mb-7"
            >
              {/* Line 1: I BUILD DIGITAL */}
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

              {/* Line 2: PRODUCTS THAT */}
              <span data-hero-headline-line className="block">
                <span className="font-bold text-warmWhite">
                  {headlineLines.line2Products}
                </span>{' '}
                <span className="font-light text-warmWhite/90">
                  {headlineLines.line2That}
                </span>
              </span>

              {/* Line 3: MOVE IDEAS FORWARD. */}
              <span
                data-hero-headline-line
                className="block lg:whitespace-nowrap"
              >
                <span className="font-bold bg-gradient-to-r from-[#F3D592] via-[#E5BE78] to-[#C8A258] bg-clip-text text-transparent">
                  {headlineLines.line3MoveIdeas}
                </span>{' '}
                <span className="font-light bg-gradient-to-r from-[#E5BE78] via-[#C9A35B] to-[#B38C44] bg-clip-text text-transparent">
                  {headlineLines.line3Forward}
                </span>
              </span>
            </h1>

            {/* Professional Title Row with Gold Dot Separators */}
            <p
              data-hero-roles
              className="mb-8 md:mb-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-[length:var(--text-subtitle)] font-normal text-warmWhite/90"
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

          {/* RIGHT COLUMN: Cinematic Portrait, Metallic Orbital Ring & Floating Obsidian Shards */}
          <div
            data-hero-portrait
            className="relative z-10 mx-auto w-full max-w-[460px] sm:max-w-[520px] lg:col-span-5 xl:col-span-5 lg:max-w-none"
          >
            <div className="relative mx-auto aspect-[4/4.7] w-full lg:scale-110 lg:translate-x-2 xl:scale-[1.16] xl:translate-x-4">
              {/* 1. Metallic Concentric Gold & Cyan Orbital Ring behind Ahmed's Head/Shoulders */}
              <div
                ref={haloRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[-6%] top-[4%] bottom-[14%] z-0 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 560 560"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="orbital-gold-cyan"
                      x1="40"
                      y1="120"
                      x2="520"
                      y2="420"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#FFE3A3" />
                      <stop offset="38%" stopColor="#C4A45A" />
                      <stop offset="72%" stopColor="#8E7238" />
                      <stop offset="100%" stopColor="#00D5E8" />
                    </linearGradient>

                    <linearGradient
                      id="orbital-inner-rim"
                      x1="80"
                      y1="80"
                      x2="480"
                      y2="480"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#FFF0C4" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#C4A45A" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#00D5E8" stopOpacity="0.9" />
                    </linearGradient>

                    <filter
                      id="orbital-glow"
                      x="-25%"
                      y="-25%"
                      width="150%"
                      height="150%"
                    >
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feComposite
                        in="SourceGraphic"
                        in2="blur"
                        operator="over"
                      />
                    </filter>
                  </defs>

                  {/* Outer technical orbital track */}
                  <circle
                    cx="280"
                    cy="275"
                    r="242"
                    stroke="url(#orbital-gold-cyan)"
                    strokeWidth="2.2"
                    strokeOpacity="0.7"
                    strokeDasharray="340 40 180 30"
                  />

                  {/* Thick 3D metallic ring body */}
                  <circle
                    cx="280"
                    cy="275"
                    r="214"
                    stroke="url(#orbital-gold-cyan)"
                    strokeWidth="22"
                    strokeOpacity="0.28"
                  />

                  {/* Specular bright inner gold/cyan ring */}
                  <circle
                    cx="280"
                    cy="275"
                    r="204"
                    stroke="url(#orbital-inner-rim)"
                    strokeWidth="3.5"
                    filter="url(#orbital-glow)"
                  />

                  {/* Outer cyan rim highlight arc on the right */}
                  <path
                    d="M 420 98 A 232 232 0 0 1 505 345"
                    stroke="#00D5E8"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#orbital-glow)"
                  />

                  {/* Left warm gold specular flare arc */}
                  <path
                    d="M 88 335 A 204 204 0 0 1 205 86"
                    stroke="#FFF2CC"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    filter="url(#orbital-glow)"
                  />
                </svg>
              </div>

              {/* 2. Floating 3D Obsidian Geometric Shards (Desktop/Tablet decorative depth) */}
              <div
                ref={shardsRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 hidden sm:block"
              >
                {/* Left floating obsidian shard */}
                <svg
                  data-floating-shard
                  viewBox="0 0 80 96"
                  className="absolute left-[-4%] top-[24%] h-14 w-12 drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)]"
                >
                  <polygon
                    points="42,4 74,32 60,88 12,72 8,28"
                    fill="#101418"
                    stroke="#C4A45A"
                    strokeWidth="1.2"
                    strokeOpacity="0.55"
                  />
                  <polygon
                    points="42,4 74,32 46,48 12,72"
                    fill="#1B2228"
                    opacity="0.75"
                  />
                  <polyline
                    points="42,4 46,48 60,88"
                    fill="none"
                    stroke="#00D5E8"
                    strokeWidth="1.2"
                    strokeOpacity="0.7"
                  />
                </svg>

                {/* Top-right floating obsidian shard */}
                <svg
                  data-floating-shard
                  viewBox="0 0 90 76"
                  className="absolute right-[-6%] top-[16%] h-14 w-16 drop-shadow-[0_14px_22px_rgba(0,213,232,0.22)]"
                >
                  <polygon
                    points="18,14 76,6 86,44 48,70 8,48"
                    fill="#0D1216"
                    stroke="#00D5E8"
                    strokeWidth="1.4"
                    strokeOpacity="0.75"
                  />
                  <polygon
                    points="18,14 76,6 52,38 8,48"
                    fill="#18242C"
                    opacity="0.85"
                  />
                </svg>

                {/* Mid-right smaller shard */}
                <svg
                  data-floating-shard
                  viewBox="0 0 64 64"
                  className="absolute right-[6%] top-[44%] h-9 w-9 drop-shadow-[0_10px_16px_rgba(0,0,0,0.9)]"
                >
                  <polygon
                    points="32,6 58,24 46,56 14,48"
                    fill="#11161B"
                    stroke="#E5BE78"
                    strokeWidth="1.2"
                    strokeOpacity="0.6"
                  />
                </svg>
              </div>

              {/* 3. Ahmed's Actual Portrait with Cinematic Blending Mask */}
              <div
                className="relative z-10 h-full w-full overflow-hidden rounded-b-[28px]"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 92% 90% at 52% 48%, black 64%, rgba(0,0,0,0.82) 78%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 92% 90% at 52% 48%, black 64%, rgba(0,0,0,0.82) 78%, transparent 100%)',
                }}
              >
                <Image
                  src={HERO_CONTENT.portrait.src}
                  alt={HERO_CONTENT.portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 620px"
                  className="object-cover object-top scale-[1.03] contrast-[1.04] brightness-[0.98]"
                />

                {/* Subtle bottom obsidian gradient melt so portrait merges into the dark crystalline base */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent"
                />
              </div>

              {/* 4. Bottom Cyan & Gold Crystalline Rim Light Under Portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 inset-x-6 z-20 h-12 rounded-full bg-gradient-to-r from-gold/30 via-cyan/45 to-cyan/20 blur-xl"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* =====================================================================
          4. CINEMATIC OBSIDIAN TERRAIN SILHOUETTE & BOTTOM CHROME BAR
         ===================================================================== */}
      {/* Low-poly crystalline obsidian ridge silhouette at the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 md:h-36 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="ridge-gold-left" x1="0" y1="0" x2="520" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E5BE78" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#C4A45A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#08090B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ridge-cyan-right" x1="760" y1="20" x2="1440" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D5E8" stopOpacity="0.65" />
              <stop offset="65%" stopColor="#00D5E8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#08090B" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Back dark ridge */}
          <path
            d="M0 160L0 68L115 96L240 52L390 112L515 74L680 132L860 118L1020 56L1190 92L1340 34L1440 58L1440 160Z"
            fill="#0A0C0F"
          />

          {/* Warm gold rim highlight along left obsidian peaks */}
          <path
            d="M0 68L115 96L240 52L390 112L515 74L680 132"
            stroke="url(#ridge-gold-left)"
            strokeWidth="2"
          />

          {/* Electric cyan rim highlight along right obsidian peaks */}
          <path
            d="M780 138L910 88L1020 56L1190 92L1340 34L1440 58"
            stroke="url(#ridge-cyan-right)"
            strokeWidth="2.2"
          />

          {/* Foreground obsidian base */}
          <path
            d="M0 160L0 105L160 128L310 86L490 138L740 148L940 102L1120 126L1290 78L1440 108L1440 160Z"
            fill="#08090B"
          />
        </svg>
      </div>

      {/* Bottom Bar: Scroll Cue (Left) & Vertical Social Links Stack (Right) */}
      <Container className="relative z-30 mt-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Bottom-Left: Scroll to explore mouse cue */}
          <a
            data-hero-chrome
            href="#about"
            aria-label="Scroll to explore About section"
            className="group inline-flex items-center gap-3.5 text-warmWhite/85 transition-colors duration-300 hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-full w-fit"
          >
            <span className="relative flex h-9 w-6 items-start justify-center rounded-full border-[1.5px] border-warmWhite/75 p-1.5 transition-colors duration-300 group-hover:border-gold-highlight">
              <span className="h-2 w-[2px] rounded-full bg-gold-highlight animate-bounce" />
            </span>
            <span className="font-sans text-xs sm:text-[0.8125rem] tracking-[0.04em] text-warmWhite/85 group-hover:text-gold-highlight">
              {HERO_CONTENT.scrollCueLabel}
            </span>
          </a>

          {/* Bottom-Right: Vertical Social Links (GitHub, LinkedIn, Email) */}
          <ul
            data-hero-chrome
            aria-label="Social and contact links"
            className="flex flex-row items-center gap-5 sm:flex-col sm:items-start sm:gap-3"
          >
            {SOCIAL_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="group inline-flex items-center gap-3 font-sans text-xs sm:text-[0.8125rem] font-normal tracking-wide text-warmWhite/85 transition-colors duration-300 hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-sm"
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
