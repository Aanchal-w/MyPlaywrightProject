const { test, expect } = require('@playwright/test');
const path = require('path');

test('Upload a single file', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
 
  const fileInput = page.locator('input[type="file"]').first();
  // Path to sample1.txt
  const filePath = path.join(__dirname, 'files', 'sample1.txt');
  // Upload file
  await fileInput.setInputFiles(filePath);

  await page.click('button:has-text("Upload Single File")');

  await expect(page.locator('text=sample1.txt')).toBeVisible();
});

test('Upload multiple files', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Locate the multiple file input
  const fileInput = page.locator('#multipleFilesInput');

  // Paths to sample1.txt and sample2.txt
  const files = [
    path.join(__dirname, 'files', 'sample1.txt'),
    path.join(__dirname, 'files', 'sample2.txt')
  ];

  // Upload multiple files
  await fileInput.setInputFiles(files);

  // Click upload button
  await page.click('button:has-text("Upload Multiple Files")');

  // Verify both file names appear
  await expect(page.locator('text=sample1.txt')).toBeVisible();
  await expect(page.locator('text=sample2.txt')).toBeVisible();
});
