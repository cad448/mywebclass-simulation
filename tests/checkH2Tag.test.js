const { test, expect } = require('@playwright/test')

test('Check for h2 tag', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const h2Tag = await page.$('h2')
  expect(h2Tag).not.toBeNull()
})
