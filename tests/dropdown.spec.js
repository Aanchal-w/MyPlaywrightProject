const { test, expect } = require('@playwright/test');

test('Select country by value', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Select "India" by its value
  await page.selectOption('#country', { label: 'India' });
  // Verify selection
  await expect(page.locator('#country')).toHaveValue('india');
});
