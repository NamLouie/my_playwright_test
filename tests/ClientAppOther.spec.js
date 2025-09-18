const { test, expect } = require('@playwright/test');


test('Client App Login', async ({ page }) => {

    const email = "john.doe29@example.com";  
    const product = page.locator('.card-body');
    const nameCard = "John Doe";
    const cardNumber = "4542 9931 9292 2293";
    const cvv = "999";
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('StrongPass123!');
    await page.getByRole('button', {name:'Login'}).click()
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole('button', {name: "Add To Cart"}).click();

    await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();

    await page.locator('div li').first().waitFor();
    
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", {name: "Checkout"}).click();
    await page.getByPlaceholder('Select Country').pressSequentially("ind");
    await page.getByRole("button", {name: "India"}).nth(1).click();

    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.input.txt.text-validated').first().fill(cardNumber);
    await page.locator('.input.ddl').first().selectOption('01');
    await page.locator('.input.ddl').last().selectOption('25');
    await page.locator('input[type="text"]').nth(1).fill(cvv);

    await page.locator('input[type="text"]').nth(2).fill(nameCard);
    await page.locator('input[name="coupon"]').fill('BLACKFRIDAY');

    await page.locator('button[type="submit"]').click();

    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await page.getByRole('button',{name: "ORDERS"}).click();

    await page.locator('tbody').waitFor();

    const rows = await page.locator('tbody tr');

    for(let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    // await page.locator('tbody tr', {has: page.locator("th", {hasText: orderId })}).locator('button').first().click();
    

    //find row of orderID
    //match the orderID 
    //click the same orderID button "view"

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();



});
