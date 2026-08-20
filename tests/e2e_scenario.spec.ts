import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformation } from '../pages/CheckoutInformation';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutComplete } from '../pages/CheckoutComplete';
import { users } from '../test-data/users';
import { customers } from '../test-data/customers';

test.describe('E2E_Scenario', () => {
  test('Should complete the checkout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformation = new CheckoutInformation(page);
    const checkoutOverview = new CheckoutOverviewPage(page);
    const checkoutComplete = new CheckoutComplete(page);
    const logoutPage = new LogoutPage(page);

    await test.step('Login with a valid user', async () => {
      await loginPage.open();

      await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
      );

      await inventoryPage.expectInventoryPage();
    });

    await test.step('Add three products to the cart', async () => {
      await inventoryPage.addBackpackToCart();
      await inventoryPage.addBikeLightToCart();
      await inventoryPage.addBoltTshirtToCart();
      await inventoryPage.openCart();

      await cartPage.expectProductInCart('Sauce Labs Backpack');
      await cartPage.expectProductInCart('Sauce Labs Bike Light');
      await cartPage.expectProductInCart('Sauce Labs Bolt T-Shirt');
    });

    await test.step('Provide Checkout Information', async () => {
      await cartPage.proceedToCheckout();

      await checkoutInformation.fillCustomerInformation(
        customers.clientOne.firstName,
        customers.clientOne.lastName,
        customers.clientOne.postalCode
      );
    });

    await test.step('Checkout Overview', async () => {
        await checkoutOverview.expectAllSummaryInfoElementsVisible();
        await checkoutOverview.expectSummaryInfoLabelsText();
        await checkoutOverview.finishCheckout();
    });

    await test.step('Checkout Complete', async () => {
        await checkoutComplete.expectOrderConfirmation();
        await checkoutComplete.backHomeButton.click();

    });

    await test.step('Logout', async () => {
      await logoutPage.logoutProcess();
      console.log('E2E Scenario ran successfully!');
    });
  });
});