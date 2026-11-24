'use client';

import { ArrowRight } from 'lucide-react';
import { ProcessStageCard } from '@/components/engineering/ProcessStageCard';
import { cn } from '@/lib/utils';
import type { ProcessStage, ProcessStageId } from '@/types/common';

export interface ProcessTimelineProps {
  stages: ProcessStage[];
  activeStageId: ProcessStageId;
  onSelectStage: (id: ProcessStageId) => void;
  className?: string;
}

/**
 * Renders the 5 connected engineering stages in a responsive horizontal timeline
 * on desktop (with connecting gold `->` arrows and the lower sweeping orbital arc
 * with its center diamond node) and a clean vertical expandable timeline on mobile/tablet.
 */
export function ProcessTimeline({
  stages,
  activeStageId,
  onSelectStage,
  className,
}: ProcessTimelineProps) {
  const activeIndex = Math.max(
    0,
    stages.findIndex((s) => s.id === activeStageId)
  );

  const handleAdvanceNext = () => {
    const nextIndex = (activeIndex + 1) % stages.length;
    const nextStage = stages[nextIndex];
    if (nextStage) {
      onSelectStage(nextStage.id);
    }
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* ===================================================================
          1. DESKTOP HORIZONTAL CONNECTED TIMELINE (5 EXPANDABLE STAGES)
         =================================================================== */}
      <div
        role="list"
        aria-label="Five engineering process stages"
        className="relative z-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-4 xl:gap-5"
      >
        {stages.map((stage, index) => {
          const isExpanded = stage.id === activeStageId;
          const isPassedOrActive = index <= activeIndex;

          return (
            <div
              key={stage.id}
              role="listitem"
              className={cn(
                'relative flex items-center transition-all duration-500',
                // Expanded card takes 4 columns on desktop (12-col grid: 4 + 2 + 2 + 2 + 2 = 12)
                isExpanded
                  ? 'md:col-span-2 lg:col-span-4'
                  : 'md:col-span-1 lg:col-span-2'
              )}
            >
              <div className="w-full">
                <ProcessStageCard
                  stage={stage}
                  isExpanded={isExpanded}
                  onSelect={onSelectStage}
                  onAdvanceNext={handleAdvanceNext}
                />
              </div>

              {/* Desktop Horizontal Connector Arrow (`-->`) between cards */}
              {index < stages.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none hidden lg:flex items-center justify-center -mr-3.5 xl:-mr-4 ml-1 z-30 shrink-0"
                >
                  <div className="flex items-center">
                    <span
                      className={cn(
                        'h-[1.5px] w-2.5 xl:w-3.5 transition-colors duration-300',
                        isPassedOrActive
                          ? 'bg-gold-highlight shadow-[0_0_8px_rgba(229,190,120,0.85)]'
                          : 'bg-gold/40'
                      )}
                    />
                    <ArrowRight
                      className={cn(
                        '-ml-1.5 h-4 w-4 transition-colors duration-300',
                        isPassedOrActive
                          ? 'text-gold-highlight drop-shadow-[0_0_6px_rgba(229,190,120,0.8)]'
                          : 'text-gold/50'
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===================================================================
          2. LOWER SWEEPING ORBITAL PROGRESSION ARC WITH CENTER DIAMOND EMBLEM
         =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto -mt-2 hidden lg:block h-16 w-[92%]"
      >
        <svg
          viewBox="0 0 1200 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id="process-bottom-arc"
              x1="60"
              y1="10"
              x2="1140"
              y2="10"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E5BE78" stopOpacity="0.1" />
              <stop offset="22%" stopColor="#E5BE78" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFF2C6" stopOpacity="0.95" />
              <stop offset="78%" stopColor="#00D5E8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00D5E8" stopOpacity="0.1" />
            </linearGradient>

            <filter
              id="process-arc-glow"
              x="-20%"
              y="-40%"
              width="140%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sweeping golden-to-cyan elliptical progression curve */}
          <path
            d="M 80 8 Q 600 76 1120 8"
            stroke="url(#process-bottom-arc)"
            strokeWidth="1.6"
            filter="url(#process-arc-glow)"
          />

          {/* Glowing cyan & gold nodes along the curve corresponding to active progression */}
          <circle
            cx="360"
            cy="34"
            r="2.5"
            fill="#FFE6A3"
            filter="url(#process-arc-glow)"
          />
          <circle
            cx="820"
            cy="35"
            r="3"
            fill="#00E6FA"
            filter="url(#process-arc-glow)"
          />
          <circle
            cx="1030"
            cy="18"
            r="2.5"
            fill="#FFE6A3"
            filter="url(#process-arc-glow)"
          />

          {/* Center Ornamental Diamond Node at the apex of the lower arc (600, 42) matching reference */}
          <g transform="translate(600, 42)" filter="url(#process-arc-glow)">
            <polygon
              points="0,-13 13,0 0,13 -13,0"
              fill="#08090B"
              stroke="#E5BE78"
              strokeWidth="1.6"
            />
            {/* 4-point inner star inside diamond */}
            <path
              d="M 0,-6 Q 1.2,-1.2 6,0 Q 1.2,1.2 0,6 Q -1.2,1.2 -6,0 Q -1.2,-1.2 0,-6 Z"
              fill="#FFF2C6"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
