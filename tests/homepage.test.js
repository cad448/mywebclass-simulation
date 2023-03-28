const { test, expect } = require('@playwright/test');

test('Accepting cookie closes modal', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const modal = await page.$('.cookie-modal');
  if (modal) {
    const acceptButton = await modal.$('button.accept');
    if (acceptButton) {
      await acceptButton.click();
      await page.waitForSelector('.cookie-modal', { state: 'hidden' });
      const modalAfterAccept = await page.$('.cookie-modal');
      expect(modalAfterAccept).toBeNull();
    }
  }
});