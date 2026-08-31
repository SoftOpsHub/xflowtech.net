import { test, expect } from '@playwright/test';

test.describe('contact page', () => {
  test('shows the three offices and a mailto link', async ({ page }) => {
    await page.goto('/contact');

    for (const entity of [
      'X Flow Software Technology LLC',
      'xFlow Tech Inc.',
      'xFlow Tech Pvt. Ltd.',
    ]) {
      await expect(page.getByRole('heading', { name: entity })).toBeVisible();
    }

    await expect(page.locator('a[href="mailto:info@xflowtech.net"]').first()).toBeVisible();
  });

  test('has no contact form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('form')).toHaveCount(0);
  });
});
