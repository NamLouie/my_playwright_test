const { test, expect } = require('@playwright/test');

test('Register', async ({ browser }) => {
 const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();

  await page.goto('https://www.rahulshettyacademy.com/client/');
  await page.locator('.text-reset').click();
});
