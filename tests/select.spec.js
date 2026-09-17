const { test, expect } = require('@playwright/test');

test('Select single option from Country dropdown', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Select "India" by label
  await page.selectOption('#country', { label: 'India' });

  // Verify selection
  await expect(page.locator('#country')).toHaveValue('india');
});

test('Select multiple options from Colors listbox', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  // Select multiple values
 const result = await page.selectOption('#colors', ['red', 'green']);
  expect(result).toEqual(['red', 'green']);
});
