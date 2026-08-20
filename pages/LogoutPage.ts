import { Locator, Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly burgerMenuButton: Locator;
  readonly logoutSidebarLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutSidebarLink = page.getByTestId('logout-sidebar-link');
  }

  async logoutProcess(): Promise<void> {
    await this.burgerMenuButton.click();
    await this.logoutSidebarLink.click();
  }
}