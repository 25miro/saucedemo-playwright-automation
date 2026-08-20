import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText('Your Cart', { exact: true });
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  /**
   * get the locator for a specific item by data-test id (cart list)
   */
  getCartItemByName(productName: string): Locator {
    return this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName });
  }

  /**
   * get all cart items dynamically
   */
  getAllCartItems(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  /**
   * Validates if a specific product is in the cart by name
   * @param productName - Expected product name
   */
  async expectProductInCart(productName: string): Promise<void> {
    const item = this.getCartItemByName(productName);
    await expect(item).toBeVisible();
  }

  /**
   * Validates if a product is in the cart using the exact name
   * @param productName - Expected product name
   */
  async expectProductByNameInCart(productName: string): Promise<void> {
    const item = this.getCartItemByName(productName);
    await expect(item).toHaveText(productName);
  }

  /**
   * Validates multiple products in the cart
   * @param productNames - Array with the expected product names
   */
  async expectMultipleProductsInCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.expectProductInCart(productName);
    }
  }

  /**
   * Gets the total count of items in the cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.getAllCartItems().count();
  }

  /**
   * Validates that the cart has a specific number of items
   * @param expectedCount - Expected number of items
   */
  async expectCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.getAllCartItems()).toHaveCount(expectedCount);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}