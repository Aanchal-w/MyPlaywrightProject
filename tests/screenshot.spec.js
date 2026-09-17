const { test, expect } = require('@playwright/test');

test('Screenshot scenarios demo', async ({ page }) => {
  // Navigate to the site
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Full page screenshot
  await page.screenshot({ path: 'screenshots/fullpage.png', fullPage: true });

  // Specific element screenshot (e.g., Country dropdown)
  const countryDropdown = page.locator('#country');
  await countryDropdown.screenshot({ path: 'screenshots/countryDropdown.png' });

  // Screenshot after an action (selecting a value)
  await page.selectOption('#country', { label: 'India' });
  await page.screenshot({ path: 'screenshots/afterSelection.png' });

  // Conditional screenshot (only if test fails)
  await expect(countryDropdown).toHaveValue('india', { timeout: 2000 });
});
