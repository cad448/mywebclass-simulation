const { test, expect } = require('@playwright/test');

test('Check for h1 tag', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const h1Tag = await page.$('h1');
  expect(h1Tag).not.toBeNull();
});