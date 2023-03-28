const { test, expect } = require('@playwright/test')

test.describe('Test Responsive Page', () => {
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

  test('Test on mobile view', async () => {
    await page.goto('http://localhost:3000')
    await page.setViewportSize({ width: 360, height: 640 })
    const viewport = page.viewportSize()
    expect(viewport.width).toBe(360)
  })
})
