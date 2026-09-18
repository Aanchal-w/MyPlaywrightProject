const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://demoqa.com/webtables');
  console.log('initial rows', await page.getByRole('row').count());
  console.log('initial texts', await page.getByRole('row').allTextContents());

  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('#firstName').fill('Emma');
  await page.locator('#lastName').fill('Stone');
  await page.locator('#age').fill('28');
  await page.locator('#userEmail').fill('emma.stone@test.com');
  await page.locator('#salary').fill('75000');
  await page.locator('#department').fill('QA');
  await page.locator('#submit').click();

  console.log('after add rows', await page.getByRole('row').count());
  console.log('after add texts', await page.getByRole('row').allTextContents());

  await page.locator('#searchBox').fill('Emma');
  await page.waitForTimeout(1000);
  console.log('after search rows', await page.getByRole('row').count());
  console.log('after search texts', await page.getByRole('row').allTextContents());

  await page.locator('#searchBox').fill('');
  await page.waitForTimeout(1000);
  console.log('after clear rows', await page.getByRole('row').count());
  console.log('after clear texts', await page.getByRole('row').allTextContents());

  await browser.close();
})();
