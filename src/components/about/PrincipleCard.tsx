import type { PrincipleIconId, PrincipleItem } from '@/types/common';
import { cn } from '@/lib/utils';

function PrincipleIcon({ id }: { id: PrincipleIconId }) {
  switch (id) {
    case 'curiosity':
      // Custom dual-hemisphere brain icon in champagne gold outline matching reference
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 text-gold-highlight transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Left hemisphere */}
          <path
            d="M19.5 9.5C19.5 7.5 17.8 6 15.6 6C13.6 6 12 7.4 11.7 9.2C9.4 9.5 7.5 11.4 7.5 13.8C7.5 15.1 8 16.2 8.9 17.1C7.6 18.1 6.8 19.7 6.8 21.5C6.8 23.8 8.2 25.8 10.3 26.6C10.1 27.3 10 28 10 28.8C10 31.4 12.1 33.5 14.8 33.5C17.4 33.5 19.5 31.4 19.5 28.8V9.5Z"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left neural folds */}
          <path
            d="M11.8 13.5C13.6 13.5 15 14.9 15 16.7M10.5 21.2C12.8 21.2 14.5 22.8 14.5 25M15.2 27.8C16.8 27.8 18 26.5 19.5 26.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Right hemisphere */}
          <path
            d="M20.5 9.5C20.5 7.5 22.2 6 24.4 6C26.4 6 28 7.4 28.3 9.2C30.6 9.5 32.5 11.4 32.5 13.8C32.5 15.1 32 16.2 31.1 17.1C32.4 18.1 33.2 19.7 33.2 21.5C33.2 23.8 31.8 25.8 29.7 26.6C29.9 27.3 30 28 30 28.8C30 31.4 27.9 33.5 25.2 33.5C22.6 33.5 20.5 31.4 20.5 28.8V9.5Z"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right neural folds */}
          <path
            d="M28.2 13.5C26.4 13.5 25 14.9 25 16.7M29.5 21.2C27.2 21.2 25.5 22.8 25.5 25M24.8 27.8C23.2 27.8 22 26.5 20.5 26.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'craft':
      // Custom </> code brackets icon in champagne gold outline matching reference
      return (
        <svg
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-10 text-gold-highlight transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <path
            d="M14.5 13L6.5 20L14.5 27"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.5 13L37.5 20L29.5 27"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.8 9.5L19.2 30.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'ownership':
      // Custom faceted diamond icon in champagne gold outline matching reference
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 text-gold-highlight transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <polygon
            points="12,8 28,8 35,16.5 20,33.5 5,16.5"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <line
            x1="5"
            y1="16.5"
            x2="35"
            y2="16.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polyline
            points="12,8 15.5,16.5 20,33.5 24.5,16.5 28,8"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinejoin="round"
          />
          <polyline
            points="15.5,16.5 20,8 24.5,16.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export interface PrincipleCardProps {
  item: PrincipleItem;
  showDivider?: boolean;
  className?: string;
}

export function PrincipleCard({
  item,
  showDivider = false,
  className,
}: PrincipleCardProps) {
  return (
    <div
      data-about-principle
      className={cn(
        'group relative flex flex-col items-start',
        showDivider &&
          'sm:pl-7 md:pl-9 sm:border-l sm:border-borderDark/70',
        className
      )}
    >
      <div className="mb-3.5 drop-shadow-[0_0_12px_rgba(229,190,120,0.22)]">
        <PrincipleIcon id={item.id} />
      </div>

      <h3 className="font-display text-lg sm:text-[1.1875rem] font-medium tracking-[-0.01em] text-warmWhite transition-colors duration-300 group-hover:text-gold-highlight">
        {item.title}
      </h3>

      <p className="mt-1 font-sans text-xs sm:text-[0.84rem] font-normal tracking-[0.01em] text-mutedGrey">
        {item.description}
      </p>
    </div>
  );
}

