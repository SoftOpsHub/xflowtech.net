import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/about-us', '/contact'];
const OWN_HOST = 'localhost';
const FORBIDDEN_HOSTS = [
  'xflowresearch.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'www.googletagmanager.com',
  'google-analytics.com',
];

test.describe('no external runtime requests', () => {
  for (const route of ROUTES) {
    test(`${route} loads only same-origin resources`, async ({ page }) => {
      const offenders: string[] = [];
      page.on('request', (req) => {
        const host = new URL(req.url()).hostname;
        if (
          host !== OWN_HOST &&
          FORBIDDEN_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))
        ) {
          offenders.push(req.url());
        }
      });
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      expect(offenders).toEqual([]);
    });
  }
});
