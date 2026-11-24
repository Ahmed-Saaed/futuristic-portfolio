import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'cyan' | 'neutral' | 'tech-pill' | 'tech-pill-cyan' | 'tech-pill-gold';
  className?: string;
}

const BADGE_VARIANTS = {
  gold: 'border-gold/40 bg-gold/10 text-gold-highlight uppercase tracking-wider',
  cyan: 'border-cyan/40 bg-cyan/10 text-cyan uppercase tracking-wider',
  neutral: 'border-borderDark bg-graphite/80 text-mutedGrey uppercase tracking-wider',
  'tech-pill':
    'border-white/[0.11] bg-[#14181D]/90 text-warmWhite/90 tracking-normal font-normal shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
  'tech-pill-cyan':
    'border-cyan/35 bg-[#0A1E24]/90 text-warmWhite/95 tracking-normal font-normal shadow-[inset_0_1px_0_rgba(0,213,232,0.18)]',
  'tech-pill-gold':
    'border-gold/35 bg-[#1B1812]/90 text-warmWhite/95 tracking-normal font-normal shadow-[inset_0_1px_0_rgba(229,190,120,0.18)]',
} as const;

export function Badge({
  children,
  variant = 'neutral',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium transition-colors duration-300',
        BADGE_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

