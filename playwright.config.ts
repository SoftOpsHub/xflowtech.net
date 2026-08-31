import { defineConfig } from '@playwright/test';

// e2e runs against the real static export in `out/`, served by a zero-dep
// static server. Build first: `pnpm build`.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4319',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'node scripts/serve-out.mjs 4319',
    url: 'http://localhost:4319',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
