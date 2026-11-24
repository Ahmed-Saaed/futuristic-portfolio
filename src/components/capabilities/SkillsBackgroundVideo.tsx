'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface SkillsBackgroundVideoProps {
  videoSrc?: string;
  className?: string;
}

/**
 * Lazy-Loaded Atmospheric Background Video for Section 03 (Capabilities / Skills).
 * - Configured for Pixabay "Pyramid Loop Animation" (https://pixabay.com/videos/pyramid-loop-animation-360946/)
 *   at `/videos/pyramid-loop-animation-360946.mp4` with automatic fallback to `/videos/skills-golden-atmosphere.mp4`.
 * - Lazy-loaded via `IntersectionObserver` (`rootMargin: '250px'`) so it never downloads during initial Hero load.
 * - Pauses automatically when scrolled out of view to save GPU/battery.
 * - Respects `prefers-reduced-motion` and Save-Data mode.
 */
export function SkillsBackgroundVideo({
  videoSrc = '/videos/pyramid-loop-animation-360946.mp4',
  className,
}: SkillsBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [currentSrc, setCurrentSrc] = useState<string>(videoSrc);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  // 1. Lazy-load the video only when the user scrolls near Section 03
  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldLoadVideo(false);
      setIsVideoPlaying(false);
      return;
    }

    const navConnection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    if (navConnection?.saveData) {
      setShouldLoadVideo(false);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            setIsInViewport(true);
          } else {
            setIsInViewport(false);
          }
        });
      },
      { rootMargin: '250px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // 2. Play when in viewport, pause when scrolled away
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!shouldLoadVideo || !videoEl) return;

    if (isInViewport) {
      videoEl
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => setIsVideoPlaying(false));
    } else {
      videoEl.pause();
    }
  }, [shouldLoadVideo, isInViewport]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 overflow-hidden select-none',
        className
      )}
    >
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src={currentSrc}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setIsVideoPlaying(true)}
          onError={() => {
            if (currentSrc !== '/videos/skills-golden-atmosphere.mp4') {
              setCurrentSrc('/videos/skills-golden-atmosphere.mp4');
            } else {
              setIsVideoPlaying(false);
            }
          }}
          className={cn(
            'h-full w-full object-cover object-center transition-opacity duration-1000 ease-out',
            isVideoPlaying
              ? 'opacity-[0.38] mix-blend-screen contrast-125 brightness-95'
              : 'opacity-0'
          )}
        />
      )}

      {/* Subtle dual-tone champagne-gold and electric-cyan architectural radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 66% 38%, rgba(0, 213, 232, 0.09) 0%, rgba(196, 164, 90, 0.08) 36%, rgba(8, 9, 11, 0.9) 76%)',
        }}
      />

      {/* Top and bottom obsidian transition feathers */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-obsidian via-obsidian/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent" />
    </div>
  );
}
