import type { ComponentProps } from 'react';
import { cn } from '@/src/lib/utils';

// Centered, max-width page wrapper. Reference component for the
// component-based layout under src/components/layout/.
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8', className)} {...props} />
  );
}
