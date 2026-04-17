import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('상품 추가 후 장바구니에서 확인', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItems).toContainText('Sauce Labs Backpack');
  });

  test('장바구니 상품 삭제', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.removeItem('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('여러 상품 추가 후 장바구니 수량 확인', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(3);
  });

  test('빈 장바구니에서 계속 쇼핑 버튼 동작', async () => {
    await inventoryPage.goToCart();
    await cartPage.continueButton.click();
    await expect(inventoryPage.items).toHaveCount(6);
  });
});