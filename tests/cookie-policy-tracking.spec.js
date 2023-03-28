import { test, expect } from '@playwright/test'

test('Site should set cookie consent cookie after user accepts cookies', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForSelector('#cookie-consent', { state: 'visible' }) // Wait for cookie consent modal to appear
  await page.waitForSelector('#accept-button') // Wait for the I Agree button to appear
  const button = await page.$('#accept-button')
  await page.waitForTimeout(1000) // Wait for the cookie to be set
  const cookies = await page.context().cookies()
  const cookieConsentCookie = cookies.find(cookie => cookie.name === 'cookie_consent')
  expect(cookieConsentCookie).not.toBeNull() // Check for presence of cookie consent cookie
})
