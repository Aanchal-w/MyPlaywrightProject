const { test, expect } = require ('@playwright/test');

test('validate gender radio button', async({page}) => {
 await page.goto('https://testautomationpractice.blogspot.com/')
 const genderRadio = page.locator('input[name="gender"][value="male"]')
 console.log(await genderRadio.isChecked())
 await genderRadio.check()
 console.log(await genderRadio.isChecked())
 
 const genderRadio2 = page.locator('input[name="gender"][value="female"]')
 console.log(await genderRadio2.isChecked())
 await genderRadio2.check()
 console.log(await genderRadio2.isChecked())
 await expect.soft(genderRadio).not.toBeChecked();


})