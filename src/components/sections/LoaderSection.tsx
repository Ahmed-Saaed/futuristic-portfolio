'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Monogram } from '@/components/ui/Monogram';
import { BRAND_CONFIG, HERO_CONTENT } from '@/data/navigation';
import { MOTION_TOKENS } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface LoaderSectionProps {
  onComplete?: () => void;
}

/**
 * AS Monogram Loader Experience.
 * Tracks real document readiness, font readiness, and the Hero poster/portrait image.
 * Never waits for background video downloads, includes zero artificial delay,
 * and exits immediately once essential assets are ready.
 */
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
    let isExiting = false;
    let currentProgress = 20;
    setProgress(currentProgress);

    const updateProgress = (target: number) => {
      if (!isMounted) return;
      currentProgress = Math.max(currentProgress, target);
      setProgress(currentProgress);
    };

    const finalizeLoading = () => {
      if (!isMounted || isExiting) return;
      isExiting = true;
      updateProgress(100);

      const overlay = overlayRef.current;
      if (!overlay) {
        setIsDone(true);
        onComplete?.();
        return;
      }

      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.45,
        ease: MOTION_TOKENS.ease.smoothInOut,
        onComplete: () => {
          if (!isMounted) return;
          setIsDone(true);
          onComplete?.();
        },
      });
    };

    if (document.readyState === 'complete') {
      updateProgress(55);
    } else {
      window.addEventListener('load', () => updateProgress(55), { once: true });
    }

    if ('fonts' in document) {
      document.fonts.ready
        .then(() => updateProgress(80))
        .catch(() => updateProgress(80));
    } else {
      updateProgress(80);
    }

    // Track only the Hero portrait/poster image — NEVER wait for the background video
    const img = new window.Image();
    img.src = HERO_CONTENT.portrait.src;
    img.onload = finalizeLoading;
    img.onerror = finalizeLoading;

    // Fast 750ms maximum ceiling so the user is never blocked
    const maxTimeout = window.setTimeout(finalizeLoading, 750);

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-gold/10 blur-[90px]"
      />

      <div className="relative flex flex-col items-center gap-5">
        <Monogram
          size="xl"
          fillProgress={progress}
          glow={progress >= 95}
          className="transition-all duration-200"
        />

        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-xs font-medium tracking-[0.32em] uppercase text-warmWhite/85">
            {BRAND_CONFIG.name}
          </span>
          <div className="h-[1.5px] w-32 overflow-hidden rounded-full bg-borderDark/70">
            <div
              className="h-full bg-gradient-to-r from-gold via-gold-highlight to-cyan transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
