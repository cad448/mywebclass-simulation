const { test, expect } = require('@playwright/test')

test('Test UTF-8 Encoding', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const contentEncoding = await page.evaluate(() => {
    return document.characterSet
  })

  expect(contentEncoding).toBe('UTF-8')
})
