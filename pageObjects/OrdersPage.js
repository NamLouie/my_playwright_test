// OrdersPage.js
class OrdersPage {
  constructor(page) {
    this.page = page;
    this.countryInput = page.locator('[placeholder*="Country"]');
    this.dropdown = page.locator(".ta-results");
    this.placeOrderBtn = page.locator('a:has-text("Place Order")');
    this.heroText = page.locator(".hero-primary");
    this.orderIdLabel = page.locator(".em-spacer-1 .ng-star-inserted");
    this.myOrdersBtn = page.locator("button[routerlink*='myorders']");
    this.ordersTable = page.locator("tbody");
  }

  async placeOrder(details) {
    await this.countryInput.pressSequentially("ind");
    await this.dropdown.waitFor();

    const options = this.dropdown.locator("button");
    const count = await options.count();
    for (let i = 0; i < count; ++i) {
      const text = await options.nth(i).textContent();
      if (text.trim() === "India") {
        await options.nth(i).click();
        break;
      }
    }

    await this.placeOrderBtn.click();
  }

  async verifyOrderInHistory() {
    await this.heroText.waitFor();
    const orderId = await this.orderIdLabel.textContent();
    console.log("Order ID:", orderId);

    await this.myOrdersBtn.click();
    await this.ordersTable.waitFor();

    const rows = this.page.locator("tbody tr");
    for (let i = 0; i < (await rows.count()); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    const orderIdDetails = await this.page.locator(".col-text").textContent();
    return orderId.includes(orderIdDetails);
  }
}

module.exports = { OrdersPage };
