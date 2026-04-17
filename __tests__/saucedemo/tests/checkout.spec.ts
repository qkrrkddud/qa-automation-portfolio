import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('정상 배송 정보 입력 후 결제 요약 확인', async ({ page }) => {
    await checkoutPage.fillShippingInfo('KANGYOUNG', 'PARK', '001125');
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.totalPrice).toBeVisible();
  });

  test('이름 없이 결제 시 에러 메시지', async () => {
    await checkoutPage.fillShippingInfo('', 'PARK', '001125');
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('성 없이 결제 시 에러 메시지', async () => {
    await checkoutPage.fillShippingInfo('KANGYOUNG', '', '001125');
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('우편번호 없이 결제 시 에러 메시지', async () => {
    await checkoutPage.fillShippingInfo('KANGYOUNG', 'PARK', '');
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });
});