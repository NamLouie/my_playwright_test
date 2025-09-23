const { test, expect, request } = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');  
const LoginPayLoad = {userEmail: "john.doe29@example.com", userPassword: "StrongPass123!"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]};
let response;

test.beforeAll( async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, LoginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test('Place the order', async ({ page }) => {

   
    // const apiUtils = new ApiUtils(apiContext, LoginPayLoad);
    // const orderId = createOrder(orderPayLoad);

    //Login API
    page.addInitScript(value => {

        window.localStorage.setItem('token' , value );
    }, response.token );

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByRole('button',{name: "ORDERS"}).click();
    await page.locator('tbody').waitFor();

    const rows = await page.locator('tbody tr');

    for(let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }


    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    



});
