// Zero-dependency static server for the exported `out/` directory. Used by
// Playwright (playwright.config.ts webServer) to exercise the real static build.
//
//   node scripts/serve-out.mjs [port]
//
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../out');
const PORT = Number(process.argv[2] ?? process.env.PORT ?? 3000);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\.\.+/g, '');
  const candidates = [
    path.join(ROOT, clean),
    path.join(ROOT, clean, 'index.html'),
    path.join(ROOT, `${clean}.html`),
  ];
  for (const c of candidates) {
    try {
      if ((await stat(c)).isFile()) return c;
    } catch {
      // try next
    }
  }
  return null;
}

createServer(async (req, res) => {
  const file = (await resolveFile(req.url)) ?? path.join(ROOT, '404.html');
  const status = file.endsWith('404.html') && req.url !== '/404.html' ? 404 : 200;
  try {
    const body = await readFile(file);
    res.writeHead(status, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(500).end('server error');
  }
}).listen(PORT, () => console.log(`serving out/ on http://localhost:${PORT}`));
