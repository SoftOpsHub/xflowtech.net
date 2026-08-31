// Guard: the exported site must not reference the source origin or any
// third-party asset/font host. Run after `pnpm build`.
//
//   node scripts/check-build-output.mjs
//
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../out');
const FORBIDDEN = [/xflowresearch\.com\/wp-content/i, /fonts\.googleapis\.com/i, /fonts\.gstatic\.com/i, /cdn\.jsdelivr/i];
const SCAN_EXT = new Set(['.html', '.js', '.css', '.json', '.txt']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let hits = 0;
for await (const file of walk(ROOT)) {
  if (!SCAN_EXT.has(path.extname(file))) continue;
  const text = await readFile(file, 'utf8');
  for (const re of FORBIDDEN) {
    if (re.test(text)) {
      console.error(`  ✗ ${path.relative(ROOT, file)} matches ${re}`);
      hits++;
    }
  }
}

if (hits) {
  console.error(`\n${hits} forbidden reference(s) in out/`);
  process.exit(1);
}
console.log('out/ is clean — no source-origin or third-party asset/font references');
