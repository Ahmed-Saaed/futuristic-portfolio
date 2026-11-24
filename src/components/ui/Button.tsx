import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary-gold' | 'secondary-cyan' | 'nav-pill' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  'primary-gold':
    'relative overflow-hidden rounded-[12px] bg-gradient-to-r from-[#E8C57B] via-[#D8B268] to-[#C49E50] text-[#08090B] font-medium shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-105 active:scale-[0.99] border border-[#F5DDA4]/60',
  'secondary-cyan':
    'relative overflow-hidden rounded-[12px] bg-[#06181E]/70 text-[#2CE6F7] font-medium border border-[#00D5E8]/80 shadow-cyan-glow hover:shadow-cyan-glow-lg hover:bg-[#00D5E8]/15 hover:text-[#7CF3FF] active:scale-[0.99] backdrop-blur-md',
  'nav-pill':
    'relative overflow-hidden rounded-full bg-[#0E1013]/85 text-warmWhite font-normal border border-gold/65 shadow-[0_0_16px_-4px_rgba(196,164,90,0.45)] hover:border-gold-highlight hover:shadow-gold-glow hover:text-gold-highlight active:scale-[0.99] backdrop-blur-md',
  ghost:
    'rounded-lg text-mutedGrey hover:text-warmWhite hover:bg-white/5',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-wide gap-1.5',
  md: 'px-6 py-3.5 text-sm tracking-wide gap-2',
  lg: 'px-7 py-4 text-[0.9375rem] tracking-wide gap-2.5',
};

export function Button({
  children,
  variant = 'primary-gold',
  size = 'md',
  showArrow = true,
  className,
  ...props
}: ButtonProps) {
  const sharedClasses = cn(
    'group inline-flex items-center justify-center transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian select-none',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  const innerContent = (
    <>
      {/* Top specular highlight line mimicking the reference button glow */}
      {variant === 'primary-gold' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 -top-px h-[2px] bg-gradient-to-r from-transparent via-[#FFF6D6] to-transparent opacity-90"
        />
      )}
      {variant === 'secondary-cyan' && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 -top-px h-[2px] bg-gradient-to-r from-transparent via-[#7AF6FF] to-transparent opacity-90"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-[#00D5E8] to-transparent opacity-75"
          />
        </>
      )}
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if ('href' in props && typeof props.href === 'string') {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={sharedClasses} {...anchorProps}>
        {innerContent}
      </a>
    );
  }

  return (
    <button type="button" className={sharedClasses} {...(props as ButtonAsButton)}>
      {innerContent}
    </button>
  );
}

