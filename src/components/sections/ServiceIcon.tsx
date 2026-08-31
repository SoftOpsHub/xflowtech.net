import type { CSSProperties } from 'react';
import { Award } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { assetSrc } from '@/src/lib/assets';
import type { AssetKey } from '@/src/lib/content/types';

// A few of the scraped "icons" are detailed illustrations that don't reduce to a
// clean glyph; those use a `lucide:<name>` key instead.
const LUCIDE: Record<string, typeof Award> = { award: Award };

/**
 * Renders a service icon as a solid white mark on the navy circle. Captured
 * icons (a mix of white, navy, and multicolour source art) go through a CSS
 * mask so they all read as a consistent white silhouette, matching the live
 * site's white-on-navy look.
 */
export function ServiceIcon({ icon, className }: { icon: AssetKey; className?: string }) {
  if (icon.startsWith('lucide:')) {
    const Cmp = LUCIDE[icon.slice(7)] ?? Award;
    return <Cmp aria-hidden className={cn('text-white', className)} />;
  }

  const url = `url(${assetSrc(icon)})`;
  const style: CSSProperties = {
    maskImage: url,
    WebkitMaskImage: url,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
  };
  return <span aria-hidden className={cn('inline-block bg-white', className)} style={style} />;
}
