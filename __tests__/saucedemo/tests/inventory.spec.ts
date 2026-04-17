import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('상품 6개 표시 확인', async () => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('가격 오름차순 정렬', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('가격 내림차순 정렬', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('이름 오름차순 정렬 (A-Z)', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getAllNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('이름 내림차순 정렬 (Z-A)', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getAllNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('장바구니 추가 및 삭제', async ({ page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.goToCart();
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await page.locator('.cart_item')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .getByRole('button', { name: /remove/i })
      .click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.locator('.cart_item')
      .filter({ hasText: 'Sauce Labs Bike Light' })
      .getByRole('button', { name: /remove/i })
      .click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});