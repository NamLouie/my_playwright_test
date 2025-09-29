const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { CartPage } = require("./CartPage");
const { OrdersPage } = require("./OrdersPage");

class POManager {

constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
}


getLoginPage(){

    return this.loginPage;
}


getDashboardPage() {

    return this.dashboardPage;
}

 getCartPage() {
    return this.cartPage;
  }

  getOrdersPage() {
  return this.ordersPage;
}


}

module.exports = {POManager};