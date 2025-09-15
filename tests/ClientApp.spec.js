const { test, expect } = require('@playwright/test');


test('ClientApp', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('john.doe29@example.com');
    await page.locator('#userPassword').fill('StrongPass123!');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');;
});