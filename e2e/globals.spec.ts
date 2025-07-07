import {test, expect} from '@playwright/test';
import {pathname, testIds, selectors} from './test-helpers';

declare global {
  interface Window {
    testMarker?: string;
  }
}

test('globals page can load, user can add a global', async ({page}) => {
  const time = Date.now();

  await page.goto(pathname('/globals'));

  // Wait for page to load
  await expect(
    page.locator(selectors.byTestId(testIds.globals.pageContainer)),
  ).toBeVisible();

  // Add a unique marker to detect page refreshes
  await page.evaluate(() => {
    window.testMarker = 'page-loaded';
  });

  // Click the Add button
  await page.click(selectors.byTestId(testIds.globals.buttonAdd));

  // Wait for add dialog to open
  await expect(
    page.locator(selectors.byTestId(testIds.globals.formAddDialog)),
  ).toBeVisible();

  // Fill in the form
  await page.fill(
    selectors.byTestId(testIds.globals.formKeyInput),
    `TEST_KEY_${time}`,
  );
  await page.fill(
    selectors.byTestId(testIds.globals.formValueInput),
    `test value ${time}`,
  );

  // Submit the form
  await page.click(selectors.byTestId(testIds.globals.formButtonSubmit));

  // Wait for success toast
  await expect(
    page.locator(selectors.byClassName(testIds.toast.addSuccess)),
  ).toBeVisible();

  // Verify the new global appears in the table
  await expect(
    page.locator(
      selectors.byTestId(testIds.globals.tableRow(`TEST_KEY_${time}`)),
    ),
  ).toBeVisible();
  await expect(
    page.locator(
      selectors.byTestId(testIds.globals.tableCellKey(`TEST_KEY_${time}`)),
    ),
  ).toHaveText(`TEST_KEY_${time}`);
  await expect(
    page.locator(
      selectors.byTestId(testIds.globals.tableCellValue(`TEST_KEY_${time}`)),
    ),
  ).toHaveText(`test value ${time}`);

  // Verify no full page refresh occurred - marker should still exist
  const markerExists = await page.evaluate(() => {
    return window.testMarker === 'page-loaded';
  });

  expect(markerExists).toBe(true);
});
