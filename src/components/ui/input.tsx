import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/lib/utils';

// size heights match Button's sm/default/lg exactly (contracts/design-tokens.md
// §5) — a `sm` Input sits flush with a `sm` Button in the same row.
const inputVariants = cva(
  'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
  {
    variants: {
      size: {
        sm: 'h-7',
        default: 'h-8',
        lg: 'h-9',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

function Input({
  className,
  type,
  size = 'default',
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  );
}

export { Input };
