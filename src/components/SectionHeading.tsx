import type { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string | undefined;
  title: ReactNode;
  intro?: ReactNode | undefined;
  className?: string | undefined;
  align?: 'start' | 'center' | undefined;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  align = 'start',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={cn('max-w-3xl', centered ? 'mx-auto text-center' : 'text-start', className)}>
      {eyebrow ? (
        <p className="text-brand-accent text-sm font-semibold tracking-wide uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="text-muted-foreground mt-4 text-base">{intro}</p> : null}
    </div>
  );
}
