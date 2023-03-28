import { test, expect } from '@playwright/test';

test('Privacy statement should mention Google Analytics', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy.html');
  const privacyStatementText = await page.textContent('body');
  expect(privacyStatementText).toContain('Google Analytics');
});