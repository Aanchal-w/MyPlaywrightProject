const { test, expect } = require('@playwright/test');

test('Perform drag and drop', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const source = page.locator('text=Drag me to my target');
  const target = page.locator('text=Drop here');

  await source.dragTo(target);

});
