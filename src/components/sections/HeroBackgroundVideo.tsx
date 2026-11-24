'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface HeroBackgroundVideoProps {
  videoSrc?: string;
  posterSrc: string;
  className?: string;
}

/**
 * Atmospheric Classical Architecture Background Video for the Hero Section.
 * - Source: Pexels ID 38045850 ("Ancient Ruins in Sunlit Glory", Royalty-Free Pexels License).
 * - Non-blocking: Loads asynchronously after initial hydration with `preload="metadata"`.
 * - Masked & faded from the right side so Ahmed's portrait, facial lighting, and orbital halo
 *   remain 100% crisp and unobstructed on the right while the left/center architectural space
 *   receives the sunlit classical atmosphere.
 */
export function HeroBackgroundVideo({
  videoSrc = '/videos/hero-ancient-architecture.mp4',
  posterSrc,
  className,
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [shouldMountVideo, setShouldMountVideo] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldMountVideo(false);
      setIsVideoPlaying(false);
      return;
    }

    const isDesktopOrTablet = window.matchMedia('(min-width: 768px)').matches;
    const navConnection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    if (!isDesktopOrTablet || navConnection?.saveData) {
      setShouldMountVideo(false);
      return;
    }

    setShouldMountVideo(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!shouldMountVideo || !videoEl) return;

    const attemptPlay = async () => {
      try {
        await videoEl.play();
        setIsVideoPlaying(true);
      } catch {
        setIsVideoPlaying(false);
      }
    };

    if (videoEl.readyState >= 2) {
      void attemptPlay();
    } else {
      videoEl.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => {
      videoEl.removeEventListener('canplay', attemptPlay);
    };
  }, [shouldMountVideo]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 overflow-hidden select-none',
        className
      )}
      style={{
        // Smoothly fade the video out across the right 48% of the screen so the portrait is 100% crisp
        maskImage:
          'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 34%, rgba(0,0,0,0.22) 56%, rgba(0,0,0,0) 74%)',
        WebkitMaskImage:
          'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 34%, rgba(0,0,0,0.22) 56%, rgba(0,0,0,0) 74%)',
      }}
    >
      {shouldMountVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setIsVideoPlaying(true)}
          onError={() => setIsVideoPlaying(false)}
          className={cn(
            'h-full w-full object-cover object-left transition-opacity duration-1000 ease-out',
            isVideoPlaying
              ? 'opacity-[0.38] mix-blend-screen contrast-125 brightness-90 saturate-[0.85]'
              : 'opacity-0'
          )}
        />
      )}

      {/* Subtle gold-tinted atmospheric wash on the left side */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 22% 42%, rgba(196, 164, 90, 0.08) 0%, rgba(8, 9, 11, 0.55) 48%, rgba(8, 9, 11, 0) 75%)',
        }}
      />

      {/* Top and bottom obsidian edge feathers */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-obsidian via-obsidian/65 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
    </div>
  );
}
