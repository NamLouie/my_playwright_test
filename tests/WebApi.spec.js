const { test, expect, request } = require('@playwright/test');

const LoginPayLoad = {userEmail: "john.doe29@example.com", userPassword: "StrongPass123!"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]};
let token;
let orderId;


test.beforeAll( async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:LoginPayLoad})
    expect((loginResponse).ok()).toBeTruthy();

    
    //Login API
    const loginResponseJSON = await loginResponse.json();
    token = loginResponseJSON.token;
    console.log(token);


    //Handle Order Creation API
    const createOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayLoad,
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },

    })
    const createOrderResponseJSON = await createOrderResponse.json();
    console.log(createOrderResponseJSON);
    orderId = createOrderResponseJSON.orders[0];

});

test('Place the order', async ({ page }) => {

    //Login API
    page.addInitScript(value => {

        window.localStorage.setItem('token' , value );
    }, token );

    await page.goto("https://rahulshettyacademy.com/client/");
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


    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    



});
