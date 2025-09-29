Feature: Ecommerce validations

 @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message

  Examples:
  | username            | password  |
  | rahulshetty         | StrongPass123!  |
  | rahulshetty@example | hiapoaeapw@!  |