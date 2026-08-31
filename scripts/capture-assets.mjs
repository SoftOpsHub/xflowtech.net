// Dev-only asset capture. Downloads every asset listed in scripts/asset-sources.json
// from the live xflowresearch.com site into public/assets/, and writes a manifest
// (source URL + bytes + sha256 + capture date) for auditability.
//
// This is the ONLY code in the repo permitted to contact xflowresearch.com, and only
// at authoring time. It is never imported by anything under app/ or src/.
//
//   node scripts/capture-assets.mjs
//
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCES = path.join(ROOT, 'scripts/asset-sources.json');
const OUT_DIR = path.join(ROOT, 'public/assets');
// Audit record — full provenance, kept in the spec folder, never shipped.
const MANIFEST = path.join(ROOT, 'specs/001-marketing-site-clone/contracts/asset-manifest.json');
// Lean runtime map — key → { localPath, alt }, safe to bundle (no source URLs).
const RUNTIME_MAP = path.join(ROOT, 'src/lib/content/asset-map.generated.json');
const SOURCE_ORIGIN = 'https://xflowresearch.com';

const extFromUrl = (url) => {
  const m = /\.(png|jpe?g|webp|svg|gif)(?:\?|$)/i.exec(url);
  return m ? `.${m[1].toLowerCase().replace('jpeg', 'jpg')}` : '';
};

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

async function main() {
  const { assets } = JSON.parse(await readFile(SOURCES, 'utf8'));
  await mkdir(OUT_DIR, { recursive: true });

  const prev = existsSync(MANIFEST)
    ? JSON.parse(await readFile(MANIFEST, 'utf8'))
    : { assets: [] };
  const prevByKey = new Map(prev.assets.map((a) => [a.key, a]));

  const capturedAt = new Date().toISOString().slice(0, 10);
  const rows = [];

  for (const { key, sourceUrl, alt, type } of assets) {
    const ext = extFromUrl(sourceUrl) || '.png';
    const localPath = `/assets/${key}${ext}`;
    const dest = path.join(ROOT, 'public', localPath.replace(/^\//, ''));

    const res = await fetch(sourceUrl, { headers: { 'user-agent': 'Mozilla/5.0 (asset-capture)' } });
    if (!res.ok) {
      console.error(`  ✗ ${key}  ${res.status} ${sourceUrl}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const hash = sha256(buf);
    const existing = prevByKey.get(key);

    if (existing?.sha256 === hash && existsSync(dest)) {
      rows.push(existing);
      console.log(`  = ${key} (unchanged)`);
    } else {
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      rows.push({
        key,
        localPath,
        sourceUrl,
        type: type ?? guessType(key),
        alt: alt ?? key.replace(/-/g, ' '),
        bytes: buf.length,
        sha256: hash,
        capturedAt,
        substitution: null,
      });
      console.log(`  ↓ ${key}  ${buf.length}b`);
    }
  }

  rows.sort((a, b) => a.key.localeCompare(b.key));
  await writeFile(
    MANIFEST,
    JSON.stringify({ capturedAt, sourceOrigin: SOURCE_ORIGIN, assets: rows }, null, 2) + '\n',
  );

  const runtime = Object.fromEntries(
    rows.map((r) => [r.key, { localPath: r.localPath, alt: r.alt }]),
  );
  await writeFile(RUNTIME_MAP, JSON.stringify(runtime, null, 2) + '\n');

  console.log(
    `\n${rows.length} assets → ${path.relative(ROOT, MANIFEST)} + ${path.relative(ROOT, RUNTIME_MAP)}`,
  );
}

function guessType(key) {
  if (key.includes('logo') && key.includes('xflow')) return 'logo';
  if (key.includes('favicon') || key.includes('cropped-unnamed')) return 'favicon';
  if (key.includes('icon')) return 'icon';
  return 'logo';
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
