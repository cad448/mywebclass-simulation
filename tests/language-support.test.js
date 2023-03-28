const { test, expect } = require('@playwright/test')

test('Test Language Switch', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const languageSwitcher = await page.$('select#language-switcher')
  expect(languageSwitcher).toBeTruthy()

  const languageOptions = await languageSwitcher.$$('option')

  expect(languageOptions.length).toBeGreaterThan(1)

  for (const option of languageOptions) {
    const languageCode = await option.getAttribute('value')
    await languageSwitcher.selectOption({ value: languageCode })
    const pageText = await page.innerText('html')
    expect(pageText).not.toContain('Error')
  }
})
