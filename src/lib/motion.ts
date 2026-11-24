import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Centralized Portfolio-Wide Motion Tokens & Utilities.
 * Guiding principle: The experience must feel cinematic even when nothing is moving.
 * All motion is restrained, purposeful, and uses consistent timings and easing.
 */
export const MOTION_TOKENS = {
  duration: {
    /** Micro-interactions: 150–250ms */
    micro: 0.2,
    /** Element entrances: 400–700ms */
    entrance: 0.55,
    /** Section transitions: 600–900ms */
    section: 0.75,
  },
  ease: {
    primary: 'power2.out',
    smoothInOut: 'power2.inOut',
  },
  offset: {
    subtleY: 16,
    cardY: 20,
    parallaxY: 20,
  },
  stagger: {
    tight: 0.06,
    normal: 0.09,
  },
} as const;

export interface SectionEntranceStep {
  selector: string;
  at?: number;
  y?: number;
  x?: number;
  stagger?: number;
  duration?: number;
}

/**
 * Creates a clean, single-pass scroll-triggered entrance timeline for a section.
 * Uses `once: true` by default so content never disappears or re-animates awkwardly when scrolling back up.
 */
export function createSectionEntranceTimeline(
  triggerElement: HTMLElement,
  steps: SectionEntranceStep[]
): gsap.core.Timeline {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top 78%',
      once: true,
    },
    defaults: {
      ease: MOTION_TOKENS.ease.primary,
      duration: MOTION_TOKENS.duration.entrance,
    },
  });

  steps.forEach((step, idx) => {
    const targets = triggerElement.querySelectorAll(step.selector);
    if (targets.length === 0) return;

    tl.fromTo(
      targets,
      {
        autoAlpha: 0,
        y: step.y ?? MOTION_TOKENS.offset.subtleY,
        x: step.x ?? 0,
      },
      {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration: step.duration ?? MOTION_TOKENS.duration.entrance,
        stagger: step.stagger ?? 0,
        clearProps: 'transform,opacity,visibility',
      },
      step.at ?? idx * 0.08
    );
  });

  return tl;
}

/**
 * Applies a restrained, low-amplitude vertical scroll transition to a section background
 * (`±20px` max, zero continuous loops) to create visual continuity between neighboring sections.
 */
export function createRestrainedSectionParallax(
  triggerElement: HTMLElement,
  targetElement: HTMLElement | null,
  options?: { fromY?: number; toY?: number; fromOpacity?: number; toOpacity?: number }
): gsap.core.Tween | null {
  if (!targetElement) return null;

  gsap.registerPlugin(ScrollTrigger);

  return gsap.fromTo(
    targetElement,
    {
      y: options?.fromY ?? -16,
      opacity: options?.fromOpacity ?? 0.65,
    },
    {
      y: options?.toY ?? 16,
      opacity: options?.toOpacity ?? 0.92,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 95%',
        end: 'bottom 10%',
        scrub: 0.6,
      },
    }
  );
}
