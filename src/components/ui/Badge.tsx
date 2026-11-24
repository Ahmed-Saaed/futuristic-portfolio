import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'cyan' | 'neutral';
  className?: string;
}

const BADGE_VARIANTS = {
  gold: 'border-gold/40 bg-gold/10 text-gold-highlight',
  cyan: 'border-cyan/40 bg-cyan/10 text-cyan',
  neutral: 'border-borderDark bg-graphite/80 text-mutedGrey',
} as const;

export function Badge({
  children,
  variant = 'neutral',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase',
        BADGE_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

