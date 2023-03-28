import { test, expect } from '@playwright/test'

test('Test Privacy Policy', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy.html')
  const privacyStatementText = await page.textContent('body')
  expect(privacyStatementText).toContain('Google Analytics')
})
