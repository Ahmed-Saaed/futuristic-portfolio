'use client';

import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { CapabilityArea, CapabilityAreaId } from '@/types/common';

function CapabilityIcon({
  id,
  isSelected,
}: {
  id: CapabilityAreaId;
  isSelected: boolean;
}) {
  switch (id) {
    case 'frontend':
      // Custom desktop monitor outline icon in champagne gold matching Card 01 reference
      return (
        <svg
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            'h-10 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105',
            isSelected ? 'text-gold-highlight' : 'text-gold'
          )}
          aria-hidden="true"
        >
          <rect
            x="5"
            y="6"
            width="34"
            height="22"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line
            x1="5"
            y1="23"
            x2="39"
            y2="23"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M18 28L16 34H28L26 28"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="13"
            y1="34"
            x2="31"
            y2="34"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'mobile':
      // Custom smartphone outline icon in electric cyan matching Card 02 reference
      return (
        <svg
          viewBox="0 0 40 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            'h-11 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105',
            isSelected
              ? 'text-cyan drop-shadow-[0_0_10px_rgba(0,213,232,0.55)]'
              : 'text-cyan/85'
          )}
          aria-hidden="true"
        >
          <rect
            x="10"
            y="4"
            width="20"
            height="35"
            rx="3.2"
            stroke="currentColor"
            strokeWidth="1.85"
          />
          <line
            x1="17.5"
            y1="8"
            x2="22.5"
            y2="8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="20" cy="34.5" r="1.3" fill="currentColor" />
        </svg>
      );

    case 'backend':
      // Custom 3-tier server rack stack icon in champagne gold matching Card 03 reference
      return (
        <svg
          viewBox="0 0 44 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            'h-10 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105',
            isSelected ? 'text-gold-highlight' : 'text-gold'
          )}
          aria-hidden="true"
        >
          {/* Tier 1 */}
          <rect
            x="6"
            y="6"
            width="32"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="11" cy="10" r="1.2" fill="currentColor" />
          <circle cx="15" cy="10" r="1.2" fill="currentColor" />
          <line
            x1="28"
            y1="10"
            x2="33"
            y2="10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Tier 2 */}
          <rect
            x="6"
            y="17"
            width="32"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="11" cy="21" r="1.2" fill="currentColor" />
          <circle cx="15" cy="21" r="1.2" fill="currentColor" />
          <line
            x1="28"
            y1="21"
            x2="33"
            y2="21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Tier 3 */}
          <rect
            x="6"
            y="28"
            width="32"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="11" cy="32" r="1.2" fill="currentColor" />
          <circle cx="15" cy="32" r="1.2" fill="currentColor" />
          <line
            x1="28"
            y1="32"
            x2="33"
            y2="32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export interface CapabilityCardProps {
  area: CapabilityArea;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (id: CapabilityAreaId) => void;
}

