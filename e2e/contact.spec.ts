import { test, expect } from '@playwright/test';

test.describe('contact page', () => {
  test('shows the UAE office and a mailto link', async ({ page }) => {
    await page.goto('/contact');

    await expect(
      page.getByRole('heading', { name: 'X Flow Software Technology LLC' }),
    ).toBeVisible();
    for (const entity of ['xFlow Inc.', 'xFlow Pvt. Ltd.']) {
      await expect(page.getByRole('heading', { name: entity })).toHaveCount(0);
    }

    await expect(page.locator('a[href="mailto:info@xflowtech.net"]').first()).toBeVisible();
  });

  test('has no contact form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('form')).toHaveCount(0);
  });
});
