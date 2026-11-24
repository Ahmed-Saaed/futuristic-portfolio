'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface SkillsBackgroundVideoProps {
  videoSrc?: string;
  className?: string;
}

/**
 * Atmospheric Background Video for Section 03 (Capabilities / Skills).
 * - Uses `/videos/skills-golden-atmosphere.mp4` directly with `preload="auto"` and a generous
 *   `1200px` pre-scroll observer margin so the video is already buffered and playing the moment
 *   Section 03 enters the viewport (zero 404 retry delay).
 * - Pauses automatically when scrolled out of view to save GPU/battery.
 * - Respects `prefers-reduced-motion` and Save-Data mode.
 */
export function SkillsBackgroundVideo({
  videoSrc = '/videos/skills-golden-atmosphere.mp4',
  className,
}: SkillsBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // 1. Start buffering early (1200px before Section 03 enters the screen, or during idle time)
  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldLoadVideo(false);
      setIsVideoReady(false);
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

    // Begin preloading right after initial Hero hydration so it's ready before the user reaches Section 03
    const preloadTimer = window.setTimeout(() => {
      setShouldLoadVideo(true);
    }, 350);

    const el = containerRef.current;
    if (!el) {
      return () => window.clearTimeout(preloadTimer);
    }

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
      { rootMargin: '1200px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => {
      window.clearTimeout(preloadTimer);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // 2. Play immediately when near/in viewport, pause when far offscreen
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!shouldLoadVideo || !videoEl) return;

    if (isInViewport) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoReady(true))
          .catch(() => setIsVideoReady(false));
      }
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
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoReady(true)}
          onPlaying={() => setIsVideoReady(true)}
          onError={() => setIsVideoReady(false)}
          className={cn(
            'h-full w-full object-cover object-center transition-opacity duration-500 ease-out',
            isVideoReady
              ? 'opacity-[0.42] mix-blend-screen contrast-125 brightness-95'
              : 'opacity-0'
          )}
        />
      )}

      {/* Subtle dual-tone champagne-gold and electric-cyan architectural radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 66% 38%, rgba(0, 213, 232, 0.09) 0%, rgba(196, 164, 90, 0.08) 36%, rgba(8, 9, 11, 0.88) 76%)',
        }}
      />

      {/* Top and bottom obsidian transition feathers */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-obsidian via-obsidian/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent" />
    </div>
  );
}
