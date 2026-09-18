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
  await page.locator('#searchBox').fill('Emma');
  console.log('before clear rows count', await page.getByRole('row').count());
  const searchBox = page.locator('#searchBox');
  await searchBox.fill('');
  await page.waitForTimeout(2000);
  console.log('after fill empty and timeout rows count', await page.getByRole('row').count());
  console.log('value', await searchBox.inputValue());
  try {
    await page.waitForFunction(() => {
      const rows = Array.from(document.querySelectorAll('div[role="row"]'));
      return rows.length >= 5;
    }, { timeout: 10000 });
    console.log('waitForFunction success');
  } catch (e) {
    console.log('waitForFunction failed', e.message);
  }
  console.log('final count', await page.getByRole('row').count());
  await browser.close();
})();
