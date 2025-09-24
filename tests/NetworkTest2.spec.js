const { test, expect, request } = require("@playwright/test");

test("Security test request intercept", async ({ page }) => {
  const email = "john.doe29@example.com";
  const product = page.locator(".card-body");
  const nameCard = "John Doe";
  const cardNumber = "4542 9931 9292 2293";
  const cvv = "999";
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("StrongPass123!");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator('button[routerlink*="myorders"]').click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68d3757df669d6cb0ae485fe3123",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order"); //unauthorized

});
