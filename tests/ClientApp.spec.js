const { test, expect } = require('@playwright/test');


test('Client App Login', async ({ page }) => {

    const email = "john.doe29@example.com";  
    const product = page.locator('.card-body');
    const nameCard = "John Doe";
    const cardNumber = "4542 9931 9292 2293";
    const cvv = "999";
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('StrongPass123!');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const count = await product.count();
    for (let i = 0; i < count; ++i) {
        if (await product.nth(i).locator('b').textContent() === 'ZARA COAT 3') {
            await product.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }

    await page.locator('[routerlink*="cart"]').click();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*="Country"]').pressSequentially("ind");
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text === " India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.input.txt.text-validated').first().fill(cardNumber);
    await page.locator('.input.ddl').first().selectOption('01');
    await page.locator('.input.ddl').last().selectOption('25');
    await page.locator('input[type="text"]').nth(1).fill(cvv);

    await page.locator('input[type="text"]').nth(2).fill(nameCard);
    await page.locator('input[name="coupon"]').fill('BLACKFRIDAY');

    await page.locator('button[type="submit"]').click();

    await page.locator('a:has-text("Place Order")').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator('tbody').waitFor();

    const rows = await page.locator('tbody tr');

    for(let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();




});
