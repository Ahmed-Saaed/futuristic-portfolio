'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface OrbitalSculptureProps {
  className?: string;
}

export function OrbitalSculpture({ className }: OrbitalSculptureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Restrained parallax and smooth fade-in as Section 02 enters from the Hero
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          {
            y: -48,
            scale: 1.02,
            autoAlpha: 0.35,
          },
          {
            y: 24,
            scale: 1.08,
            autoAlpha: 0.85,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top 95%',
              end: 'bottom 10%',
              scrub: 0.9,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative w-full h-full select-none overflow-hidden',
        className
      )}
    >
      {/* Subtle ambient gold/cyan background glow */}
      <div className="absolute right-[12%] top-[24%] h-80 w-80 rounded-full bg-gold/15 blur-[130px]" />
      <div className="absolute right-[4%] bottom-[16%] h-80 w-96 rounded-full bg-cyan/15 blur-[140px]" />

      {/* Flat atmospheric image smoothly faded into the obsidian background */}
      <div
        ref={imageWrapRef}
        className="relative h-full w-full min-h-[420px] lg:min-h-full opacity-80"
        style={{
          maskImage:
            'radial-gradient(ellipse 85% 82% at 68% 52%, rgba(0,0,0,0.92) 32%, rgba(0,0,0,0.55) 62%, transparent 94%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 82% at 68% 52%, rgba(0,0,0,0.92) 32%, rgba(0,0,0,0.55) 62%, transparent 94%)',
        }}
      >
        <Image
          src="/images/about-orbital-sculpture.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 68vw"
          className="object-cover object-right lg:object-center contrast-[1.03] brightness-[0.88]"
        />

        {/* Multi-directional obsidian gradient fades so the image dissolves seamlessly into the dark canvas */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-obsidian via-obsidian/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent" />
      </div>
    </div>
  );
}
