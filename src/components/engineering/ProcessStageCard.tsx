'use client';

import { ArrowRight, CheckSquare, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProcessStage, ProcessStageId } from '@/types/common';

function StageBadgeIcon({
  id,
  isGold,
}: {
  id: ProcessStageId;
  isGold: boolean;
}) {
  const colorClass = isGold ? 'text-gold-highlight' : 'text-cyan';

  switch (id) {
    case 'understand':
      // Magnifying glass icon matching Stage 01 reference
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className={cn('h-6 w-6', colorClass)}
        >
          <circle
            cx="12.5"
            cy="12.5"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line
            x1="17.5"
            y1="17.5"
            x2="23"
            y2="23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'architect':
      // Stacked 3D isometric cubes icon matching Stage 02 reference
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className={cn('h-6 w-6', colorClass)}
        >
          {/* Top cube */}
          <polygon
            points="14,4 19.5,7 14,10 8.5,7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polyline
            points="8.5,7 8.5,13 14,16 19.5,13 19.5,7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="10"
            x2="14"
            y2="16"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Bottom-left cube */}
          <polyline
            points="8.5,13 3.5,15.8 3.5,21.5 9,24.2 14,21.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Bottom-right cube */}
          <polyline
            points="19.5,13 24.5,15.8 24.5,21.5 19,24.2 14,21.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'build':
      // Precision engineering gear icon matching Stage 03 reference
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className={cn('h-6 w-6', colorClass)}
        >
          <circle
            cx="14"
            cy="14"
            r="3.8"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M14 4.5V7M14 21V23.5M4.5 14H7M21 14H23.5M7.3 7.3L9.1 9.1M18.9 18.9L20.7 20.7M20.7 7.3L18.9 9.1M9.1 18.9L7.3 20.7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="14"
            cy="14"
            r="7.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="4 3.2"
          />
        </svg>
      );

    case 'validate':
      // Shield with checkmark icon matching Stage 04 reference
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className={cn('h-6 w-6', colorClass)}
        >
          <path
            d="M14 4.5L22 8V14.2C22 19.2 18.5 22.8 14 24.5C9.5 22.8 6 19.2 6 14.2V8L14 4.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <polyline
            points="10.5,14.2 13,16.8 17.8,11.8"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'deliver':
      // Rocket launch icon matching Stage 05 reference
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className={cn('h-6 w-6', colorClass)}
        >
          <path
            d="M14.8 18.2L9.8 13.2C12.2 8.2 17.5 5.2 22.5 5.5C22.8 10.5 19.8 15.8 14.8 18.2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="17.5" cy="10.5" r="1.6" fill="currentColor" />
          <path
            d="M9.8 13.2L6 14.2L7.8 17.5M14.8 18.2L13.8 22L10.5 20.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 19.5L5.5 22.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export interface ProcessStageCardProps {
  stage: ProcessStage;
  isExpanded: boolean;
  onSelect: (id: ProcessStageId) => void;
  onAdvanceNext: () => void;
}

