import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

setup('로그인 상태 저장', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.waitForURL(/inventory/);
  await page.context().storageState({
    path: './__tests__/saucedemo/fixtures/auth.json'
  });
});