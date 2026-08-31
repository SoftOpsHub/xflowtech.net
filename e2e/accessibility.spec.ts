import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = ['/', '/about-us', '/contact'];

test.describe('accessibility', () => {
  for (const route of ROUTES) {
    test(`${route} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      const detail = serious.flatMap((v) =>
        v.nodes.map((n) => `${v.id} :: ${n.target.join(' ')} :: ${n.failureSummary}`),
      );
      expect(detail).toEqual([]);
    });
  }

  test('primary nav and contact email are keyboard reachable', async ({ page }) => {
    await page.goto('/contact');
    const email = page.locator('a[href="mailto:info@xflowtech.net"]').first();
    await email.focus();
    await expect(email).toBeFocused();
  });
});
