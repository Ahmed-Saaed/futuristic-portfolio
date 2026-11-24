import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({
  children,
  className,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-container px-5 md:px-8 xl:px-16',
        className
      )}
    >
      {children}
    </Component>
  );
}

