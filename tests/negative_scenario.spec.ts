import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Negative Scenario', () => {
  test('Should display an error message for invalid credentials', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
      await loginPage.open();
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
      );
    });

    await test.step('Verify the login error message', async () => {
      const errorText = await loginPage.errorMessage.textContent();
      console.log('Error message displayed:', errorText);
      await loginPage.expectLoginError();
    });
  });
});