import { useId } from 'react';
import { cn } from '@/lib/utils';

export interface MonogramProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional 0–100 progress value used by the Loader experience */
  fillProgress?: number;
  glow?: boolean;
}

const SIZE_MAP = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-24 h-24',
} as const;

export function Monogram({
  className,
  size = 'md',
  fillProgress = 100,
  glow = false,
}: MonogramProps) {
  const uniqueId = useId();
  const goldGradId = `as-gold-grad-${uniqueId}`;
  const clipId = `as-fill-clip-${uniqueId}`;
  const glowFilterId = `as-glow-${uniqueId}`;

  const clampedProgress = Math.max(0, Math.min(100, fillProgress));
  // Clip rect grows from bottom to top as progress moves 0 -> 100
  const clipY = 64 - (clampedProgress / 100) * 64;

  return (
    <svg
      viewBox="0 0 68 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        SIZE_MAP[size],
        'select-none transition-transform duration-300',
        glow && 'drop-shadow-[0_0_18px_rgba(229,190,120,0.65)]',
        className
      )}
      role="img"
      aria-label="AS Monogram — Ahmed Sa'ed"
    >
      <defs>
        <linearGradient id={goldGradId} x1="6" y1="6" x2="60" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5DC9C" />
          <stop offset="48%" stopColor="#E5BE78" />
          <stop offset="100%" stopColor="#A68238" />
        </linearGradient>

        <clipPath id={clipId}>
          <rect
            x="0"
            y={clipY}
            width="68"
            height="64"
            className="transition-all duration-150 ease-out"
          />
        </clipPath>

        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base subtle outline / dimmed architecture layer */}
      <g opacity={0.28} stroke="#C4A45A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Letter A */}
        <path d="M9 51L24.5 10L40 51" />
        <path d="M14.8 37.5H34.2" />
        {/* Interlocking Letter S */}
        <path d="M55.5 23.5C53.2 19 47.5 17.5 41.8 18.8C35.8 20.1 33.4 25.2 36.5 29.4C39.2 33 45.8 34.4 51.2 37C56.8 39.8 58.5 45.8 54.6 50.8C50.7 55.6 42.2 56.5 35.8 53.2C32.8 51.6 30.8 49.2 29.8 46.8" />
      </g>

      {/* Progressively filled Champagne Gold Monogram */}
      <g
        clipPath={`url(#${clipId})`}
        filter={glow ? `url(#${glowFilterId})` : undefined}
      >
        {/* Letter A */}
        <path
          d="M9 51L24.5 10L40 51"
          stroke={`url(#${goldGradId})`}
          strokeWidth="4.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.8 37.5H34.2"
          stroke={`url(#${goldGradId})`}
          strokeWidth="4.0"
          strokeLinecap="round"
        />
        {/* Interlocking Letter S */}
        <path
          d="M55.5 23.5C53.2 19 47.5 17.5 41.8 18.8C35.8 20.1 33.4 25.2 36.5 29.4C39.2 33 45.8 34.4 51.2 37C56.8 39.8 58.5 45.8 54.6 50.8C50.7 55.6 42.2 56.5 35.8 53.2C32.8 51.6 30.8 49.2 29.8 46.8"
          stroke={`url(#${goldGradId})`}
          strokeWidth="4.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

