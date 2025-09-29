// CartPage.js
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator("li .cartSection h3"); 
    this.checkoutBtn = page.locator("text=Checkout");
  }

  async verifyProductInCart(productName) {
    await this.cartProducts.first().waitFor();
    const cartProduct = await this.cartProducts.textContent();
    return cartProduct.trim() === productName;
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}

module.exports = { CartPage };
