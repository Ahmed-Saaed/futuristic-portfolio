'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectPaginationProps {
  totalItems: number;
  activeSlotIndex: number;
  totalPages: number;
  currentPage: number;
  onStepPrevious: () => void;
  onStepNext: () => void;
  onSelectSlot: (index: number) => void;
  exploreHref?: string;
  exploreLabel?: string;
  className?: string;
}

/**
 * Gallery navigation bar matching the Section 04 reference:
 * Left: `(<-)  01 —— 02 —— 03`
 * Right: `[ Explore More Projects -> ]  (->)`
 * The Explore More Projects button navigates directly to the dedicated `/work` archive page.
 */
export function ProjectPagination({
  totalItems,
  activeSlotIndex,
  onStepPrevious,
  onStepNext,
  onSelectSlot,
  exploreHref = '/work',
  exploreLabel = 'Explore More Projects',
  className,
}: ProjectPaginationProps) {
  const indicatorCount = Math.max(1, Math.min(totalItems, 6));
  const indices = Array.from({ length: indicatorCount }, (_, i) => i);

  return (
    <nav
      aria-label="Project gallery pagination and navigation"
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      {/* Left: Previous Circular Button + 01 — 02 — 03 Collection Indicators */}
      <div className="flex items-center gap-5 sm:gap-6">
        <button
          type="button"
          onClick={onStepPrevious}
          disabled={totalItems <= 1}
          aria-label="Previous project"
          className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/55 bg-[#0D1014]/85 text-warmWhite/90 shadow-[0_0_16px_-4px_rgba(196,164,90,0.4)] transition-all duration-300 hover:border-gold-highlight hover:text-gold-highlight hover:shadow-gold-glow disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </button>

        {/* Numbered sequence: 01 —— 02 —— 03 */}
        <div
          role="group"
          aria-label="Collection item indicators"
          className="flex items-center gap-3 sm:gap-4"
        >
          {indices.map((idx) => {
            const isActive = idx === activeSlotIndex;
            const formatted = String(idx + 1).padStart(2, '0');

            return (
              <div key={formatted} className="inline-flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onSelectSlot(idx)}
                  aria-label={`Focus project ${formatted}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'font-display text-xs sm:text-[0.8125rem] tracking-[0.14em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-sm px-1',
                    isActive
                      ? 'font-semibold text-gold-highlight'
                      : 'font-normal text-mutedGrey hover:text-warmWhite'
                  )}
                >
                  {formatted}
                </button>

                {/* Horizontal connector line after each number */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-[1.5px] rounded-full transition-all duration-300',
                    isActive
                      ? 'w-10 sm:w-14 bg-gradient-to-r from-gold-highlight via-gold to-gold/25 shadow-[0_0_10px_rgba(229,190,120,0.75)]'
                      : 'w-7 sm:w-10 bg-white/[0.12]'
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: "Explore More Projects ->" Pill Link to Dedicated /work Page + Next Circular Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3.5">
        <Link
          href={exploreHref}
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/65 bg-[#12110E]/90 px-5 sm:px-6 py-2.5 font-sans text-xs sm:text-[0.8125rem] font-medium text-gold-highlight shadow-[0_0_22px_-6px_rgba(229,190,120,0.45)] transition-all duration-300 hover:border-gold-highlight hover:bg-gold/15 hover:text-warmWhite hover:shadow-gold-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 -top-px h-[1.5px] bg-gradient-to-r from-transparent via-[#FFF0C2] to-transparent opacity-80"
          />
          <span>{exploreLabel}</span>
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>

        <button
          type="button"
          onClick={onStepNext}
          disabled={totalItems <= 1}
          aria-label="Next project"
          className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/55 bg-[#0D1014]/85 text-warmWhite/90 shadow-[0_0_16px_-4px_rgba(196,164,90,0.4)] transition-all duration-300 hover:border-gold-highlight hover:text-gold-highlight hover:shadow-gold-glow disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight"
        >
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </nav>
  );
}
