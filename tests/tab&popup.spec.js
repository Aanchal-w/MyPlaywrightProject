const { test, expect } = require('@playwright/test');

test('Open new tab and popup window', async ({ page, context }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Click "New Tab" button
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.click('button:has-text("New Tab")')
  ]);
  await newTab.waitForLoadState();
  expect(newTab.url()).toContain('pavantestingtools.com');

  // Click "Popup Windows" button
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.click('button:has-text("Popup Windows")')
  ]);
  await popup.waitForLoadState();
  expect(popup.url()).toContain('playwright');
});

