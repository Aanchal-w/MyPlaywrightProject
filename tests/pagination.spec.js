const { test, expect } = require('@playwright/test');

test('Navigate pagination table', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Verify first page shows ID=1
  await expect(page.locator('a.active', { hasText: '1' })).toBeVisible();

  // Click page 2
  await page.click('a:has-text("2")');

  // Verify second page shows ID=6
  await expect(page.locator('a:has-text("6")')).not.toBeVisible();
});
