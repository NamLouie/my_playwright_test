const {test} = require("@playwright/test");

exports.customTest = test.extend({
  testDataForOrder: {
    username: "john.doe29@example.com",
    password: "StrongPass123!",
    productName: "ZARA COAT 3"
  }
});
