const { expect, test} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const { customTest } = require('../utils/test-base');

//JSON -> STRING -> OBJECT
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


for(const data of dataset){


test(`Client App Login Page Object for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);
    const products = page.locator('.card-body');
    const nameCard = "John Doe";
    const cardNumber = "4542 9931 9292 2293";
    const cvv = "999";

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductsAddCart(data.productName);
    await dashboardPage.navigateToCart();


    //assignment
    await page.locator('div li').first().waitFor();
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

    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(data.username);
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

}

customTest.skip('Client Custom App', async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page);
    const products = page.locator('.card-body');
    const nameCard = "John Doe";
    const cardNumber = "4542 9931 9292 2293";
    const cvv = "999";

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductsAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();


    //assignment
    await page.locator('div li').first().waitFor();
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

    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(testDataForOrder.username);
    await page.locator('.input.txt.text-validated').first().fill(cardNumber);
    await page.locator('.input.ddl').first().selectOption('01');
    await page.locator('.input.ddl').last().selectOption('25');
    await page.locator('input[type="text"]').nth(1).fill(cvv);

    await page.locator('input[type="text"]').nth(2).fill(nameCard);
    await page.locator('input[name="coupon"]').fill('BLACKFRIDAY');

    await page.locator('button[type="submit"]').click();

})