import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/lib/utils';

// Pill-shaped — deliberately rounded-full, outside the small/medium/large
// roundness scale (contracts/design-tokens.md §3), same as an avatar.
const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-muted text-muted-foreground',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-success-tint text-success',
        warning: 'bg-warning-tint text-warning',
        info: 'bg-info-tint text-info',
        destructive: 'bg-destructive-tint text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
