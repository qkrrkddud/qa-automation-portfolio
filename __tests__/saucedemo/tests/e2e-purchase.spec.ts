import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('E2E 구매 플로우', () => {
  test('상품 선택 → 장바구니 → 결제 → 완료', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('https://www.saucedemo.com/inventory.html');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('KANGYOUNG', 'PARK', '001125');
    await expect(checkoutPage.totalPrice).toBeVisible();
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});