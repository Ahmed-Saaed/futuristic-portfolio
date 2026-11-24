import { cn } from '@/lib/utils';

export interface ScrollCueProps {
  label: string;
  href: string;
  ariaLabel?: string;
  variant?: 'default' | 'gold';
  withTrailingLine?: boolean;
  className?: string;
}

export function ScrollCue({
  label,
  href,
  ariaLabel,
  variant = 'default',
  withTrailingLine = false,
  className,
}: ScrollCueProps) {
  const isGold = variant === 'gold';

  return (
    <div className={cn('flex items-center gap-5 w-full', className)}>
      <a
        href={href}
        aria-label={ariaLabel ?? label}
        className="group inline-flex shrink-0 items-center gap-3.5 text-warmWhite/85 transition-colors duration-300 hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-full"
      >
        <span
          className={cn(
            'relative flex h-9 w-6 items-start justify-center rounded-full border-[1.5px] p-1.5 transition-colors duration-200 group-hover:border-gold-highlight',
            isGold
              ? 'border-gold/80 shadow-[0_0_12px_rgba(196,164,90,0.25)]'
              : 'border-warmWhite/75'
          )}
        >
          <span className="h-2 w-[2px] rounded-full bg-gold-highlight transition-transform duration-300 ease-out group-hover:translate-y-1.5" />
        </span>
        <span className="font-sans text-xs sm:text-[0.8125rem] tracking-[0.04em] text-warmWhite/85 group-hover:text-gold-highlight">
          {label}
        </span>
      </a>

      {withTrailingLine && (
        <div
          aria-hidden="true"
          className="relative hidden sm:block h-[1px] flex-1 max-w-2xl bg-gradient-to-r from-gold/15 via-gold/55 to-transparent"
        >
          {/* Specular flare node along the horizontal baseline */}
          <span className="absolute left-[12%] -top-[1.5px] h-1 w-14 rounded-full bg-gradient-to-r from-transparent via-[#FFF0C2] to-transparent shadow-[0_0_12px_2px_rgba(229,190,120,0.9)]" />
        </div>
      )}
    </div>
  );
}

