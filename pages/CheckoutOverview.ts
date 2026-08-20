import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  // Summary Info Section Elements
  readonly summaryInfoContainer: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly priceTotalLabel: Locator;
  readonly subTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText('Checkout: Overview', { exact: true });
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');

    // Summary Info Container
    this.summaryInfoContainer = page.locator('.summary_info');

    // Summary Info Elements
    this.paymentInfoLabel = page.getByTestId('payment-info-label');
    this.paymentInfoValue = page.getByTestId('payment-info-value');
    this.shippingInfoLabel = page.getByTestId('shipping-info-label');
    this.shippingInfoValue = page.getByTestId('shipping-info-value');
    this.priceTotalLabel = page.getByTestId('total-info-label');
    this.subTotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
  }

  /**
   * Gets the locator for a specific item by data-test id
   */
  getOverviewItemById(itemId: number): Locator {
    return this.page.getByTestId(`item_${itemId}_title_link`);
  }

  /**
   * Gets all overview items dynamically
   */
  getAllOverviewItems(): Locator {
    return this.page.locator('[data-test^="item_"][data-test$="_title_link"]');
  }

  /**
   * Validates if a specific product is in the overview list by name
   * @param productName - Expected product name
   */
  async expectProductInOverviewList(productName: string): Promise<void> {
    const allItems = this.getAllOverviewItems();
    await expect(allItems.filter({ hasText: productName })).toBeVisible();
  }

  /**
   * Validates if a product is in the overview list using the item ID
   * @param itemId - Item ID
   * @param productName - Expected product name
   */
  async expectProductByIdInOverviewList(itemId: number, productName: string): Promise<void> {
    const item = this.getOverviewItemById(itemId);
    await expect(item).toHaveText(productName);
  }

  /**
   * Validates multiple products in the overview list
   * @param productNames - Array with the expected product names
   */
  async expectMultipleProductsInOverviewList(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.expectProductInOverviewList(productName);
    }
  }

  /**
   * Gets the total count of items in the overview list
   */
  async getOverviewItemCount(): Promise<number> {
    return await this.getAllOverviewItems().count();
  }

  /**
   * Validates that the overview list has a specific number of items
   * @param expectedCount - Expected number of items
   */
  async expectOverviewItemCount(expectedCount: number): Promise<void> {
    await expect(this.getAllOverviewItems()).toHaveCount(expectedCount);
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Validates that all elements in the summary_info section are visible
   */
  async expectAllSummaryInfoElementsVisible(): Promise<void> {
    await expect(this.summaryInfoContainer).toBeVisible();
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.paymentInfoValue).toBeVisible();
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.shippingInfoValue).toBeVisible();
    await expect(this.priceTotalLabel).toBeVisible();
    await expect(this.subTotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  /**
   * Validates the texts of the labels in the summary_info section
   */
  async expectSummaryInfoLabelsText(): Promise<void> {
    await expect(this.paymentInfoLabel).toContainText('Payment Information');
    await expect(this.shippingInfoLabel).toContainText('Shipping Information');
    await expect(this.priceTotalLabel).toContainText('Price Total');
    await expect(this.subTotalLabel).toContainText('Item total');
    await expect(this.taxLabel).toContainText('Tax');
    await expect(this.totalLabel).toContainText('Total');
  }

  /**
   * Gets the payment info value
   */
  async getPaymentInfoValue(): Promise<string | null> {
    return await this.paymentInfoValue.textContent();
  }

  /**
   * Gets the shipping info value
   */
  async getShippingInfoValue(): Promise<string | null> {
    return await this.shippingInfoValue.textContent();
  }

  /**
   * Validates the payment and shipping values
   */
  async expectPaymentAndShippingValues(
    expectedPayment: string,
    expectedShipping: string
  ): Promise<void> {
    await expect(this.paymentInfoValue).toHaveText(expectedPayment);
    await expect(this.shippingInfoValue).toHaveText(expectedShipping);
  }

  /**
   * Extracts and validates the monetary values (subtotal, tax, total)
   */
  async expectPriceValues(
    expectedSubtotal: string,
    expectedTax: string,
    expectedTotal: string
  ): Promise<void> {
    await expect(this.subTotalLabel).toContainText(expectedSubtotal);
    await expect(this.taxLabel).toContainText(expectedTax);
    await expect(this.totalLabel).toContainText(expectedTotal);
  }

  /**
   * Dynamically validates that all elements in the summary_info section
   * within the main container are present
   */
  async expectAllSummaryInfoDataTestsPresent(): Promise<void> {
    const dataTestIds = [
      'payment-info-label',
      'payment-info-value',
      'shipping-info-label',
      'shipping-info-value',
      'total-info-label',
      'subtotal-label',
      'tax-label',
      'total-label',
    ];

    for (const testId of dataTestIds) {
      const element = this.summaryInfoContainer.locator(`[data-test="${testId}"]`);
      await expect(element).toBeAttached();
    }
  }
}