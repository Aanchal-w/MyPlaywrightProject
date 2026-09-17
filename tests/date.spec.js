const { test, expect } = require('@playwright/test');

test('Select today’s date in Date Picker 1', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const dateInput = page.locator('#datepicker'); // adjust selector if needed

  await dateInput.click();
  const today = new Date();
  const day = today.getDate().toString();

  // Click today’s date in calendar
  await page.locator(`.ui-datepicker-calendar td a:text("${day}")`).click();

  const value = await dateInput.inputValue();
  expect(value).toContain(today.getFullYear().toString());
});


test('Select 25 Dec 2026 in Date Picker 2', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const dateInput = page.locator('#txtDate'); 
  await dateInput.click(); // open the calendar widget

  // Select December from month dropdown
  await page.locator('.ui-datepicker-month').selectOption({ label: 'Dec' });

  // Select year 2026 from year dropdown
  await page.locator('.ui-datepicker-year').selectOption('2026');

  // Click day 25 in the calendar
  await page.locator('.ui-datepicker-calendar td a:text("25")').click();

  // Verify the selected value
  await expect(dateInput).toHaveValue('25/12/2026');
});



test('Enter date manually in Date Picker 1', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const dateInput = page.locator('#datepicker');

  await dateInput.fill('09/17/2026');
  await expect(dateInput).toHaveValue('09/17/2026');
});


test('Select date range in Date Picker 3', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const startDate = page.locator('#start-date'); // input type="date"
  const endDate = page.locator('#end-date');     // input type="date"

  // Use ISO format YYYY-MM-DD
  await startDate.fill('2026-09-17');
  await endDate.fill('2026-09-25');

  await expect(startDate).toHaveValue('2026-09-17');
  await expect(endDate).toHaveValue('2026-09-25');
});

