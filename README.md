# SauceDemo Playwright Automation Assessment

This project contains automated end-to-end tests for the SauceDemo e-commerce application using Playwright and TypeScript.

## Application Under Test

https://www.saucedemo.com/

## Technology Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model

## Automated Scenarios

### Positive Scenario

E2E Checkout Flow:

1. Open SauceDemo.
2. Login using a valid user.
3. Add three products to the shopping cart.
4. Verify that the product was added to the cart.
5. Proceed to checkout.
6. Provide customer information.
7. Verify the product in the checkout summary.
8. Complete the purchase.
9. Verify the order confirmation message.

### Negative Scenario

Invalid Login:

1. Open SauceDemo.
2. Enter invalid credentials.
3. Attempt to login.
4. Verify that the expected error message is displayed.

## Project Structure

pages/
 - LoginPage.ts
 - LogoutPage.ts
 - InventoryPage.ts
 - CartPage.ts
 - CheckoutInformation.ts
 - CheckoutOverview.ts
 - CheckoutComplete.ts

tests/
- e2e_scenario.spec.ts
- negative_scenario.spec.ts

test-data/
- users.ts
- customers.ts

- playwright.config.ts
- package.json
- README.md
```

## Design Pattern

The project uses the Page Object Model pattern.
Page objects contain page-specific locators and actions, while test files contain the business scenarios and assertions.


## Prerequisites

Before running the project, make sure the following tools are installed:

- Node.js
- npm
- Chrome Browser

## Installation

Clone the repository:

```bash
git clone https://github.com/25miro/saucedemo-playwright-automation.git
```

Navigate to the project directory:

```bash
cd saucedemo
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests with the browser visible:

```bash
npm run test:headed
```

Run tests using Playwright UI Mode:

```bash
npm run test:ui
```

Run tests in debug mode:

```bash
npm run test:debug
```

## Test Report

After executing the tests, open the Playwright HTML report with:

```bash
npm run report
```

## Engineering Decisions

The following engineering decisions were made for this assessment:

- TypeScript was selected for improved type safety and maintainability.
- Page Object Model was selected to separate UI interactions from test scenarios.
- Playwright test IDs and user-facing locators are preferred over fragile XPath or DOM-dependent CSS selectors.
- Fixed waits are intentionally avoided. Playwright auto-waiting and web-first assertions are used instead.
- Chromium is used as the primary browser because cross-browser coverage was not explicitly required by the assessment.
- Test data is stored separately from test logic.
- Assertions are added at important business checkpoints rather than only validating the final page.

## Assumptions

The assessment does not specify:

- Which product must be purchased.
- Which customer details must be used during checkout.
- Whether cross-browser testing is required.
- What kind of data/messages should be validated

Therefore:

- Is used three random products to the checkout product.
- Static test customer data is used during checkout.
- Chromium is used as the primary execution browser.
- Validated the error messages in the negative scenario

## Test Credentials

Valid user:

```text
Username: standard_user
Password: secret_sauce
```

These credentials are publicly provided by the SauceDemo test application and by the assessment requirements.
