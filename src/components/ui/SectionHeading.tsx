import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  indexLabel: string;
  title: string;
  highlightWord?: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  indexLabel,
  title,
  highlightWord,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-3">
        <span className="h-3.5 w-[2px] bg-cyan" aria-hidden="true" />
        <span className="font-display text-xs font-medium tracking-[0.22em] uppercase text-gold-highlight">
          {indexLabel}
        </span>
        <span className="h-px w-10 bg-gold/30" aria-hidden="true" />
      </div>

      <h2 className="font-serif text-[length:var(--text-section-headline)] font-normal leading-[1.1] tracking-tight text-warmWhite">
        {title}{' '}
        {highlightWord && (
          <span className="text-gold-highlight">{highlightWord}</span>
        )}
      </h2>

      {subtitle && (
        <p className="max-w-2xl font-sans text-[length:var(--text-body)] leading-relaxed text-mutedGrey">
          {subtitle}
        </p>
      )}
    </div>
  );
}

