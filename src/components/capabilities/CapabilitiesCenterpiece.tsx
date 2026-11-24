'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import type { CapabilityAreaId } from '@/types/common';

export interface CapabilitiesCenterpieceProps {
  activeArea: CapabilityAreaId;
  onSelectArea: (id: CapabilityAreaId) => void;
  className?: string;
}

export function CapabilitiesCenterpiece({
  activeArea,
  onSelectArea,
  className,
}: CapabilitiesCenterpieceProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltGroupRef = useRef<SVGGElement>(null);
  const topSlabRef = useRef<SVGGElement>(null);
  const midSlabRef = useRef<SVGGElement>(null);
  const botSlabRef = useRef<SVGGElement>(null);
  const outerRingRef = useRef<SVGGElement>(null);
  const innerRingRef = useRef<SVGGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // 1. Simple, Restrained Entrance Transition (About -> Capabilities)
  // No flying slabs or infinite rotating loops — the centerpiece emerges calmly as a cohesive architectural composition.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, stageRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 2. React to Active Capability Card Selection (immediate, predictable feedback: 250ms)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const isFrontend = activeArea === 'frontend';
    const isMobile = activeArea === 'mobile';
    const isBackend = activeArea === 'backend';

    if (topSlabRef.current) {
      gsap.to(topSlabRef.current, {
        y: isFrontend ? -6 : 0,
        opacity: isFrontend ? 1 : 0.85,
        duration: 0.25,
        ease: 'power2.out',
      });
    }

    if (midSlabRef.current) {
      gsap.to(midSlabRef.current, {
        y: isMobile ? -5 : 0,
        opacity: isMobile ? 1 : 0.85,
        duration: 0.25,
        ease: 'power2.out',
      });
    }

    if (botSlabRef.current) {
      gsap.to(botSlabRef.current, {
        y: isBackend ? -5 : 0,
        opacity: isBackend ? 1 : 0.85,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  }, [activeArea, prefersReducedMotion]);

  // 3. Restrained Pointer Parallax Response on the 3D Stack (max ±8px, no rotation)
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !stageRef.current || !tiltGroupRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(tiltGroupRef.current, {
      x: normX * 8,
      y: normY * 6,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion || !tiltGroupRef.current) return;
    gsap.to(tiltGroupRef.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const isFrontend = activeArea === 'frontend';
  const isMobile = activeArea === 'mobile';
  const isBackend = activeArea === 'backend';

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative mx-auto w-full max-w-[660px] select-none',
        className
      )}
    >
      {/* Ambient volumetric dual-tone lighting behind the 3D stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className={cn(
            'absolute left-[18%] top-[16%] h-72 w-72 rounded-full blur-[115px] transition-opacity duration-500',
            isFrontend || isBackend ? 'bg-gold/25 opacity-100' : 'bg-gold/15 opacity-75'
          )}
        />
        <div
          className={cn(
            'absolute right-[10%] top-[22%] h-80 w-80 rounded-full blur-[125px] transition-opacity duration-500',
            isMobile ? 'bg-cyan/30 opacity-100' : 'bg-cyan/18 opacity-80'
          )}
        />
        <div className="absolute bottom-[8%] left-[25%] h-56 w-80 rounded-full bg-gold-highlight/15 blur-[100px]" />
      </div>

      {/* Main Interactive 3D Isometric SVG Centerpiece matching the Section 03 Reference */}
      <svg
        viewBox="0 0 720 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Interactive 3D technical architecture layers representing Frontend, Mobile, and Backend capabilities"
        className="h-auto w-full overflow-visible drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
      >
        <defs>
          {/* Metallic Gold Orbital Ring Gradient */}
          <linearGradient
            id="cap-orbit-gold"
            x1="70"
            y1="420"
            x2="650"
            y2="130"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFF0C4" />
            <stop offset="28%" stopColor="#E5BE78" />
            <stop offset="62%" stopColor="#C4A45A" stopOpacity="0.65" />
            <stop offset="88%" stopColor="#FFE19C" />
            <stop offset="100%" stopColor="#00D5E8" stopOpacity="0.7" />
          </linearGradient>

          {/* Dark Glass Isometric Slab Fill */}
          <linearGradient
            id="cap-slab-glass"
            x1="210"
            y1="100"
            x2="510"
            y2="260"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1B232B" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#0D1217" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#151D24" stopOpacity="0.78" />
          </linearGradient>

          {/* Slab Side Extrusion Gradient (Warm Gold to Cyan Rim) */}
          <linearGradient
            id="cap-slab-rim-gold"
            x1="200"
            y1="180"
            x2="520"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFE6A8" />
            <stop offset="35%" stopColor="#C4A45A" />
            <stop offset="68%" stopColor="#284854" />
            <stop offset="100%" stopColor="#FFE3A0" />
          </linearGradient>

          <linearGradient
            id="cap-slab-rim-cyan"
            x1="200"
            y1="280"
            x2="520"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E5BE78" />
            <stop offset="50%" stopColor="#00D5E8" />
            <stop offset="100%" stopColor="#FFE09E" />
          </linearGradient>

          {/* Neon Glow Filters */}
          <filter id="cap-cyan-neon" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="11" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cap-gold-neon" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="4.5" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =================================================================
            1. SWEEPING TILTED METALLIC GOLD ORBITAL RINGS (BACK & FOREGROUND)
           ================================================================= */}
        <g ref={outerRingRef}>
          {/* Outer faint atmospheric ellipse */}
          <ellipse
            cx="365"
            cy="278"
            rx="305"
            ry="136"
            transform="rotate(-24 365 278)"
            stroke="url(#cap-orbit-gold)"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="240 60 180 40"
          />

          {/* Main bright metallic golden orbital ring */}
          <ellipse
            cx="365"
            cy="292"
            rx="274"
            ry="114"
            transform="rotate(-23 365 292)"
            stroke="url(#cap-orbit-gold)"
            strokeWidth="3.2"
            filter="url(#cap-gold-neon)"
          />

          {/* Secondary intersecting inner golden orbital track */}
          <ellipse
            cx="362"
            cy="296"
            rx="258"
            ry="104"
            transform="rotate(-21 362 296)"
            stroke="#E5BE78"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Specular orbital light nodes along the golden track */}
          <circle
            cx="118"
            cy="336"
            r="4"
            fill="#FFF7DC"
            filter="url(#cap-gold-neon)"
          />
          <circle
            cx="592"
            cy="184"
            r="3.5"
            fill="#FFF7DC"
            filter="url(#cap-gold-neon)"
          />
          <circle
            cx="474"
            cy="358"
            r="3.5"
            fill="#FFF7DC"
            filter="url(#cap-gold-neon)"
          />
        </g>

        <g ref={innerRingRef}>
          {/* Upper counter-tilted thin golden technical halo */}
          <ellipse
            cx="385"
            cy="215"
            rx="240"
            ry="98"
            transform="rotate(-27 385 215)"
            stroke="#C4A45A"
            strokeWidth="1.1"
            strokeOpacity="0.45"
          />
        </g>

        {/* =================================================================
            2. THREE INTERACTIVE 3D ISOMETRIC GLASS ARCHITECTURE SLABS
           ================================================================= */}
        <g ref={tiltGroupRef}>
          {/* Vertical subtle energy beam connecting the 3 layers through their center axis */}
          <line
            x1="360"
            y1="150"
            x2="360"
            y2="400"
            stroke="url(#cap-slab-rim-cyan)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeDasharray="4 6"
          />

          {/* ---------------------------------------------------------------
              BOTTOM SLAB (LAYER 03: BACKEND & SYSTEMS — DATABASE CYLINDER)
             --------------------------------------------------------------- */}
          <g
            ref={botSlabRef}
            onClick={() => onSelectArea('backend')}
            className="cursor-pointer outline-none focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label="Select Layer 03: Backend and Systems"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArea('backend');
              }
            }}
          >
            {/* Ambient cyan/gold reflection under bottom slab */}
            <polygon
              points="360,315 510,382 360,452 210,382"
              fill={isBackend ? 'rgba(229,190,120,0.16)' : 'rgba(0,213,232,0.08)'}
            />

            {/* 3D Slab Thickness / Extruded Lower Rim */}
            <path
              d="M 205 372 L 360 442 L 515 372 L 515 384 L 360 456 L 205 384 Z"
              fill="#0E171E"
              stroke={isBackend ? '#E5BE78' : '#00D5E8'}
              strokeWidth={isBackend ? '1.8' : '1.1'}
              strokeOpacity={isBackend ? '0.95' : '0.55'}
            />

            {/* Top Isometric Glass Face */}
            <polygon
              points="360,304 515,372 360,442 205,372"
              fill="url(#cap-slab-glass)"
              stroke={isBackend ? '#FFE3A0' : '#3C5563'}
              strokeWidth={isBackend ? '2.2' : '1.3'}
            />

            {/* Glowing Neon Cyan 3D Database Stack Icon on Bottom Slab */}
            <g
              transform="translate(360, 372)"
              filter="url(#cap-cyan-neon)"
            >
              {/* Cylinder Top Ellipse */}
              <ellipse
                cx="0"
                cy="-18"
                rx="24"
                ry="9"
                fill="#041A22"
                stroke="#00E6FA"
                strokeWidth="2.4"
              />
              {/* Middle Tier */}
              <path
                d="M -24 -18 V -4 C -24 1 24 1 24 -4 V -18"
                fill="none"
                stroke="#00E6FA"
                strokeWidth="2.4"
              />
              {/* Bottom Tier */}
              <path
                d="M -24 -4 V 10 C -24 16 24 16 24 10 V -4"
                fill="none"
                stroke="#00E6FA"
                strokeWidth="2.4"
              />
              {/* Bottom Base Curve */}
              <path
                d="M -24 10 V 21 C -24 27 24 27 24 21 V 10"
                fill="none"
                stroke="#00E6FA"
                strokeWidth="2.4"
              />
            </g>
          </g>

          {/* ---------------------------------------------------------------
              MIDDLE SLAB (LAYER 02: MOBILE & RUNTIME — JS HEXAGON SHIELD)
             --------------------------------------------------------------- */}
          <g
            ref={midSlabRef}
            onClick={() => onSelectArea('mobile')}
            className="cursor-pointer outline-none focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label="Select Layer 02: Mobile Development"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArea('mobile');
              }
            }}
          >
            {/* 3D Slab Thickness / Extruded Lower Rim */}
            <path
              d="M 196 274 L 360 348 L 524 274 L 524 287 L 360 362 L 196 287 Z"
              fill="#121A21"
              stroke="url(#cap-slab-rim-cyan)"
              strokeWidth={isMobile ? '2.2' : '1.4'}
            />

            {/* Top Isometric Glass Face */}
            <polygon
              points="360,202 524,274 360,348 196,274"
              fill="url(#cap-slab-glass)"
              stroke={isMobile ? '#00D5E8' : 'url(#cap-slab-rim-gold)'}
              strokeWidth={isMobile ? '2.4' : '1.6'}
            />

            {/* Left & Right Corner Specular Gold Flares matching reference */}
            <circle
              cx="212"
              cy="281"
              r="3.5"
              fill="#FFF3CA"
              filter="url(#cap-gold-neon)"
            />
            <circle
              cx="508"
              cy="281"
              r="4"
              fill="#FFF3CA"
              filter="url(#cap-gold-neon)"
            />

            {/* Glowing Champagne-Gold JS Hexagon Emblem on Middle Slab */}
            <g
              transform="translate(360, 274)"
              filter="url(#cap-gold-neon)"
            >
              <polygon
                points="0,-28 26,-14 26,14 0,28 -26,14 -26,-14"
                fill="#16120B"
                stroke="#F5CA6E"
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fill="#FFD884"
                className="font-display text-[21px] font-bold tracking-tight"
              >
                JS
              </text>
            </g>
          </g>

          {/* ---------------------------------------------------------------
              TOP SLAB (LAYER 01: FRONTEND ENGINEERING — REACT ATOM)
             --------------------------------------------------------------- */}
          <g
            ref={topSlabRef}
            onClick={() => onSelectArea('frontend')}
            className="cursor-pointer outline-none focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label="Select Layer 01: Frontend Engineering"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArea('frontend');
              }
            }}
          >
            {/* 3D Slab Thickness / Extruded Lower Rim with warm gold corner highlights */}
            <path
              d="M 192 172 L 360 248 L 528 172 L 528 186 L 360 263 L 192 186 Z"
              fill="#171E24"
              stroke="url(#cap-slab-rim-gold)"
              strokeWidth={isFrontend ? '2.4' : '1.8'}
            />

            {/* Top Isometric Glass Face */}
            <polygon
              points="360,96 528,172 360,248 192,172"
              fill="url(#cap-slab-glass)"
              stroke={isFrontend ? '#FFE6A8' : 'url(#cap-slab-rim-gold)'}
              strokeWidth={isFrontend ? '2.5' : '1.8'}
            />

            {/* Bright Golden Edge Specular Flares on Left & Right Corners */}
            <ellipse
              cx="235"
              cy="194"
              rx="18"
              ry="4"
              transform="rotate(24 235 194)"
              fill="#FFF3C8"
              filter="url(#cap-gold-neon)"
            />
            <ellipse
              cx="485"
              cy="194"
              rx="18"
              ry="4"
              transform="rotate(-24 485 194)"
              fill="#FFF3C8"
              filter="url(#cap-gold-neon)"
            />

            {/* Glowing Electric-Cyan React Atom Emblem on Top Slab */}
            <g
              transform="translate(360, 170) scale(1, 0.72)"
              filter="url(#cap-cyan-neon)"
            >
              <circle cx="0" cy="0" r="8.5" fill="#00F0FF" />
              <ellipse
                cx="0"
                cy="0"
                rx="52"
                ry="19"
                stroke="#00E6FA"
                strokeWidth="3.4"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="52"
                ry="19"
                transform="rotate(60)"
                stroke="#00E6FA"
                strokeWidth="3.4"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="52"
                ry="19"
                transform="rotate(120)"
                stroke="#00E6FA"
                strokeWidth="3.4"
              />
            </g>
          </g>
        </g>

        {/* =================================================================
            3. FLOATING 3D OBSIDIAN FRAGMENTS AROUND THE ARCHITECTURE STACK
           ================================================================= */}
        {/* Upper-left obsidian cluster */}
        <g data-cap-shard transform="translate(115, 118)">
          <polygon
            points="22,4 46,16 38,44 10,40 4,18"
            fill="#0D1116"
            stroke="#C4A45A"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
          <polygon
            points="22,4 46,16 26,26 4,18"
            fill="#1B222A"
            opacity="0.85"
          />
        </g>

        {/* Mid-left smaller fragment */}
        <g data-cap-shard transform="translate(128, 224)">
          <polygon
            points="16,4 32,12 26,30 8,28 2,14"
            fill="#0F1419"
            stroke="#E5BE78"
            strokeWidth="1.1"
            strokeOpacity="0.6"
          />
        </g>

        {/* Far-right cyan-lit obsidian crystal */}
        <g data-cap-shard transform="translate(626, 134)">
          <polygon
            points="24,4 54,14 46,48 14,50 4,24"
            fill="#0B1319"
            stroke="#00D5E8"
            strokeWidth="1.35"
            strokeOpacity="0.75"
          />
          <polygon
            points="24,4 54,14 32,28 4,24"
            fill="#162834"
            opacity="0.85"
          />
        </g>

        {/* Bottom-right obsidian fragment */}
        <g data-cap-shard transform="translate(612, 336)">
          <polygon
            points="20,4 44,12 38,38 12,40 4,20"
            fill="#0E1217"
            stroke="#C4A45A"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
        </g>

        {/* Bottom-left obsidian fragment above card 02 */}
        <g data-cap-shard transform="translate(194, 434)">
          <polygon
            points="24,6 52,18 44,48 12,44 4,22"
            fill="#0C1014"
            stroke="#C4A45A"
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
        </g>
      </svg>
    </div>
  );
}
