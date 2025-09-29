// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries:1,
  fullyParallel: false,
  workers: 1,  

  timeout: 60 * 1000,
  expect: {
    timeout: 6000,
  },
  reporter: 'html',
   projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        ignoreHTTPSErrors: true,
        screenshot: 'off',
        trace: 'retain-on-failure',
        // ...devices['iPhone 11'],
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        // viewport : {width:720,height:720},
        permissions:['geolocation']
      },
    },
  ],
  
  

  
});
