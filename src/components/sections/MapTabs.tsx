'use client';

import { useState } from 'react';
import type { EmbedFrame } from '@/src/lib/content/types';

/**
 * Tabbed third-party interactive embeds (e.g. the Google Earth Engine maps on
 * the GIS page). These frames intentionally load from an external origin — a
 * deliberate, page-scoped exception to the site's otherwise strict
 * static-only / no-external-requests rule.
 */
export function MapTabs({ frames }: { frames: EmbedFrame[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {frames.length > 1 && (
        <div role="tablist" className="mb-3 flex flex-wrap gap-2">
          {frames.map((frame, i) => (
            <button
              key={frame.src}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={
                i === active
                  ? 'bg-brand-header rounded-md px-3 py-1.5 text-sm font-medium text-white'
                  : 'border-border text-muted-foreground rounded-md border px-3 py-1.5 text-sm font-medium'
              }
            >
              {frame.label}
            </button>
          ))}
        </div>
      )}
      <div className="border-border overflow-hidden rounded-lg border">
        <iframe
          key={frames[active]!.src}
          src={frames[active]!.src}
          title={frames[active]!.title}
          loading="lazy"
          className="h-[70vh] max-h-160 w-full"
        />
      </div>
    </div>
  );
}
