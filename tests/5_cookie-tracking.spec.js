import { test, expect } from '@playwright/test'

test('Test cookie consent setting after being accepted', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForSelector('#cookie-consent', { state: 'visible' })
  await page.waitForSelector('#accept-button')
  //  const button = await page.$('#accept-button')
  await page.waitForTimeout(1000)
  const cookies = await page.context().cookies()
  const cookieConsentCookie = cookies.find(cookie => cookie.name === 'cookie_consent')
  expect(cookieConsentCookie).not.toBeNull()
})
