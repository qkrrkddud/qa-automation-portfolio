import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../test-data/users.json';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('정상 로그인 후 인벤토리 페이지 이동', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('잠긴 계정 - 에러 메시지 표시', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('잘못된 비밀번호 - 에러 메시지 표시', async () => {
    await loginPage.login('standard_user', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('빈 아이디/비밀번호 - 에러 메시지 표시', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  for (const user of users) {
    test(`데이터 드리븐: ${user.username || '(빈값)'} - 예상결과: ${user.expect}`, async ({ page }) => {
      await loginPage.login(user.username, user.password);
      if (user.expect === 'success') {
        await expect(page).toHaveURL(/inventory/);
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }
    });
  }
});