import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly shoppingCartLink: Locator;
  readonly backpackAddToCartButton: Locator;
  readonly bikeLightAddToCartButton: Locator;
  readonly boltTshirtAddToCartButton: Locator;
  readonly fleeceJacketAddToCartButton: Locator;
  readonly onesieAddToCartButton: Locator;
  readonly tshirtRedAddToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText('Products', { exact: true });
    this.backpackAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.bikeLightAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-bike-light');
    this.boltTshirtAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
    this.fleeceJacketAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
    this.onesieAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-onesie');
    this.tshirtRedAddToCartButton = page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
  }

  async expectInventoryPage(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackAddToCartButton.click();
    await expect(this.shoppingCartLink).toHaveText('1');
  }

  async addBikeLightToCart(): Promise<void> {
    await this.bikeLightAddToCartButton.click();
    await expect(this.shoppingCartLink).toHaveText('2');
  }

  async addBoltTshirtToCart(): Promise<void> {
    await this.boltTshirtAddToCartButton.click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}