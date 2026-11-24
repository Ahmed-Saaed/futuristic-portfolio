'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 24,
  className,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: yOffset },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, yOffset, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}

