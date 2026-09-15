const { test, expect } = require('@playwright/test');

test('Handle simple alert', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Listen for alert
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('I am an alert box!'); // adjust message if needed
    await dialog.accept();
  });

  await page.click('button:has-text("Simple Alert")');
});

test('Handle confirmation alert - accept', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.accept(); // click OK
  });

  await page.click('button:has-text("Confirmation Alert")');
});


test('Handle prompt alert', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept('Playwright User'); // enter text into prompt
  });

  await page.click('button:has-text("Prompt Alert")');
});
