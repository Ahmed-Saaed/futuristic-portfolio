'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface ProofOrbitalFrameProps {
  className?: string;
}

/**
 * Connects Section 03 (Capabilities) to Section 04 (Proof):
 * The three technical layers from Capabilities converge into a luminous 3D glass
 * architectural frame with glowing `</>` emblem, metallic gold and cyan orbital
 * tracks, and floating obsidian fragments on the upper-right of the Proof section.
 */
export function ProofOrbitalFrame({ className }: ProofOrbitalFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backPanelRef = useRef<SVGGElement>(null);
  const midPanelRef = useRef<SVGGElement>(null);
  const frontPanelRef = useRef<SVGGElement>(null);
  const orbitOuterRef = useRef<SVGGElement>(null);
  const orbitInnerRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section 03 -> Section 04 Convergence Transition:
      // The three technical layers converge horizontally and lock into the upright luminous frame
      const convergeTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 92%',
          end: 'center 48%',
          scrub: 0.85,
        },
      });

      convergeTl
        .fromTo(
          [orbitOuterRef.current, orbitInnerRef.current],
          {
            scale: 0.82,
            rotation: 18,
            autoAlpha: 0.25,
            transformOrigin: '50% 50%',
          },
          {
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            ease: 'power2.out',
          },
          0
        )
        .fromTo(
          backPanelRef.current,
          { x: -70, y: -45, autoAlpha: 0.15 },
          { x: 0, y: 0, autoAlpha: 1, ease: 'power2.out' },
          0.04
        )
        .fromTo(
          midPanelRef.current,
          { x: -35, y: -25, autoAlpha: 0.2 },
          { x: 0, y: 0, autoAlpha: 1, ease: 'power2.out' },
          0.08
        )
        .fromTo(
          frontPanelRef.current,
          { x: 35, y: -55, scale: 0.9, autoAlpha: 0.25, transformOrigin: '50% 50%' },
          { x: 0, y: 0, scale: 1, autoAlpha: 1, ease: 'power2.out' },
          0.1
        );

      // Slow ambient orbital movement
      gsap.to(orbitOuterRef.current, {
        rotation: 4,
        transformOrigin: '50% 50%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(orbitInnerRef.current, {
        rotation: -5,
        transformOrigin: '50% 50%',
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('[data-proof-shard]', {
        y: 'random(-9, 9)',
        x: 'random(-5, 5)',
        rotation: 'random(-7, 7)',
        duration: 'random(4.2, 6.4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative w-full select-none',
        className
      )}
    >
      {/* Ambient gold and electric cyan volumetric glow */}
      <div className="absolute left-[18%] top-[18%] h-56 w-64 rounded-full bg-gold/20 blur-[105px]" />
      <div className="absolute right-[10%] top-[22%] h-64 w-72 rounded-full bg-cyan/22 blur-[115px]" />

      <svg
        viewBox="0 0 680 330"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient
            id="proof-orbit-gold"
            x1="40"
            y1="240"
            x2="620"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFF2C6" />
            <stop offset="35%" stopColor="#E5BE78" />
            <stop offset="70%" stopColor="#C4A45A" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFF0C0" />
          </linearGradient>

          <linearGradient
            id="proof-orbit-cyan"
            x1="120"
            y1="260"
            x2="640"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E5BE78" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#00D5E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7AF6FF" />
          </linearGradient>

          <linearGradient
            id="proof-panel-glass"
            x1="310"
            y1="40"
            x2="540"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1D2A34" stopOpacity="0.72" />
            <stop offset="52%" stopColor="#0E151B" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#091922" stopOpacity="0.76" />
          </linearGradient>

          <linearGradient
            id="proof-panel-rim"
            x1="310"
            y1="30"
            x2="555"
            y2="255"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFE4A0" />
            <stop offset="45%" stopColor="#00D5E8" />
            <stop offset="100%" stopColor="#7CF5FF" />
          </linearGradient>

          <filter
            id="proof-gold-glow"
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
          >
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="9" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="proof-cyan-glow"
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
          >
            <feGaussianBlur stdDeviation="4.5" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Back Orbital Rings */}
        <g ref={orbitOuterRef}>
          <ellipse
            cx="370"
            cy="170"
            rx="275"
            ry="88"
            transform="rotate(-14 370 170)"
            stroke="url(#proof-orbit-gold)"
            strokeWidth="2.4"
            filter="url(#proof-gold-glow)"
          />
          <ellipse
            cx="375"
            cy="176"
            rx="295"
            ry="96"
            transform="rotate(-12 375 176)"
            stroke="#C4A45A"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="200 50 140 40"
          />
          {/* Specular flare points along the golden track */}
          <circle
            cx="112"
            cy="214"
            r="3.5"
            fill="#FFF7DC"
            filter="url(#proof-gold-glow)"
          />
          <circle
            cx="596"
            cy="96"
            r="4"
            fill="#FFF7DC"
            filter="url(#proof-gold-glow)"
          />
        </g>

        <g ref={orbitInnerRef}>
          <ellipse
            cx="392"
            cy="186"
            rx="242"
            ry="74"
            transform="rotate(-11 392 186)"
            stroke="url(#proof-orbit-cyan)"
            strokeWidth="2.2"
            filter="url(#proof-cyan-glow)"
          />
        </g>

        {/* 2. Three Converged Upright 3D Glass Monolith Frames (Evolved from Section 03 Slabs) */}
        {/* Layer 1 (Back-left smaller glass frame) */}
        <g ref={backPanelRef}>
          <polygon
            points="210,165 256,146 242,226 196,242"
            fill="url(#proof-panel-glass)"
            stroke="#587788"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <polyline
            points="210,165 256,146 242,226"
            stroke="#E5BE78"
            strokeWidth="1.4"
            strokeOpacity="0.65"
          />
        </g>

        {/* Layer 2 (Mid-left vertical glass monolith frame) */}
        <g ref={midPanelRef}>
          {/* 3D Side extrusion */}
          <polygon
            points="266,86 280,82 254,244 240,250"
            fill="#141E27"
            stroke="#C4A45A"
            strokeWidth="1.1"
            strokeOpacity="0.6"
          />
          {/* Front glass face */}
          <polygon
            points="280,82 365,58 338,220 254,244"
            fill="url(#proof-panel-glass)"
            stroke="url(#proof-panel-rim)"
            strokeWidth="1.6"
            opacity="0.88"
          />
          {/* Top-left golden specular glint */}
          <circle
            cx="280"
            cy="82"
            r="3"
            fill="#FFF4CE"
            filter="url(#proof-gold-glow)"
          />
        </g>

        {/* Layer 3 (Primary Foreground Glass Frame with Glowing `</>` Code Emblem) */}
        <g ref={frontPanelRef}>
          {/* 3D Left & Bottom bevel extrusion */}
          <polygon
            points="356,56 370,50 338,236 324,242"
            fill="#101B23"
            stroke="#E5BE78"
            strokeWidth="1.3"
            strokeOpacity="0.75"
          />
          <polygon
            points="338,236 534,192 544,200 324,242"
            fill="#0A1822"
            stroke="#00D5E8"
            strokeWidth="1.4"
            strokeOpacity="0.85"
          />

          {/* Main translucent isometric upright glass screen */}
          <polygon
            points="370,50 564,12 534,192 338,236"
            fill="url(#proof-panel-glass)"
            stroke="url(#proof-panel-rim)"
            strokeWidth="2.2"
          />

          {/* Top-right cyan and top-left gold corner flares */}
          <circle
            cx="370"
            cy="50"
            r="3.5"
            fill="#FFF4CE"
            filter="url(#proof-gold-glow)"
          />
          <circle
            cx="548"
            cy="16"
            r="4"
            fill="#88F7FF"
            filter="url(#proof-cyan-glow)"
          />

          {/* Glowing Champagne-Gold `</>` Code Emblem inside the converged glass frame */}
          <g
            transform="translate(452, 126) skewY(-11)"
            filter="url(#proof-gold-glow)"
          >
            {/* Left `<` bracket */}
            <path
              d="M -24 -18 L -46 0 L -24 18"
              stroke="#FFE09E"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center `/` slash */}
            <path
              d="M 10 -24 L -10 24"
              stroke="#FFE09E"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            {/* Right `>` bracket */}
            <path
              d="M 24 -18 L 46 0 L 24 18"
              stroke="#FFE09E"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* 3. Foreground Obsidian Ridge & Floating Shards */}
        <path
          d="M 160 288 L 245 256 L 340 274 L 455 242 L 565 266 L 650 232 L 680 288 Z"
          fill="#090C10"
          stroke="url(#proof-orbit-gold)"
          strokeWidth="1.2"
          strokeOpacity="0.55"
        />

        {/* Upper-left floating obsidian shard */}
        <g data-proof-shard transform="translate(42, 34)">
          <polygon
            points="22,4 48,16 40,46 12,42 4,20"
            fill="#0E1217"
            stroke="#C4A45A"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
          <polygon
            points="22,4 48,16 26,28 4,20"
            fill="#1B222A"
            opacity="0.85"
          />
        </g>

        {/* Lower-left floating shard near filter bar */}
        <g data-proof-shard transform="translate(36, 212)">
          <polygon
            points="18,4 40,14 34,36 10,34 4,16"
            fill="#0C1014"
            stroke="#E5BE78"
            strokeWidth="1.1"
            strokeOpacity="0.6"
          />
        </g>

        {/* Far-right floating obsidian shard */}
        <g data-proof-shard transform="translate(612, 138)">
          <polygon
            points="20,4 46,14 38,42 12,40 4,18"
            fill="#0C1319"
            stroke="#00D5E8"
            strokeWidth="1.3"
            strokeOpacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}
