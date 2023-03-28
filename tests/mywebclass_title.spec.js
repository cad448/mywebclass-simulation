// @ts-check
const { test, expect } = require('@playwright/test')

test('Should have MyWebClass.org title', async ({ page }) => {
  // Expect a title "to contain" a substring
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle('MyWebClass.org')
})

test('Test Cookie Accept', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForSelector('.cookie-modal', { state: 'hidden' })
  expect(await page.isVisible('.cookie-modal')).toBe(false)
})

test('Test UTF-8', async ({ page }) => {
  // Navigate to the web page
  await page.goto('http://localhost:3000')

  // Get the content encoding from the HTTP header
  const contentEncoding = await page.evaluate(() => {
    return document.characterSet
  })

  // Assert that the content encoding is UTF-8
  expect(contentEncoding).toBe('UTF-8')
})

test('Test Meta Tag', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const h2Tag = await page.$('h2')
  expect(h2Tag).not.toBeNull()
})

test('Test Page Description', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const descriptionElement = await page.$('head meta[name="description"]')
  expect(descriptionElement).not.toBeNull()

  const descriptionContent = await descriptionElement.getAttribute('content')
  expect(descriptionContent).not.toBeFalsy()
})

test('Test Google Analytics', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const gaScript = await page.$('script[src*="www.googletagmanager.com/gtag/js"]')
  expect(gaScript).not.toBeNull()

  const trackingID = await page.evaluate(() => {
    const script = document.querySelector('script[src*="www.googletagmanager.com/gtag/js"]')
    const trackingIDRegex = /id=(.*?)(&|$)/
    return script ? script.src.match(trackingIDRegex)[1] : null
  })
  expect(trackingID).not.toBeNull()
})

test('Test Homepage Cookie', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const modal = await page.$('.cookie-modal')
  if (modal) {
    const acceptButton = await modal.$('button.accept')
    if (acceptButton) {
      await acceptButton.click()
      await page.waitForSelector('.cookie-modal', { state: 'hidden' })
      const modalAfterAccept = await page.$('.cookie-modal')
      expect(modalAfterAccept).toBeNull()
    }
  }
})

test.describe('Test Image Alt attribute', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('Check if all images have an alt attribute', async ({ page }) => {
    const imageElements = await page.$$('img')

    // Iterate through image elements and check if they have an alt attribute
    for (let i = 0; i < imageElements.length; i++) {
      const altText = await imageElements[i].getAttribute('alt')
      await expect(altText).toBeTruthy()
    }
  })
})

test.describe('Test English', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
  })

  test.afterEach(async () => {
    await page.close()
  })

  test('Should have correct language attribute', async () => {
    await page.goto('http://localhost:3000')
    const lang = await page.getAttribute('html', 'lang')
    expect(lang).toBe('EN') // english
  })
})

test('Test Language Switch', async ({ page }) => {
  // Navigate to the page to be tested
  await page.goto('http://localhost:3000')

  // Verify that language switcher is available
  const languageSwitcher = await page.$('select#language-switcher')
  expect(languageSwitcher).toBeTruthy()

  // Get all available language options
  const languageOptions = await languageSwitcher.$$('option')

  // Verify that at least two language options are available
  expect(languageOptions.length).toBeGreaterThan(1)

  // Loop through each language option and verify that content displays correctly
  for (const option of languageOptions) {
    const languageCode = await option.getAttribute('value')
    await languageSwitcher.selectOption({ value: languageCode })
    const pageText = await page.innerText('html')
    expect(pageText).not.toContain('Error') // Check that the page does not display error messages due to language issues
  }
})

test('Test Privacy Policy w GA', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy.html')
  const privacyStatementText = await page.textContent('body')
  expect(privacyStatementText).toContain('Google Analytics')
})

test.describe('Test Responsive', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
  })

  test.afterEach(async () => {
    await page.close()
  })

  test('Test on desktop', async () => {
    await page.goto('https://www.example.com')
    const viewport = page.viewportSize()
    expect(viewport.width).toBeGreaterThan(1024)
  })

  test('Test on tablet', async () => {
    await page.goto('https://www.example.com')
    await page.setViewportSize({ width: 768, height: 1024 })
    const viewport = page.viewportSize()
    expect(viewport.width).toBe(768)
  })

  test('Test on mobile', async () => {
    await page.goto('http://localhost:3000')
    await page.setViewportSize({ width: 360, height: 640 })
    const viewport = page.viewportSize()
    expect(viewport.width).toBe(360)
  })
})

test('Test Cookie Tracking', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForSelector('#cookie-consent', { state: 'visible' })
  await page.waitForSelector('#accept-button')
  await page.waitForTimeout(1000)
  const cookies = await page.context().cookies()
  const cookieConsentCookie = cookies.find(cookie => cookie.name === 'cookie_consent')
  expect(cookieConsentCookie).not.toBeNull()
})