export function ProcessStageCard({
  stage,
  isExpanded,
  onSelect,
  onAdvanceNext,
}: ProcessStageCardProps) {
  const isGold = stage.accent === 'gold';

  return (
    <article
      data-process-card
      className="relative pt-6 h-full flex flex-col"
    >
      {/* Floating Top-Center Circular Emblem Medallion overlapping top card edge */}
      <button
        type="button"
        onClick={() => onSelect(stage.id)}
        aria-label={`Select Stage ${stage.number}: ${stage.title}`}
        className={cn(
          'absolute top-0 left-1/2 -translate-x-1/2 z-30 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border bg-[#0B0E12] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight',
          isGold
            ? isExpanded
              ? 'border-gold-highlight shadow-[0_0_24px_rgba(229,190,120,0.65),inset_0_0_12px_rgba(229,190,120,0.3)] scale-110'
              : 'border-gold/65 shadow-[0_0_16px_rgba(196,164,90,0.35)] hover:border-gold-highlight hover:scale-105'
            : isExpanded
              ? 'border-cyan shadow-[0_0_24px_rgba(0,213,232,0.65),inset_0_0_12px_rgba(0,213,232,0.3)] scale-110'
              : 'border-cyan/65 shadow-[0_0_16px_rgba(0,213,232,0.35)] hover:border-cyan hover:scale-105'
        )}
      >
        <StageBadgeIcon id={stage.id} isGold={isGold} />
      </button>

      {/* Main Glass Card Body */}
      <div
        className={cn(
          'group relative flex flex-1 flex-col justify-between overflow-hidden rounded-[16px] border transition-all duration-500 backdrop-blur-xl',
          isExpanded
            ? isGold
              ? 'border-gold-highlight/90 bg-gradient-to-b from-[#1E1910]/95 via-[#111215]/95 to-[#16120B]/95 p-5 sm:p-6 shadow-[0_0_42px_-6px_rgba(229,190,120,0.5),inset_0_0_24px_-10px_rgba(229,190,120,0.35)]'
              : 'border-cyan/90 bg-gradient-to-b from-[#09212A]/95 via-[#0B141A]/95 to-[#071820]/95 p-5 sm:p-6 shadow-[0_0_42px_-6px_rgba(0,213,232,0.5),inset_0_0_24px_-10px_rgba(0,213,232,0.35)]'
            : isGold
              ? 'border-gold/45 bg-[#0C0E12]/88 p-5 hover:border-gold-highlight/75 hover:shadow-[0_0_28px_-8px_rgba(229,190,120,0.35)]'
              : 'border-cyan/45 bg-[#0A1116]/88 p-5 hover:border-cyan/75 hover:shadow-[0_0_28px_-8px_rgba(0,213,232,0.35)]'
        )}
      >
        {/* Top & Bottom Specular Rim Light Flares matching the reference cards */}
        {isGold ? (
          <>
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute left-4 -top-px h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FFF0C2] to-transparent transition-opacity duration-300',
                isExpanded ? 'opacity-100' : 'opacity-50'
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-x-6 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-gold-highlight to-transparent transition-opacity duration-300',
                isExpanded ? 'opacity-100' : 'opacity-65'
              )}
            />
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-x-8 -top-px h-[1.5px] bg-gradient-to-r from-transparent via-[#8AF7FF] to-transparent transition-opacity duration-300',
                isExpanded ? 'opacity-100' : 'opacity-55'
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-x-6 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent transition-opacity duration-300',
                isExpanded ? 'opacity-100' : 'opacity-75'
              )}
            />
          </>
        )}

        {/* Clickable Stage Header & Core Description */}
        <button
          type="button"
          onClick={() => onSelect(stage.id)}
          aria-expanded={isExpanded}
          aria-controls={`process-stage-details-${stage.id}`}
          className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-md"
        >
          {/* Stage Number ("01") + Horizontal Divider Line */}
          <div className="mb-3 pt-2">
            <span
              className={cn(
                'block font-display text-lg sm:text-xl font-medium tracking-[0.06em]',
                isGold ? 'text-gold-highlight' : 'text-gold-highlight/90'
              )}
            >
              {stage.number}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'mt-1.5 block h-[1px] w-full bg-gradient-to-r to-transparent',
                isGold
                  ? 'from-gold-highlight/60 via-gold/25'
                  : 'from-cyan/60 via-cyan/25'
              )}
            />
          </div>

          {/* Stage Title ("UNDERSTAND", "ARCHITECT", etc.) */}
          <h3
            className={cn(
              'font-serif text-base sm:text-[1.08rem] font-bold tracking-[0.06em] uppercase text-warmWhite',
              !isExpanded && 'lg:text-center'
            )}
          >
            {stage.title}
          </h3>

          {/* Stage Short Description */}
          <p
            className={cn(
              'mt-2.5 font-sans text-xs sm:text-[0.8125rem] leading-relaxed text-warmWhite/80',
              !isExpanded && 'lg:text-center'
            )}
          >
            {stage.description}
          </p>
        </button>

        {/* Expanded Content Drawer (Checklist + "Learn more ->" Action) */}
        <div
          id={`process-stage-details-${stage.id}`}
          role="region"
          aria-label={`Stage ${stage.number} ${stage.title} details`}
          className={cn(
            'grid transition-all duration-400 ease-out',
            isExpanded
              ? 'mt-4 grid-rows-[1fr] border-t border-white/[0.1] pt-4 opacity-100'
              : 'mt-0 grid-rows-[0fr] border-t-0 pt-0 opacity-0 pointer-events-none'
          )}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2">
              {stage.expandedDetails.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-2.5 font-sans text-xs leading-snug text-warmWhite/90"
                >
                  <CheckSquare
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 h-3.5 w-3.5 shrink-0',
                      isGold ? 'text-gold-highlight' : 'text-cyan'
                    )}
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onAdvanceNext}
                className={cn(
                  'group/btn inline-flex items-center gap-2 font-sans text-xs font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-sm',
                  isGold
                    ? 'text-warmWhite hover:text-gold-highlight'
                    : 'text-warmWhite hover:text-cyan'
                )}
              >
                <span className="underline decoration-gold/50 underline-offset-4 group-hover/btn:decoration-current">
                  Learn more
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-gold-highlight transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsed Footer Indicator: Circular `(+)` Button matching Stages 02-05 in the reference */}
        {!isExpanded && (
          <div className="mt-5 flex justify-center pt-1">
            <button
              type="button"
              onClick={() => onSelect(stage.id)}
              aria-label={`Expand Stage ${stage.number} ${stage.title}`}
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight',
                isGold
                  ? 'border-gold/60 bg-gold/10 text-gold-highlight group-hover:border-gold-highlight group-hover:shadow-[0_0_12px_rgba(229,190,120,0.6)]'
                  : 'border-cyan/60 bg-cyan/10 text-cyan group-hover:border-cyan group-hover:shadow-[0_0_12px_rgba(0,213,232,0.6)]'
              )}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
