'use client';

import { cn } from '@/lib/utils';
import type {
  ProjectFilterCategory,
  ProjectFilterOption,
} from '@/types/project';

function FilterIcon({
  id,
  isActive,
}: {
  id: ProjectFilterCategory;
  isActive: boolean;
}) {
  switch (id) {
    case 'all':
      // 4-square grid icon matching "All Projects" in reference
      return (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={cn(
            'h-4 w-4 shrink-0 transition-colors duration-300',
            isActive ? 'text-gold-highlight' : 'text-gold/80'
          )}
        >
          <rect
            x="2.5"
            y="2.5"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="11.5"
            y="2.5"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="2.5"
            y="11.5"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="11.5"
            y="11.5"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'react-native':
      // Smartphone icon in electric cyan matching "React Native" in reference
      return (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={cn(
            'h-4 w-4 shrink-0 transition-colors duration-300',
            isActive
              ? 'text-cyan drop-shadow-[0_0_8px_rgba(0,213,232,0.7)]'
              : 'text-cyan/85'
          )}
        >
          <rect
            x="5.5"
            y="2"
            width="9"
            height="16"
            rx="1.8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="8.5"
            y1="4.2"
            x2="11.5"
            y2="4.2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="15.5" r="0.8" fill="currentColor" />
        </svg>
      );

    case 'web':
      // Desktop monitor icon matching "Web Development" in reference
      return (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={cn(
            'h-4 w-4 shrink-0 transition-colors duration-300',
            isActive ? 'text-gold-highlight' : 'text-warmWhite/75'
          )}
        >
          <rect
            x="2.5"
            y="3"
            width="15"
            height="10.5"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="7"
            y1="17"
            x2="13"
            y2="17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="13.5"
            x2="10"
            y2="17"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}

export interface ProjectFiltersProps {
  options: ProjectFilterOption[];
  activeFilter: ProjectFilterCategory;
  onSelectFilter: (category: ProjectFilterCategory) => void;
  totalCountByFilter: Record<ProjectFilterCategory, number>;
  className?: string;
}

export function ProjectFilters({
  options,
  activeFilter,
  onSelectFilter,
  totalCountByFilter,
  className,
}: ProjectFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className={cn(
        'inline-flex flex-wrap items-center gap-2 sm:gap-0 rounded-full border border-white/[0.08] bg-[#0D1014]/90 p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.65)] backdrop-blur-xl',
        className
      )}
    >
      {options.map((option, index) => {
        const isActive = activeFilter === option.id;
        const isCyan = option.accent === 'cyan';
        const count = totalCountByFilter[option.id] ?? 0;

        return (
          <div key={option.id} className="inline-flex items-center">
            {/* Subtle vertical divider between filter pills matching the reference */}
            {index > 0 && (
              <span
                aria-hidden="true"
                className="mx-1.5 hidden sm:inline-block h-5 w-[1px] bg-white/[0.1]"
              />
            )}

            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="project-gallery-grid"
              onClick={() => onSelectFilter(option.id)}
              className={cn(
                'group relative inline-flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2.5 font-sans text-xs sm:text-[0.8125rem] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight',
                isActive
                  ? isCyan
                    ? 'border border-cyan/75 bg-gradient-to-r from-[#07222B] via-[#0B2B36] to-[#071D26] text-warmWhite font-medium shadow-[0_0_24px_-4px_rgba(0,213,232,0.55),inset_0_0_12px_-4px_rgba(0,213,232,0.35)]'
                    : 'border border-gold-highlight/80 bg-gradient-to-r from-[#261E11] via-[#1C160D] to-[#261E11] text-warmWhite font-medium shadow-[0_0_24px_-4px_rgba(229,190,120,0.55),inset_0_0_12px_-4px_rgba(229,190,120,0.35)]'
                  : 'border border-transparent text-warmWhite/75 hover:text-warmWhite hover:bg-white/[0.04]'
              )}
            >
              {/* Top & bottom specular rim flare on the active filter pill */}
              {isActive && (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute inset-x-4 -top-px h-[1.5px] bg-gradient-to-r from-transparent to-transparent',
                      isCyan ? 'via-[#84F7FF]' : 'via-[#FFF1C2]'
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute inset-x-5 -bottom-px h-[1.5px] bg-gradient-to-r from-transparent to-transparent',
                      isCyan ? 'via-cyan' : 'via-gold-highlight'
                    )}
                  />
                </>
              )}

              <FilterIcon id={option.id} isActive={isActive} />
              <span>{option.label}</span>
              <span className="sr-only">({count} projects)</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
