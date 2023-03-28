const { test, expect } = require('@playwright/test')

test('Google Analytics tracking ID should be present', async ({ page }) => {
  // Navigate to the website and wait for the page to load
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  // Check if the Google Analytics script is present on the page
  const gaScript = await page.$('script[src*="www.googletagmanager.com/gtag/js"]')
  expect(gaScript).not.toBeNull()

  // Check if the tracking ID is present in the tracking code
  const trackingID = await page.evaluate(() => {
    const script = document.querySelector('script[src*="www.googletagmanager.com/gtag/js"]')
    const trackingIDRegex = /id=(.*?)(&|$)/
    return script ? script.src.match(trackingIDRegex)[1] : null
  })
  expect(trackingID).not.toBeNull()
})
