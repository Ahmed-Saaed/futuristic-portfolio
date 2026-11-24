'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { ProjectItem, ProjectMockupVariant } from '@/types/project';

function CategoryPillIcon({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-3.5 w-3.5 text-cyan shrink-0"
      >
        <rect
          x="4.5"
          y="1.5"
          width="7"
          height="13"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="8" cy="12.3" r="0.7" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5 text-gold-highlight shrink-0"
    >
      <rect
        x="1.8"
        y="2.5"
        width="12.4"
        height="8.5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <line
        x1="5.2"
        y1="13.5"
        x2="10.8"
        y2="13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="11"
        x2="8"
        y2="13.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/**
 * Designed placeholder device mockup artwork matching each of the 3 reference cards:
 * - 'web-collaborative': Tilted laptop + companion screen showing "Build Better Together"
 * - 'mobile-suite': 5 fanned smartphones showing "Your Journey Starts Here" & mobile charts
 * - 'web-analytics': Tilted widescreen dashboard display with world map, 3D globe & charts
 */
function ProjectVisualMockup({ variant }: { variant: ProjectMockupVariant }) {
  switch (variant) {
    case 'web-collaborative':
      return (
        <div className="relative h-full w-full flex items-center justify-center px-5 pt-9 pb-3">
          {/* Warm gold atmospheric backlight */}
          <div className="pointer-events-none absolute inset-x-10 top-8 bottom-4 rounded-full bg-gold/20 blur-2xl" />

          {/* Obsidian ridge silhouette behind devices */}
          <svg
            viewBox="0 0 360 80"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full"
          >
            <path
              d="M0 80L0 52L55 34L115 62L185 28L255 54L315 24L360 44L360 80Z"
              fill="#0A0D11"
              stroke="#C4A45A"
              strokeWidth="0.8"
              strokeOpacity="0.45"
            />
          </svg>

          {/* Main Tilted Laptop / Web Application Window */}
          <div className="relative z-10 w-[82%] -rotate-[3deg] rounded-lg border border-gold/45 bg-gradient-to-br from-[#191D23] via-[#0E1116] to-[#080A0D] p-3.5 shadow-[0_18px_36px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-[1.5deg]">
            {/* Browser chrome top bar */}
            <div className="mb-3 flex items-center justify-between border-b border-white/[0.07] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-highlight/80" />
                <span className="h-1.5 w-12 rounded-full bg-white/15" />
              </div>
              <div className="flex gap-1.5">
                <span className="h-1 w-4 rounded-full bg-white/15" />
                <span className="h-1 w-4 rounded-full bg-white/15" />
              </div>
            </div>

            {/* Hero Split Inside Screen Mockup */}
            <div className="relative overflow-hidden rounded bg-[#0B0D11] p-3">
              {/* Atmospheric mountain graphic inside mockup right */}
              <svg
                viewBox="0 0 140 90"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-0 h-full w-3/5 opacity-80"
              >
                <path
                  d="M20 90L72 22L108 64L126 42L140 90Z"
                  fill="#1A222C"
                />
                <path
                  d="M72 22L86 68L52 90L20 90Z"
                  fill="#293442"
                />
                <path
                  d="M72 22L108 64L126 42"
                  stroke="#E5BE78"
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                />
              </svg>

              <div className="relative z-10 max-w-[65%] space-y-1.5">
                <p className="font-display text-[0.8rem] font-semibold leading-tight text-warmWhite">
                  Build Better
                  <br />
                  Together
                </p>
                <p className="font-sans text-[0.55rem] text-mutedGrey">
                  Create, Collaborate, Innovate
                </p>
                <span className="mt-1.5 inline-block rounded-full bg-gradient-to-r from-gold-highlight to-gold px-2.5 py-0.5 font-display text-[0.5rem] font-semibold text-obsidian">
                  Get Started
                </span>
              </div>
            </div>
          </div>

          {/* Secondary overlapping mobile companion panel on right */}
          <div className="relative z-20 -ml-5 mt-6 w-[24%] rotate-[5deg] rounded-md border border-gold/40 bg-[#0D1015] p-2 shadow-2xl transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-[3deg]">
            <div className="mb-1.5 h-1 w-6 mx-auto rounded-full bg-white/20" />
            <div className="space-y-1.5">
              <div className="h-4 rounded bg-gold/15 border border-gold/25" />
              <div className="h-6 rounded bg-white/[0.04] p-1">
                <div className="h-1 w-8 rounded bg-gold/50 mb-1" />
                <div className="h-1 w-5 rounded bg-white/20" />
              </div>
              <div className="h-5 rounded bg-white/[0.04]" />
            </div>
          </div>
        </div>
      );

    case 'mobile-suite':
      return (
        <div className="relative h-full w-full flex items-end justify-center px-4 pt-9 pb-2">
          {/* Electric cyan atmospheric backlight */}
          <div className="pointer-events-none absolute inset-x-8 top-6 bottom-2 rounded-full bg-cyan/25 blur-2xl" />

          {/* Fanned 5-Smartphone Array matching Card 02 reference */}
          <div className="relative z-10 flex items-end justify-center w-full h-[148px]">
            {/* Far-left phone */}
            <div className="-mr-3 mb-1 h-[108px] w-[54px] -rotate-[12deg] rounded-[9px] border border-cyan/30 bg-[#081218] p-1.5 opacity-75 shadow-lg transition-transform duration-500 group-hover:-translate-x-1">
              <div className="space-y-1.5 pt-1">
                <div className="h-1.5 w-6 rounded bg-cyan/40" />
                <div className="h-2.5 rounded bg-white/[0.06]" />
                <div className="h-2.5 rounded bg-white/[0.06]" />
                <div className="h-2.5 rounded bg-white/[0.06]" />
              </div>
            </div>

            {/* Mid-left phone */}
            <div className="-mr-3 mb-2 h-[124px] w-[62px] -rotate-[6deg] rounded-[10px] border border-cyan/45 bg-[#0A161D] p-1.5 opacity-90 shadow-xl transition-transform duration-500 group-hover:-translate-x-0.5">
              <div className="space-y-1.5 pt-1">
                <div className="h-1.5 w-8 rounded bg-gold/50" />
                <div className="h-3 rounded bg-white/[0.07]" />
                <div className="h-3 rounded bg-cyan/15 border border-cyan/30" />
                <div className="h-3 rounded bg-white/[0.07]" />
                <div className="h-3 rounded bg-white/[0.07]" />
              </div>
            </div>

            {/* Center Featured Smartphone ("Your Journey Starts Here") */}
            <div className="relative z-20 h-[142px] w-[76px] rounded-[12px] border-[1.5px] border-cyan/85 bg-gradient-to-b from-[#0D222C] via-[#091319] to-[#060C10] p-2 shadow-[0_14px_32px_rgba(0,213,232,0.3)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
              <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-cyan/50" />
              {/* Glowing cyan portal sphere */}
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-cyan/40 to-gold/30 shadow-[0_0_14px_rgba(0,213,232,0.65)]">
                <div className="h-5 w-5 rounded-full border border-cyan/80 bg-obsidian/60" />
              </div>
              <p className="text-center font-display text-[0.5rem] font-semibold leading-tight text-warmWhite">
                Your Journey
                <br />
                Starts Here
              </p>
              <div className="mt-2.5 mx-auto w-11 rounded-full bg-gradient-to-r from-gold-highlight to-gold py-0.5 text-center font-display text-[0.42rem] font-bold text-obsidian">
                Get Started
              </div>
            </div>

            {/* Mid-right phone (Analytics & habit bar chart) */}
            <div className="-ml-3 mb-2 z-10 h-[124px] w-[62px] rotate-[6deg] rounded-[10px] border border-cyan/45 bg-[#0A161D] p-1.5 opacity-90 shadow-xl transition-transform duration-500 group-hover:translate-x-0.5">
              <div className="pt-1 space-y-1.5">
                <div className="h-1.5 w-7 rounded bg-cyan/50" />
                {/* Mini bar chart */}
                <div className="flex items-end justify-between gap-0.5 h-8 rounded bg-white/[0.04] p-1.5">
                  <span className="w-1 h-3 bg-cyan/60 rounded-t" />
                  <span className="w-1 h-5 bg-gold-highlight rounded-t" />
                  <span className="w-1 h-4 bg-cyan/80 rounded-t" />
                  <span className="w-1 h-6 bg-cyan rounded-t" />
                  <span className="w-1 h-3.5 bg-gold/70 rounded-t" />
                </div>
                <div className="h-3 rounded bg-white/[0.06]" />
                <div className="h-3 rounded bg-white/[0.06]" />
              </div>
            </div>

            {/* Far-right phone */}
            <div className="-ml-3 mb-1 h-[108px] w-[54px] rotate-[12deg] rounded-[9px] border border-cyan/30 bg-[#081218] p-1.5 opacity-75 shadow-lg transition-transform duration-500 group-hover:translate-x-1">
              <div className="space-y-1.5 pt-1">
                <div className="h-1.5 w-5 rounded bg-gold/40" />
                <div className="h-2.5 rounded bg-white/[0.06]" />
                <div className="h-2.5 rounded bg-white/[0.06]" />
                <div className="h-2.5 rounded bg-white/[0.06]" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'web-analytics':
      return (
        <div className="relative h-full w-full flex items-center justify-center px-5 pt-9 pb-3">
          {/* Dual gold & cyan atmospheric backlight */}
          <div className="pointer-events-none absolute left-10 top-8 h-28 w-36 rounded-full bg-gold/20 blur-2xl" />
          <div className="pointer-events-none absolute right-8 bottom-4 h-28 w-36 rounded-full bg-cyan/25 blur-2xl" />

          {/* Tilted Widescreen Analytics Dashboard Screen matching Card 03 reference */}
          <div className="relative z-10 w-[88%] rotate-[2.5deg] rounded-lg border border-gold/45 bg-gradient-to-br from-[#161B22] via-[#0B0F14] to-[#070B0E] p-3 shadow-[0_18px_36px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-[1deg]">
            {/* Top dashboard header */}
            <div className="mb-2.5 flex items-center justify-between border-b border-white/[0.07] pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gold-highlight" />
                <span className="font-display text-[0.55rem] font-semibold tracking-wider text-warmWhite">
                  Dashboard
                </span>
              </div>
              <div className="flex gap-1">
                <span className="h-1.5 w-6 rounded bg-white/10" />
                <span className="h-1.5 w-4 rounded bg-cyan/40" />
              </div>
            </div>

            {/* Dashboard Grid: Left sidebar + Center map/charts + Right 3D Globe */}
            <div className="grid grid-cols-12 gap-2 items-center">
              {/* Left metrics column */}
              <div className="col-span-3 space-y-1.5">
                <div className="rounded bg-white/[0.04] p-1 border border-white/[0.05]">
                  <div className="h-1 w-5 rounded bg-gold-highlight/80 mb-1" />
                  <div className="h-1.5 w-8 rounded bg-white/25" />
                </div>
                <div className="rounded bg-white/[0.04] p-1 border border-white/[0.05]">
                  <div className="h-1 w-6 rounded bg-cyan/80 mb-1" />
                  <div className="h-1.5 w-7 rounded bg-white/25" />
                </div>
                <div className="rounded bg-white/[0.04] p-1 border border-white/[0.05]">
                  <div className="h-1 w-4 rounded bg-gold/70 mb-1" />
                  <div className="h-1.5 w-8 rounded bg-white/25" />
                </div>
              </div>

              {/* Center World Map & Area Chart */}
              <div className="col-span-5 space-y-1.5">
                {/* Abstract dotted world map */}
                <div className="flex h-11 items-center justify-center rounded bg-[#0E141B] p-1 border border-white/[0.04]">
                  <svg viewBox="0 0 100 45" className="h-full w-full opacity-75">
                    <path
                      d="M12,15 Q20,8 28,16 T42,20 M52,12 Q64,8 74,16 T88,14 M22,28 Q30,34 38,28 M60,26 Q70,32 82,25"
                      stroke="#92949B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="1 4"
                      fill="none"
                    />
                    <circle cx="26" cy="16" r="2" fill="#E5BE78" />
                    <circle cx="68" cy="15" r="2" fill="#00D5E8" />
                  </svg>
                </div>

                {/* Area chart */}
                <div className="h-9 rounded bg-[#0E141B] p-1 border border-white/[0.04] flex items-end">
                  <svg viewBox="0 0 100 30" className="h-full w-full overflow-visible">
                    <path
                      d="M0,28 L15,20 L32,23 L50,12 L68,16 L85,6 L100,10 L100,30 L0,30 Z"
                      fill="rgba(0, 213, 232, 0.2)"
                    />
                    <polyline
                      points="0,28 15,20 32,23 50,12 68,16 85,6 100,10"
                      fill="none"
                      stroke="#00D5E8"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
              </div>

              {/* Right Glowing Wireframe Globe */}
              <div className="col-span-4 flex flex-col items-center justify-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan/50 bg-gradient-to-tr from-[#071B24] via-[#102632] to-[#1E3A46] shadow-[0_0_20px_rgba(0,213,232,0.45)]">
                  <svg viewBox="0 0 50 50" className="h-14 w-14">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="#00D5E8"
                      strokeWidth="0.9"
                      strokeOpacity="0.6"
                      fill="none"
                    />
                    <ellipse
                      cx="25"
                      cy="25"
                      rx="11"
                      ry="20"
                      stroke="#E5BE78"
                      strokeWidth="0.8"
                      strokeOpacity="0.65"
                      fill="none"
                    />
                    <ellipse
                      cx="25"
                      cy="25"
                      rx="20"
                      ry="9"
                      stroke="#00D5E8"
                      strokeWidth="0.8"
                      strokeOpacity="0.65"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export interface ProjectCardProps {
  project: ProjectItem;
  onOpenPreview: (project: ProjectItem) => void;
}

/**
 * Reusable Equal-Hierarchy Project Card Component.
 * Every project card shares identical dimensions, image proportions,
 * typography hierarchy, technology badges, and action placement.
 */
export function ProjectCard({ project, onOpenPreview }: ProjectCardProps) {
  const isCyan = project.accent === 'cyan';
  const isMobile = project.category === 'react-native';

  return (
    <article
      data-project-card
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-[18px] border transition-all duration-500 backdrop-blur-xl hover:-translate-y-1.5',
        isCyan
          ? 'border-cyan/65 bg-gradient-to-b from-[#0A1E26]/90 via-[#091318]/95 to-[#071116]/95 shadow-[0_0_34px_-8px_rgba(0,213,232,0.42),inset_0_0_22px_-12px_rgba(0,213,232,0.3)] hover:border-cyan hover:shadow-[0_0_44px_-6px_rgba(0,213,232,0.6)]'
          : 'border-gold/55 bg-gradient-to-b from-[#171510]/90 via-[#0E1014]/95 to-[#0A0C0F]/95 shadow-[0_0_34px_-8px_rgba(196,164,90,0.35),inset_0_0_22px_-12px_rgba(229,190,120,0.25)] hover:border-gold-highlight hover:shadow-[0_0_44px_-6px_rgba(229,190,120,0.52)]'
      )}
    >
      {/* Top & Bottom Corner Specular Rim Flares matching the reference */}
      {isCyan ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-8 -top-px h-[2px] w-36 bg-gradient-to-r from-transparent via-[#8AF7FF] to-transparent opacity-90"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-8 -bottom-px h-[2px] w-44 bg-gradient-to-r from-transparent via-[#00D5E8] to-transparent opacity-95"
          />
        </>
      ) : (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-8 -top-px h-[1.5px] w-32 bg-gradient-to-r from-transparent via-gold-highlight to-transparent opacity-85"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-[#FFF0C2] to-transparent opacity-85"
          />
        </>
      )}

      {/* ===================================================================
          1. FIXED-RATIO VISUAL MOCKUP HEADER WITH CATEGORY PILL & QUICK PREVIEW
         =================================================================== */}
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden border-b border-white/[0.08] bg-[#07090C]/90">
        {/* Top Bar Overlay: Category Pill (Left) & Quick Preview Action (Right) */}
        <div className="absolute inset-x-4 top-3.5 z-30 flex items-center justify-between gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-sans text-[0.72rem] font-medium backdrop-blur-md',
              isCyan
                ? 'border-cyan/45 bg-[#071D24]/85 text-cyan'
                : 'border-gold/45 bg-[#19150E]/85 text-gold-highlight'
            )}
          >
            <CategoryPillIcon isMobile={isMobile} />
            <span>{project.categoryLabel}</span>
          </span>

          <button
            type="button"
            onClick={() => onOpenPreview(project)}
            aria-label={`Open quick preview for ${project.title} (${project.categoryLabel})`}
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-obsidian/70 backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight',
              isCyan
                ? 'border-white/15 text-warmWhite/80 hover:border-cyan hover:text-cyan'
                : 'border-white/15 text-warmWhite/80 hover:border-gold-highlight hover:text-gold-highlight'
            )}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Clickable Mockup Canvas */}
        <button
          type="button"
          onClick={() => onOpenPreview(project)}
          aria-label={`Preview ${project.title}`}
          className="block h-full w-full text-left focus-visible:outline-none"
        >
          <ProjectVisualMockup variant={project.mockupVariant} />
        </button>

        {/* Horizontal luminous divider line under mockup */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent to-transparent',
            isCyan ? 'via-cyan/70' : 'via-gold-highlight/70'
          )}
        />
      </div>

      {/* ===================================================================
          2. CARD BODY: TITLE, DESCRIPTION, TECHNOLOGY PILLS & CASE STUDY CTA
         =================================================================== */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Project Title */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl sm:text-[1.35rem] font-semibold tracking-[-0.01em] text-warmWhite transition-colors duration-300 group-hover:text-gold-highlight">
              {project.title}
            </h3>
          </div>

          {/* Short Description */}
          <p className="mt-2.5 line-clamp-2 font-sans text-sm leading-relaxed text-mutedGrey">
            {project.description}
          </p>

          {/* Technology Badges */}
          <ul
            aria-label={`${project.title} technologies`}
            className="mt-5 flex flex-wrap items-center gap-2"
          >
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge
                  variant={
                    isCyan ? 'tech-pill-cyan' : 'tech-pill'
                  }
                >
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions: View Case Study Link + Optional Live/Repo Links */}
        <div className="mt-6 flex items-center justify-between gap-4 pt-2">
          <Link
            href={project.caseStudyUrl}
            className={cn(
              'group/link inline-flex items-center gap-2 font-sans text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-sm',
              isCyan
                ? 'text-cyan hover:text-[#84F7FF]'
                : 'text-gold-highlight hover:text-[#FFE3A0]'
            )}
          >
            <span className="underline decoration-current/40 underline-offset-4 group-hover/link:decoration-current">
              View Case Study
            </span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>

          <button
            type="button"
            onClick={() => onOpenPreview(project)}
            className="font-sans text-xs text-mutedGrey hover:text-warmWhite transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
          >
            Quick Preview
          </button>
        </div>
      </div>
    </article>
  );
}
