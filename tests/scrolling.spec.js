const { test,expect } = require ('@playwright/test');

test('Scroll to dropdown and select item', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const scrollDropdown = page.locator('input[placeholder="Select an item"]');

  // Scroll into view
  await scrollDropdown.scrollIntoViewIfNeeded();
  // Fill value
  await scrollDropdown.fill('Item 5');
  // Assert value
  await expect(scrollDropdown).toHaveValue('Item 5');
});
