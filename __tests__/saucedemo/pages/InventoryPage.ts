import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  get items()        { return this.page.locator('.inventory_item'); }
  get sortDropdown() { return this.page.locator('[data-test="product-sort-container"]'); }
  get itemNames()    { return this.page.locator('.inventory_item_name'); }
  get itemPrices()   { return this.page.locator('.inventory_item_price'); }
  get cartBadge()    { return this.page.locator('.shopping_cart_badge'); }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async addItemToCart(itemName: string) {
    await this.page.locator('.inventory_item')
      .filter({ hasText: itemName })
      .getByRole('button', { name: /add to cart/i })
      .click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getAllPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async getAllNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }
}