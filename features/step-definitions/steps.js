const { When, Then, Given } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 200 * 100 },
  async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);

When("add {string}", async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductsAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = this.poManager.getCartPage();
  const result = await cartPage.verifyProductInCart(productName);
  expect(result).toBeTruthy();
  await cartPage.checkout();
});

When("Enter valid details and Place the order", async function () {
  const ordersPage = this.poManager.getOrdersPage();
  await ordersPage.placeOrder();
});

Then("Verify order in present in the OrderHistory", async function () {
  const ordersPage = this.poManager.getOrdersPage();
  const result = await ordersPage.verifyOrderInHistory();
  expect(result).toBeTruthy();
});

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function (username, password) {
    const userName = this.page.locator('#username');
    const Password = this.page.locator("[type='password']");
    const loginBtn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.type(username);
    await Password.type(password);
    await loginBtn.click();
  }
);

Then("Verify error message", async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
