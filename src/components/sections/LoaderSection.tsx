'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Monogram } from '@/components/ui/Monogram';
import { BRAND_CONFIG, HERO_CONTENT } from '@/data/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface LoaderSectionProps {
  onComplete?: () => void;
}

export function LoaderSection({ onComplete }: LoaderSectionProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(100);
      setIsDone(true);
      onComplete?.();
      return;
    }

    let isMounted = true;
    let currentProgress = 12;
    setProgress(currentProgress);

    // Milestone 1: Document Ready & Fonts Ready
    const updateProgress = (target: number) => {
      if (!isMounted) return;
      currentProgress = Math.max(currentProgress, target);
      setProgress(currentProgress);
    };

    if (document.readyState === 'complete') {
      updateProgress(45);
    } else {
      window.addEventListener('load', () => updateProgress(45), { once: true });
    }

    if ('fonts' in document) {
      document.fonts.ready
        .then(() => updateProgress(70))
        .catch(() => updateProgress(70));
    } else {
      updateProgress(70);
    }

    // Milestone 2: Preload Hero Portrait Asset
    const img = new window.Image();
    img.src = HERO_CONTENT.portrait.src;

    const finalizeLoading = () => {
      if (!isMounted) return;
      updateProgress(100);

      const exitTimer = window.setTimeout(() => {
        if (!isMounted) return;
        const overlay = overlayRef.current;
        if (!overlay) {
          setIsDone(true);
          onComplete?.();
          return;
        }

        gsap.to(overlay, {
          autoAlpha: 0,
          scale: 1.03,
          duration: 0.65,
          ease: 'power3.inOut',
          onComplete: () => {
            if (!isMounted) return;
            setIsDone(true);
            onComplete?.();
          },
        });
      }, 240);

      return () => window.clearTimeout(exitTimer);
    };

    img.onload = finalizeLoading;
    img.onerror = finalizeLoading;

    // Sensible maximum loading duration fallback (1100ms) so it never blocks
    const maxTimeout = window.setTimeout(finalizeLoading, 1100);

    return () => {
      isMounted = false;
      window.clearTimeout(maxTimeout);
    };
  }, [onComplete, prefersReducedMotion]);

  if (isDone) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Ahmed Sa'ed Portfolio"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian px-6"
    >
      {/* Subtle ambient gold/cyan radial aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-gold/10 blur-[90px]"
      />

      <div className="relative flex flex-col items-center gap-5">
        <Monogram
          size="xl"
          fillProgress={progress}
          glow={progress >= 95}
          className="transition-all duration-300"
        />

        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-xs font-medium tracking-[0.32em] uppercase text-warmWhite/85">
            {BRAND_CONFIG.name}
          </span>
          <div className="h-[1.5px] w-32 overflow-hidden rounded-full bg-borderDark/70">
            <div
              className="h-full bg-gradient-to-r from-gold via-gold-highlight to-cyan transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

