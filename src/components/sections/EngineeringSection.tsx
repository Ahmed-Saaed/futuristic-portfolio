'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ENGINEERING_PROCESS_CONTENT } from '@/data/engineering';
import { Container } from '@/components/ui/Container';
import { ProcessTimeline } from '@/components/engineering/ProcessTimeline';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ProcessStageId } from '@/types/common';

export function EngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statueStageRef = useRef<HTMLDivElement>(null);
  const orbitalRingsRef = useRef<SVGSVGElement>(null);
  const goldAuraRef = useRef<HTMLDivElement>(null);
  const cyanAuraRef = useRef<HTMLDivElement>(null);

  // Stage 01 ("UNDERSTAND") is expanded initially, matching the visual reference
  const [activeStageId, setActiveStageId] =
    useState<ProcessStageId>('understand');
  const prefersReducedMotion = useReducedMotion();

  const activeStage = useMemo(
    () =>
      ENGINEERING_PROCESS_CONTENT.stages.find(
        (stage) => stage.id === activeStageId
      ) ?? ENGINEERING_PROCESS_CONTENT.stages[0],
    [activeStageId]
  );

  // 1. Entrance & Scroll Parallax Animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Restrained scroll parallax on the monumental Greek marble statue
      if (statueStageRef.current) {
        gsap.fromTo(
          statueStageRef.current,
          { y: -32, scale: 1.01 },
          {
            y: 24,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 95%',
              end: 'bottom 5%',
              scrub: 0.9,
            },
          }
        );
      }

      // Slow ambient orbital ring movement around the Greek statue
      if (orbitalRingsRef.current) {
        gsap.to('[data-statue-orbit-outer]', {
          rotation: 5,
          transformOrigin: '50% 50%',
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('[data-statue-orbit-inner]', {
          rotation: -6,
          transformOrigin: '50% 50%',
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Staggered editorial reveal for Section 05 header and the 5 process cards
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
        '[data-process-eyebrow]',
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.7 },
        0
      )
        .fromTo(
          '[data-process-headline-line]',
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.14 },
          0.1
        )
        .fromTo(
          '[data-process-intro]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          0.32
        )
        .fromTo(
          '[data-process-caption]',
          { autoAlpha: 0, x: -14 },
          { autoAlpha: 1, x: 0, duration: 0.7 },
          0.44
        )
        .fromTo(
          '[data-process-card]',
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1 },
          0.52
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 2. Gentle Lighting & Orbital Variation When Switching Stages
  useEffect(() => {
    if (prefersReducedMotion || !activeStage) return;

    const { goldIntensity, cyanIntensity, orbitAngle } =
      activeStage.statueLightingFocus;

    if (goldAuraRef.current) {
      gsap.to(goldAuraRef.current, {
        opacity: goldIntensity * 0.42,
        scale: 0.92 + goldIntensity * 0.16,
        duration: 0.75,
        ease: 'power2.out',
      });
    }

    if (cyanAuraRef.current) {
      gsap.to(cyanAuraRef.current, {
        opacity: cyanIntensity * 0.45,
        scale: 0.92 + cyanIntensity * 0.16,
        duration: 0.75,
        ease: 'power2.out',
      });
    }

    if (orbitalRingsRef.current) {
      gsap.to(orbitalRingsRef.current, {
        rotation: orbitAngle * 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });
    }
  }, [activeStage, prefersReducedMotion]);

  // 3. Restrained Pointer Parallax on Statue & Orbital Rings (Desktop only)
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || !sectionRef.current || !statueStageRef.current)
      return;

    const rect = sectionRef.current.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(statueStageRef.current, {
      x: normX * 14,
      duration: 0.7,
      ease: 'power2.out',
    });

    if (orbitalRingsRef.current) {
      gsap.to(orbitalRingsRef.current, {
        x: normX * -18,
        y: normY * -12,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion || !statueStageRef.current) return;

    gsap.to(statueStageRef.current, {
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
    });

    if (orbitalRingsRef.current) {
      gsap.to(orbitalRingsRef.current, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="process-heading"
      className="relative min-h-screen w-full overflow-hidden bg-obsidian py-24 md:py-28 lg:py-20 flex flex-col justify-between"
    >
      {/* =====================================================================
          1. MONUMENTAL GREEK MARBLE STATUE CENTERPIECE & ORBITAL ENVIRONMENT
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Dynamic stage-responsive gold and cyan volumetric lighting auras */}
        <div
          ref={goldAuraRef}
          className="absolute right-[32%] top-[12%] h-96 w-96 rounded-full bg-gold-highlight/30 blur-[140px]"
        />
        <div
          ref={cyanAuraRef}
          className="absolute right-[12%] top-[18%] h-96 w-96 rounded-full bg-cyan/30 blur-[145px]"
        />

        {/* Monumental Greek Statue & Classical Fluted Columns Stage */}
        <div
          ref={statueStageRef}
          className="relative h-full w-full"
          style={{
            maskImage:
              'radial-gradient(ellipse 95% 92% at 62% 48%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.75) 76%, transparent 99%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 95% 92% at 62% 48%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.75) 76%, transparent 99%)',
          }}
        >
          <Image
            src="/images/process-statue-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[72%_top] lg:object-center contrast-[1.04] brightness-[0.95] select-none"
          />

          {/* Subtle top/bottom/left obsidian blends */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian via-obsidian/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-obsidian via-obsidian/40 to-transparent" />
        </div>

        {/* Interactive Animated SVG Orbital Light Tracks & Atmospheric Particles around the Statue */}
        <svg
          ref={orbitalRingsRef}
          viewBox="0 0 1440 860"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible hidden sm:block"
        >
          <defs>
            <linearGradient
              id="statue-orbit-gold"
              x1="480"
              y1="440"
              x2="1320"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFF0C4" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#E5BE78" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#00D5E8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFF0C4" stopOpacity="0.8" />
            </linearGradient>

            <filter
              id="statue-node-glow"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g data-statue-orbit-outer>
            <ellipse
              cx="940"
              cy="345"
              rx="420"
              ry="128"
              transform="rotate(-8 940 345)"
              stroke="url(#statue-orbit-gold)"
              strokeWidth="1.25"
              strokeOpacity="0.55"
              strokeDasharray="280 90 190 70"
            />
            <circle
              cx="532"
              cy="388"
              r="3"
              fill="#FFF4CE"
              filter="url(#statue-node-glow)"
            />
            <circle
              cx="1328"
              cy="282"
              r="3"
              fill="#FFF4CE"
              filter="url(#statue-node-glow)"
            />
          </g>

          <g data-statue-orbit-inner>
            <ellipse
              cx="920"
              cy="210"
              rx="280"
              ry="92"
              transform="rotate(-14 920 210)"
              stroke="#E5BE78"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="180 60"
            />
            <circle
              cx="658"
              cy="258"
              r="2.5"
              fill="#00E6FA"
              filter="url(#statue-node-glow)"
            />
          </g>
        </svg>
      </div>

      {/* =====================================================================
          2. DESKTOP LEFT VERTICAL PROGRESS LINE WITH LUMINOUS FLARE NODE
         ===================================================================== */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute left-5 xl:left-7 inset-y-8 z-20 hidden lg:flex flex-col items-center justify-center"
      >
        <div className="relative h-full w-[1px] bg-gradient-to-b from-gold/15 via-gold/60 to-gold/15">
          <span className="absolute top-[28%] left-1/2 -translate-x-1/2 h-9 w-[2.5px] rounded-full bg-[#FFF2C6] shadow-[0_0_14px_3px_rgba(229,190,120,0.95)]" />
        </div>
      </aside>

      {/* =====================================================================
          3. MAIN SECTION CONTENT: EDITORIAL INTRODUCTION + 5 EXPANDABLE STAGES
         ===================================================================== */}
      <Container className="relative z-20 my-auto">
        {/* Upper Left Editorial Introduction */}
        <div className="mb-10 lg:mb-12 max-w-[650px]">
          {/* Section Label: — 05 / THE PROCESS */}
          <div
            data-process-eyebrow
            className="mb-5 md:mb-6 inline-flex items-center gap-3.5"
          >
            <span
              aria-hidden="true"
              className="h-[1.5px] w-9 bg-gold-highlight/90"
            />
            <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.22em] uppercase text-gold-highlight">
              {ENGINEERING_PROCESS_CONTENT.sectionLabel}
            </span>
          </div>

          {/* Editorial Serif Headline: "A thoughtful process." / "A better product." */}
          <h2
            id="process-heading"
            aria-label={ENGINEERING_PROCESS_CONTENT.fullHeadline}
            className="font-serif text-[clamp(2.65rem,4.7vw+0.6rem,4.75rem)] font-semibold leading-[1.02] tracking-[-0.02em] mb-6 md:mb-7 drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]"
          >
            <span
              data-process-headline-line
              className="block text-warmWhite"
            >
              {ENGINEERING_PROCESS_CONTENT.headline.line1}
            </span>
            <span
              data-process-headline-line
              className="block bg-gradient-to-r from-[#F5D794] via-[#E5BE78] to-[#B9893E] bg-clip-text text-transparent"
            >
              {ENGINEERING_PROCESS_CONTENT.headline.line2}
            </span>
          </h2>

          {/* Supporting Text */}
          <p
            data-process-intro
            className="max-w-[540px] font-sans text-[length:var(--text-subtitle)] font-light leading-[1.6] text-warmWhite/90 mb-7 md:mb-8 drop-shadow-[0_2px_14px_rgba(8,9,11,0.9)]"
          >
            {ENGINEERING_PROCESS_CONTENT.supportingText}
          </p>

          {/* Supporting Caption with Top Golden Accent Rule */}
          <div data-process-caption className="space-y-3.5">
            <span
              aria-hidden="true"
              className="block h-[1.5px] w-16 bg-gradient-to-r from-gold-highlight to-gold/30"
            />
            <p className="font-display text-[0.72rem] sm:text-xs font-medium tracking-[0.24em] uppercase text-warmWhite/85">
              {ENGINEERING_PROCESS_CONTENT.supportingCaption}
            </p>
          </div>
        </div>

        {/* Mobile Monumental Statue Visual Preview Frame (< 1024px) so the statue remains a prominent centerpiece without colliding with cards */}
        <div
          aria-hidden="true"
          className="relative mx-auto mb-8 h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-gold/30 lg:hidden"
        >
          <Image
            src="/images/process-statue-bg.jpg"
            alt=""
            fill
            sizes="95vw"
            className="object-cover object-[70%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/30" />
        </div>

        {/* Lower 5-Stage Connected Expandable Timeline */}
        <ProcessTimeline
          stages={ENGINEERING_PROCESS_CONTENT.stages}
          activeStageId={activeStageId}
          onSelectStage={setActiveStageId}
        />
      </Container>
    </section>
  );
}
