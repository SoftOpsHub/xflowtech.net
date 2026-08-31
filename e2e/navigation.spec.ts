import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/about-us', '/contact'];

test.describe('navigation', () => {
  for (const from of ROUTES) {
    test(`primary nav reaches every route from ${from}`, async ({ page }) => {
      await page.goto(from);
      const nav = page.getByRole('navigation', { name: 'Primary' }).first();
      await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
      await expect(nav.getByRole('link', { name: 'About Us' })).toHaveAttribute(
        'href',
        '/about-us',
      );
      await expect(nav.getByRole('link', { name: 'Contact Us' })).toHaveAttribute(
        'href',
        '/contact',
      );
    });
  }

  for (const route of ROUTES) {
    test(`no broken images on ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const broken = await page.$$eval('img', (imgs) =>
        imgs.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc),
      );
      expect(broken).toEqual([]);
    });
  }

  test('footer copyright appears on every page', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      await expect(
        page.getByText('© 2026 · xFlow Tech Inc · All Rights Reserved'),
      ).toBeVisible();
    }
  });
});
