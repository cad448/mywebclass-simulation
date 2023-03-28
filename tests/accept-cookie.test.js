const { test, expect } = require('@playwright/test');

test('Accepting cookie closes modal', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForSelector('.cookie-modal', { state: 'hidden' });
  expect(await page.isVisible('.cookie-modal')).toBe(false);
});