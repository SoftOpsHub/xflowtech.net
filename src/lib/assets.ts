import assetMap from '@/src/lib/content/asset-map.generated.json';
import type { AssetKey } from '@/src/lib/content/types';

// Lean key → { localPath, alt } map written by scripts/capture-assets.mjs.
// Full provenance (source URLs, hashes) lives in the spec's asset-manifest.json
// and is intentionally NOT bundled.
const MAP = assetMap as Record<string, { localPath: string; alt: string }>;

/** Resolve a content AssetKey to a static path under /assets. Throws if unknown. */
export function assetSrc(key: AssetKey): string {
  const row = MAP[key];
  if (!row) throw new Error(`Unknown asset key: ${key}`);
  return row.localPath;
}

/** Manifest-provided alt text, used as a fallback when a component has none. */
export function assetAlt(key: AssetKey): string {
  return MAP[key]?.alt ?? key.replace(/-/g, ' ');
}

export function hasAsset(key: AssetKey): boolean {
  return key in MAP;
}

export const ASSET_KEYS: readonly string[] = Object.keys(MAP);
