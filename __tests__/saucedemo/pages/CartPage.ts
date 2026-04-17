import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get cartItems()      { return this.page.locator('.cart_item'); }
  get checkoutButton() { return this.page.locator('[data-test="checkout"]'); }
  get continueButton() { return this.page.locator('[data-test="continue-shopping"]'); }

  async removeItem(itemName: string) {
    await this.page.locator('.cart_item')
      .filter({ hasText: itemName })
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}