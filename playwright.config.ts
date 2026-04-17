import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // ── 오늘의집용 ──────────────────────────
    {
      name: 'ohouse',
      testDir: './__tests__/e2e/ohouse',
      use: { ...devices['Desktop Chrome'] },
    },

    // ── Sauce Demo setup ─────────────────────
    {
      name: 'saucedemo-setup',
      testDir: './__tests__/saucedemo/fixtures',
      testMatch: 'auth.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    // ── Sauce Demo 테스트 ────────────────────
    {
      name: 'saucedemo',
      testDir: './__tests__/saucedemo/tests',
      dependencies: ['saucedemo-setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        storageState: './__tests__/saucedemo/fixtures/auth.json',
      },
    },
  ],
});