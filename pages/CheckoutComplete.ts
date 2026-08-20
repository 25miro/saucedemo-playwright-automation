import { expect, Locator, Page } from '@playwright/test';

export class CheckoutComplete {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;
  readonly generatePDFButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText('Checkout: Complete!', { exact: true });
    this.confirmationMessage = page.getByText('Thank you for your order!', { exact: true });
    this.backHomeButton = page.getByTestId('back-to-products');
    this.generatePDFButton = page.getByTestId('generate-pdf-order');

  }

  async expectOrderConfirmation(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.confirmationMessage).toBeVisible();
    }
  }