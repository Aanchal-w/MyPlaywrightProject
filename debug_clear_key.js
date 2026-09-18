const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://demoqa.com/webtables');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('#firstName').fill('Emma');
  await page.locator('#lastName').fill('Stone');
  await page.locator('#age').fill('28');
  await page.locator('#userEmail').fill('emma.stone@test.com');
  await page.locator('#salary').fill('75000');
  await page.locator('#department').fill('QA');
  await page.locator('#submit').click();

  const search = page.locator('#searchBox');
  await search.fill('Emma');
  console.log('after fill Emma', await search.inputValue(), await page.getByRole('row').count());
  await search.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  console.log('after clear via keyboard', await search.inputValue(), await page.getByRole('row').count());
  console.log('rows', await page.getByRole('row').allTextContents());
  await browser.close();
})();
