'use client';

import { useCallback, useEffect, useState } from 'react';
import { assetSrc } from '@/src/lib/assets';
import type { GalleryItem } from '@/src/lib/content/types';

/**
 * Image gallery with an in-page lightbox. Tiles without a `href` open the
 * full image in an overlay that can be paged with the arrow keys or the on-screen
 * controls; tiles with a `href` (e.g. the interactive-map cards) link out instead.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  // Indices (into `items`) of the tiles that participate in the lightbox.
  const viewable = items.map((it, i) => (it.href ? -1 : i)).filter((i) => i >= 0);
  const [pos, setPos] = useState<number | null>(null);

  const close = useCallback(() => setPos(null), []);
  const step = useCallback(
    (delta: number) => setPos((p) => (p === null ? p : (p + delta + viewable.length) % viewable.length)),
    [viewable.length],
  );

  useEffect(() => {
    if (pos === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pos, close, step]);

  const current = pos === null ? null : items[viewable[pos]!]!;

  return (
    <>
      <ul className="grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const tile = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetSrc(item.image)}
                alt={item.alt}
                loading="lazy"
                className="border-border aspect-video w-full rounded-lg border object-cover"
              />
              {(item.caption ?? item.href) && (
                <span className="text-brand-accent mt-2 block text-sm font-medium group-hover:underline">
                  {item.caption ?? 'View interactive map'}
                </span>
              )}
            </>
          );
          return (
            <li key={item.image}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {tile}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setPos(viewable.indexOf(i))}
                  className="group block w-full cursor-zoom-in text-left"
                >
                  {tile}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-md bg-white/10 px-3 py-1.5 text-white hover:bg-white/20"
          >
            ✕
          </button>
          {viewable.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-2 rounded-md bg-white/10 px-3 py-4 text-2xl text-white hover:bg-white/20 sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-2 rounded-md bg-white/10 px-3 py-4 text-2xl text-white hover:bg-white/20 sm:right-6"
              >
                ›
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetSrc(current.image)}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/50 px-3 py-1 text-sm text-white">
            {current.alt} · {pos! + 1} / {viewable.length}
          </span>
        </div>
      )}
    </>
  );
}
