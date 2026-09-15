// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // Folder for your tests
  timeout: 30 * 1000,          // 30 seconds per test
  retries: 0,                  // Retry failed tests once
  use: {
    headless: true,            // Run in headless mode
    screenshot: 'on',          // Capture screenshots on failure
    video: 'retain-on-failure' // Record video if test fails
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});
