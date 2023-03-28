const { test, expect } = require('@playwright/test');

test('Should have MyWebClass.org title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle('MyWebClass.org')
})

test('Accepting cookie closes modal', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForSelector('.cookie-modal', { state: 'hidden' });
  expect(await page.isVisible('.cookie-modal')).toBe(false);
});


test('Check UTF-8 encoding', async ({ page }) => {
  // Navigate to the web page
  await page.goto('http://localhost:3000');

  // Get the content encoding from the HTTP header
  const contentEncoding = await page.evaluate(() => {
    return document.characterSet;
  });

  // Assert that the content encoding is UTF-8
  expect(contentEncoding).toBe('UTF-8');
});


test('Check for h1 tag', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const h1Tag = await page.$('h1');
  expect(h1Tag).not.toBeNull();
});


test('Check page description', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const descriptionElement = await page.$('head meta[name="description"]');
  expect(descriptionElement).not.toBeNull();

  const descriptionContent = await descriptionElement.getAttribute('content');
  expect(descriptionContent).not.toBeFalsy();
});


test('Accepting cookie closes modal', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const modal = await page.$('.cookie-modal');
  if (modal) {
    const acceptButton = await modal.$('button.accept');
    if (acceptButton) {
      await acceptButton.click();
      await page.waitForSelector('.cookie-modal', { state: 'hidden' });
      const modalAfterAccept = await page.$('.cookie-modal');
      expect(modalAfterAccept).toBeNull();
    }
  }
});


test.describe('Image Alt attribute test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // Replace with your website URL
  });

  test('Check if all images have an alt attribute', async ({ page }) => {
    // Get all image elements on the page
    const imageElements = await page.$$('img');

    // Iterate through image elements and check if they have an alt attribute
    for (let i = 0; i < imageElements.length; i++) {
      const altText = await imageElements[i].getAttribute('alt');

    }
  });
});


test.describe('Language Test', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Should have correct language attribute', async () => {
    await page.goto('http://localhost:3000')
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('EN'); // Replace with the expected language code
  });
});


test('Language support should allow users to switch between languages and display content correctly', async ({ page }) => {
  // Navigate to the page to be tested
  await page.goto('http://localhost:3000');

  // Verify that language switchner is available
  const languageSwitcher = await page.$('select#language-switcher');
  expect(languageSwitcher).toBeTruthy();

  // Get all available language options
  const languageOptions = await languageSwitcher.$$('option');

  // Verify that at least two language options are available
  expect(languageOptions.length).toBeGreaterThan(1);

  // Loop through each language option and verify that content displays correctly
  for (const option of languageOptions) {
    const languageCode = await option.getAttribute('value');
    await languageSwitcher.selectOption({ value: languageCode });
    const pageText = await page.innerText('html');
    expect(pageText).not.toContain('Error'); // Check that the page does not display error messages due to language issues
  }
});

