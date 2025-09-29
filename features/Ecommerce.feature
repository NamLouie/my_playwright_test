Feature: Ecommerce 

 @Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "john.doe29@example.com" and "StrongPass123!"
    When add "ZARA COAT 3"
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the order
    Then Verify order in present in the OrderHistory

  @Regression
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message

  Examples:
  | username            | password  |
  | rahulshetty         | StrongPass123!  |
  | rahulshetty@example | hiapoaeapw@!  |