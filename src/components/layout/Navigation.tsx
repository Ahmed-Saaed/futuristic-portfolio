'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types/common';

export interface NavigationProps {
  items: NavItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Navigation({
  items,
  activeId,
  onSelect,
  orientation = 'horizontal',
  className,
}: NavigationProps) {
  const pathname = usePathname();
  const isHomeRoute = pathname === '/';
  const isVertical = orientation === 'vertical';

  return (
    <nav
      aria-label={isVertical ? 'Mobile Primary Navigation' : 'Primary Navigation'}
      className={cn(className)}
    >
      <ul
        className={cn(
          'flex',
          isVertical
            ? 'flex-col items-start gap-5'
            : 'items-center gap-8 lg:gap-11'
        )}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          const resolvedHref =
            !isHomeRoute && item.href.startsWith('#')
              ? `/${item.href}`
              : item.href;

          return (
            <li key={item.id} className="relative">
              <a
                href={resolvedHref}
                onClick={() => onSelect?.(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group relative inline-flex items-center py-2 font-sans text-sm tracking-[0.03em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian rounded-sm',
                  isVertical && 'text-lg font-display tracking-wider',
                  isActive
                    ? 'text-gold-highlight font-medium'
                    : 'text-warmWhite/85 hover:text-warmWhite'
                )}
              >
                <span>{item.label}</span>

                {/* Active & hover luminous gold underline */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ease-out',
                    isActive
                      ? 'w-12 bg-gradient-to-r from-transparent via-gold-highlight to-transparent shadow-[0_0_12px_2px_rgba(229,190,120,0.8)] opacity-100'
                      : 'w-0 bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 group-hover:w-8 group-hover:opacity-75'
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

