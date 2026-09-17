const { test, expect } = require ('@playwright/test');

test('validate gender radio button', async({page}) => {
 await page.goto('https://testautomationpractice.blogspot.com/')
 const genderRadio = page.locator('input[name="gender"][value="male"]')
 console.log(await genderRadio.isChecked())
 await genderRadio.check()
 console.log(await genderRadio.isChecked())
 // Check Female radio button
 const genderRadio2 = page.locator('input[name="gender"][value="female"]')
 console.log(await genderRadio2.isChecked())
 await genderRadio2.check()
 console.log(await genderRadio2.isChecked())
 await expect.soft(genderRadio).not.toBeChecked();

})

test('Validate days checkbox', async({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/')
  const sundayBox = page.locator('#sunday')
  await sundayBox.check()
  console.log(await sundayBox.isChecked())
  
  // Check Monday Checkbox
 console.log(await page.locator('#monday').isChecked())
  



})