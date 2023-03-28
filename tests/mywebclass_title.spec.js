// @ts-check
const { test, expect } = require('@playwright/test')

test('Should have MyWebClass.org title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await page.goto('http://localhost:63342')
  await expect(page).toHaveTitle('MyWebClass.org')
})

// @ts-check 1 twitter icon
test('Should have Twitter icon', async ({ page }) => {
  // Expect a Twitter icon to be present on the page.
  await page.goto('http://localhost:63342')
  const twitterIcon = await page.waitForSelector('.twitter-icon')
  await expect(twitterIcon).toBeVisible()
})

// @ts-check 2 facebook icon
test('Should have Facebook icon', async ({ page }) => {
  // Expect a Facebook icon to be present on the page.
  await page.goto('http://localhost:63342')
  const facebookIcon = await page.waitForSelector('.facebook-icon')
  await expect(facebookIcon).toBeVisible()
})

// @ts-check 3 linkedin icon
test('Should have LinkedIn icon', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'linkedin-icon-selector' with the actual selector for the LinkedIn icon element
  const linkedInIcon = await page.$('linkedin-icon-selector')

  expect(linkedInIcon).toBeTruthy()
})

// @ts-check 4 home button
test('Should have Home button', async ({ page }) => {
  // Expect a Home button to be present on the page.
  await page.goto('http://localhost:63342')
  const homeButton = await page.waitForSelector('.home-button')
  await expect(homeButton).toBeVisible()
})

// @ts-check 5 search button
test('Should have a search button', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'search-button-selector' with the actual selector for the search button element
  const searchButton = await page.$('search-button-selector')

  expect(searchButton).toBeTruthy()
})

// @ts-check 6 search bar
test('Should have a search bar', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'search-bar-selector' with the actual selector for the search bar element
  const searchBar = await page.$('search-bar-selector')

  expect(searchBar).toBeTruthy()
})

// @ts-check 7 content template button
test('Should have a content template', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'content-template-selector' with the actual selector for the content template element
  const contentTemplate = await page.$('content-template-selector')

  expect(contentTemplate).toBeTruthy()
})

// @ts-check 8 email address bar
test('Should have an email address input bar', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'email-input-selector' with the actual selector for the email address input bar element
  const emailAddressInput = await page.$('email-input-selector')

  expect(emailAddressInput).toBeTruthy()
})

// @ts-check 9 subscribe button
test('Should have a subscribe button', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'subscribe-button-selector' with the actual selector for the subscribe button element
  const subscribeButton = await page.$('subscribe-button-selector')

  expect(subscribeButton).toBeTruthy()
})

// @ts-check 10 our story button
test('Should have an "Our Story" element', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'our-story-selector' with the actual selector for the "Our Story" element
  const ourStoryElement = await page.$('our-story-selector')

  expect(ourStoryElement).toBeTruthy()
})

// @ts-check 11 privacy policy button
test('Should have a Privacy Policy element', async ({ page }) => {
  await page.goto('http://localhost:63342')

  // Replace 'privacy-policy-selector' with the actual selector for the Privacy Policy element
  const privacyPolicyElement = await page.$('privacy-policy-selector')

  expect(privacyPolicyElement).toBeTruthy()
})

// @ts-check 12 accept cookie
test('Should have accept cookie modal', async ({ page }) => {
  // Expect an accept cookie modal to be present on the page.
  await page.goto('http://localhost:63342')
  const acceptCookieModal = await page.waitForSelector('.accept-cookie-modal')
  await expect(acceptCookieModal).toBeVisible()
})

// @ts-check 13 responsive test
test('Should be responsive', async ({ page }) => {
  // Expect the website to be responsive across various viewport sizes.
  await page.goto('http://localhost:63342')
  const mobileViewport = { width: 375, height: 667 }
  const tabletViewport = { width: 768, height: 1024 }
  const desktopViewport = { width: 1280, height: 800 }

  await page.setViewportSize(mobileViewport)
  await expect(page).not.toMatch('horizontal-scroll')

  await page.setViewportSize(tabletViewport)
  await expect(page).not.toMatch('horizontal-scroll')

  await page.setViewportSize(desktopViewport)
  await expect(page).not.toMatch('horizontal-scroll')
})

// @ts-check 14 meta tag / syntax
test('Should have meta tag', async ({ page }) => {
  // Expect a meta tag to be present on the page.
  await page.goto('http://localhost:63342')
  const metaTag = await page.waitForSelector('head meta[name="description"]')
  const content = await metaTag.getAttribute('content')
  await expect(metaTag).toBeVisible()
  await expect(content).toBeTruthy()
})

// @ts-check 15 image alt attributes
test('Should have image alt attributes', async ({ page }) => {
  // Expect all images to have alt attributes on the page.
  await page.goto('http://localhost:63342')
  const images = await page.$$('img')
  for (const image of images) {
    const altAttribute = await image.getAttribute('alt')
    await expect(altAttribute).toBeTruthy()
  }
})

// @ts-check 16 UTF-8 encoding
test('Should have UTF-8 encoding', async ({ page }) => {
  // Expect the website to have UTF-8 encoding.
  await page.goto('http://localhost:63342')
  const encoding = await page.evaluate(() => {
    return document.characterSet
  })
  await expect(encoding).toBe('UTF-8')
})