export function CapabilityCard({
  area,
  isSelected,
  isExpanded,
  onSelect,
}: CapabilityCardProps) {
  const isCyan = area.accent === 'cyan';

  return (
    <article
      data-capability-card
      onMouseEnter={() => onSelect(area.id)}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-[16px] border p-6 sm:p-7 transition-all duration-300 backdrop-blur-xl',
        isCyan
          ? isSelected
            ? 'border-cyan/80 bg-gradient-to-b from-[#091E26]/90 via-[#0A141A]/95 to-[#081318]/95 shadow-[0_0_36px_-6px_rgba(0,213,232,0.45),inset_0_0_22px_-10px_rgba(0,213,232,0.35)]'
            : 'border-cyan/35 bg-[#0C1216]/85 hover:border-cyan/65 hover:shadow-[0_0_28px_-8px_rgba(0,213,232,0.3)]'
          : isSelected
            ? 'border-gold-highlight/80 bg-gradient-to-b from-[#1A1710]/90 via-[#111316]/95 to-[#0D0F12]/95 shadow-[0_0_36px_-6px_rgba(229,190,120,0.4),inset_0_0_22px_-10px_rgba(229,190,120,0.28)]'
            : 'border-gold/30 bg-[#0E1013]/85 hover:border-gold/65 hover:shadow-[0_0_28px_-8px_rgba(196,164,90,0.28)]'
      )}
    >
      {/* Top & Bottom Specular Rim Light Flares matching the reference cards */}
      {isCyan ? (
        <>
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-x-10 -top-px h-[2px] bg-gradient-to-r from-transparent via-[#7AF6FF] to-transparent transition-opacity duration-300',
              isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute right-6 -bottom-px h-[2px] w-36 bg-gradient-to-r from-transparent via-[#00D5E8] to-transparent transition-opacity duration-300',
              isSelected ? 'opacity-100' : 'opacity-35 group-hover:opacity-75'
            )}
          />
        </>
      ) : (
        <>
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-x-12 -top-px h-[1.5px] bg-gradient-to-r from-transparent via-gold-highlight to-transparent transition-opacity duration-300',
              isSelected ? 'opacity-95' : 'opacity-35 group-hover:opacity-75'
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute right-8 -bottom-px h-[2px] w-32 bg-gradient-to-r from-transparent via-[#FFF0C2] to-transparent transition-opacity duration-300',
              isSelected ? 'opacity-95' : 'opacity-45 group-hover:opacity-80'
            )}
          />
          {/* Subtle top-rightchamfered golden corner glint on Card 03 */}
          {area.id === 'backend' && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 h-10 w-10 rotate-45 bg-gradient-to-b from-gold-highlight/55 to-transparent blur-[1px]"
            />
          )}
        </>
      )}

      {/* Main Clickable Card Header & Summary */}
      <div>
        <button
          type="button"
          onClick={() => onSelect(area.id)}
          aria-expanded={isExpanded}
          aria-controls={`capability-details-${area.id}`}
          className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-lg"
        >
          {/* Number Row ("01 ———") + Outline Device/Server Icon */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="inline-flex items-center gap-3 pt-1">
              <span
                className={cn(
                  'font-display text-base sm:text-[1.0625rem] font-semibold tracking-[0.08em]',
                  isCyan ? 'text-cyan' : 'text-gold-highlight'
                )}
              >
                {area.number}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'h-[1px] w-8 transition-all duration-300 group-hover:w-12',
                  isCyan ? 'bg-cyan/50' : 'bg-gold/50'
                )}
              />
            </div>

            <CapabilityIcon id={area.id} isSelected={isSelected} />
          </div>

          {/* Capability Title */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl sm:text-[1.35rem] font-semibold tracking-[-0.01em] text-warmWhite transition-colors duration-300 group-hover:text-gold-highlight">
              {area.title}
            </h3>

            <ChevronDown
              aria-hidden="true"
              className={cn(
                'h-4 w-4 shrink-0 text-mutedGrey transition-transform duration-300',
                isExpanded && 'rotate-180 text-gold-highlight'
              )}
            />
          </div>

          {/* Short Description */}
          <p className="mt-2.5 font-sans text-sm leading-relaxed text-mutedGrey">
            {area.shortDescription}
          </p>
        </button>

        {/* Primary Technology Pills Row (Matches reference tags) */}
        <ul
          aria-label={`${area.title} primary technologies`}
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {area.primaryTags.map((tag) => (
            <li key={tag} data-capability-tag>
              <Badge
                variant={
                  isSelected
                    ? isCyan
                      ? 'tech-pill-cyan'
                      : 'tech-pill-gold'
                    : 'tech-pill'
                }
              >
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Details Drawer (Full Toolkit & Engineering Focus Areas) */}
      <div
        id={`capability-details-${area.id}`}
        role="region"
        aria-label={`${area.title} expanded details`}
        className={cn(
          'grid transition-all duration-300 ease-out',
          isExpanded
            ? 'mt-5 grid-rows-[1fr] border-t border-white/[0.08] pt-4 opacity-100'
            : 'mt-0 grid-rows-[0fr] border-t-0 pt-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="overflow-hidden space-y-3.5">
          <p className="font-display text-[0.68rem] font-medium tracking-[0.2em] uppercase text-gold-highlight/90">
            {area.centerpieceLayerLabel}
          </p>

          <p className="font-sans text-xs sm:text-[0.8125rem] leading-relaxed text-warmWhite/85">
            {area.expandedSummary}
          </p>

          {/* Complete Approved Technology Set for this Capability */}
          <div>
            <span className="block mb-2 font-display text-[0.68rem] uppercase tracking-[0.16em] text-mutedGrey">
              Complete Toolkit
            </span>
            <div className="flex flex-wrap gap-1.5">
              {area.allTechnologies.map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    'inline-flex items-center rounded-md border px-2.5 py-0.5 font-sans text-[0.72rem]',
                    isCyan
                      ? 'border-cyan/25 bg-cyan/[0.06] text-warmWhite/90'
                      : 'border-gold/25 bg-gold/[0.06] text-warmWhite/90'
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <ul className="space-y-1.5 pt-1">
            {area.focusAreas.map((focus) => (
              <li
                key={focus}
                className="flex items-start gap-2 font-sans text-xs text-mutedGrey"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1.5 h-1 w-1 shrink-0 rounded-full',
                    isCyan ? 'bg-cyan' : 'bg-gold-highlight'
                  )}
                />
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
