// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',          // folder containing your API tests
  timeout: 30 * 1000,          // global test timeout
  retries: 1,                  // retry failed tests once
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com', // default API base URL
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      // Add Authorization header if needed
      // 'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
    },
  },
  reporter: [['list'], ['html']], // console + HTML report
});
