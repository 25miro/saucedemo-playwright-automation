import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async open(): Promise<void> {
    await this.page.goto('/'); //using the baseURL defined in playwright.config.ts
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      'Username and password do not match any user in this service'
    );
  }

  async expectLoginErrorWithoutUsername(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      'Username is required'
    );
  }

  async expectLoginErrorWithoutPassword(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      'Password is required'
    );
  }
}