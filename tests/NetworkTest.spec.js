const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../utils/APiUtils");
const LoginPayLoad = {
  userEmail: "john.doe29@example.com",
  userPassword: "StrongPass123!",
};
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};
const fakePayLoadOrders = { date: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, LoginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Place the order", async ({ page }) => {
  //Login API
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });

      //intercepting response - API respone => {playwright fakeresponse} => browser => render data on frontend
    }
  );

  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );

  console.log(await page.locator(".mt-4").textContent());
});
