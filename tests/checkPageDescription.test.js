const { test, expect } = require('@playwright/test');

test('Check page description', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const descriptionElement = await page.$('head meta[name="description"]');
  expect(descriptionElement).not.toBeNull();

  const descriptionContent = await descriptionElement.getAttribute('content');
  expect(descriptionContent).not.toBeFalsy();
});