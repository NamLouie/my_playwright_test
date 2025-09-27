// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries:1,
  timeout: 60 * 1000,
  expect: {
    timeout: 6000,
  },
  reporter: 'html',
  fullyParallel: false,
   workers: 1,  

  use: {
    browserName: 'chromium',
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
