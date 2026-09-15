const { test,expect } = require ('@playwright/test'); // for js
//import { test, expect } from '@playwright/test'; // for ts

test('Check input fields', async({page}) => {
await page.goto('https://testautomationpractice.blogspot.com/')  //open the browser
await page.locator('#name').fill('TestAutom1');
// await page.fill('#name', 'TestAutom1'); // alternative way to fill the input field
await page.locator('#email').fill('testautomation123@gmail.com');
await page.locator('#phone').fill('1234567890');
await page.waitForTimeout(2000);
const addressField = page.locator('#textarea');
  await addressField.scrollIntoViewIfNeeded();   // scroll first
  await addressField.fill('Hinjawadi Pune');

})

test('Check input field with assertion', async({page}) => {
await page.goto('https://testautomationpractice.blogspot.com/')  //open the browser
let nameField = page.locator('#name');
await expect.soft(nameField).toBeEmpty()
await expect (nameField).toBeEnabled()
await expect (nameField).toBeVisible()

await nameField.fill('TestAutom1');
await expect (nameField).toHaveValue('TestAutom1');
})