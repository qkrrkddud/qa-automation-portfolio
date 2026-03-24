import { test, expect } from '@playwright/test';

test.describe('Login Test', () => {

  test('로그인 성공', async ({ page }) => {
    const startUrl = 'https://qa-web.ohouse.in/en-JP';
    await page.goto(startUrl);

    // 로그인 모달 열기
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Log-in with email' }).click();

    // 이메일/비밀번호 입력
    await page.locator('input[name="email"]').fill('pkytest1@gmail.com');
    await page.locator('input[name="password"]').fill('123asd!@');

    // 로그인 버튼 클릭 + API 응답 기다리기
    await Promise.all([
      page.waitForResponse(response =>
        response.url().includes('/api/users/sign-in') && response.status() === 200
      ),
      page.getByRole('button', { name: 'Log in' }).click(),
    ]);

    // 로그인 성공 검증
    await expect(page).toHaveURL(/en-JP/);
  });

  test('로그인 실패 - 잘못된 비밀번호', async ({ page }) => {
    const startUrl = 'https://qa-web.ohouse.in/en-JP';
    await page.goto(startUrl);

    // 로그인 모달 열기
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Log-in with email' }).click();

    // 이메일/잘못된 비밀번호 입력
    await page.locator('input[name="email"]').fill('pkytest1@gmail.com');
    await page.locator('input[name="password"]').fill('wrongpassword');

    // 로그인 버튼 클릭
    await page.getByRole('button', { name: 'Log in' }).click();

    // 토스트 메시지 검증
    const toast = page.locator('div.css-j05eyw.efmkyib2');
    await toast.waitFor({ state: 'visible', timeout: 5000 });

    // 메시지 텍스트 확인 (부분 문자열 + 실패 횟수 포함)
    await expect(toast).toContainText(/Login will be restricted for 10 minutes.*\(\d\/10\)/i);
  });

});