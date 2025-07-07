import {test, expect} from '@playwright/test';
import {pathname, testIds, selectors} from './test-helpers';

declare global {
  interface Window {
    testMarker?: string;
  }
}

test('user can add a global', async ({page}) => {
  const time = Date.now();

  await page.goto(pathname('/sample-crud'));

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

test('user can edit a global', async ({page}) => {
  const time = Date.now();
  const originalKey = `EDIT_KEY_${time}`;
  const updatedValue = `updated value ${time}`;

  await page.goto(pathname('/sample-crud'));

  // Wait for page to load
  await expect(
    page.locator(selectors.byTestId(testIds.globals.pageContainer)),
  ).toBeVisible();

  // First, add a global to edit
  await page.click(selectors.byTestId(testIds.globals.buttonAdd));
  await expect(
    page.locator(selectors.byTestId(testIds.globals.formAddDialog)),
  ).toBeVisible();

  await page.fill(
    selectors.byTestId(testIds.globals.formKeyInput),
    originalKey,
  );
  await page.fill(
    selectors.byTestId(testIds.globals.formValueInput),
    `original value ${time}`,
  );
  await page.click(selectors.byTestId(testIds.globals.formButtonSubmit));

  // Wait for add success toast
  await expect(
    page.locator(selectors.byClassName(testIds.toast.addSuccess)),
  ).toBeVisible();

  // Add page refresh marker
  await page.evaluate(() => {
    window.testMarker = 'page-loaded';
  });

  // Now edit the global
  await page.click(selectors.byTestId(testIds.globals.buttonEdit(originalKey)));

  // Wait for edit dialog to open
  await expect(
    page.locator(selectors.byTestId(testIds.globals.formEditDialog)),
  ).toBeVisible();

  // Key should be pre-filled and disabled/readonly
  await expect(
    page.locator(selectors.byTestId(testIds.globals.formKeyInput)),
  ).toHaveValue(originalKey);

  // Update the value
  await page.fill(
    selectors.byTestId(testIds.globals.formValueInput),
    updatedValue,
  );

  // Submit the form
  await page.click(selectors.byTestId(testIds.globals.formButtonSubmit));

  // Wait for success toast
  await expect(
    page.locator(selectors.byClassName(testIds.toast.updateSuccess)),
  ).toBeVisible();

  // Verify the global was updated in the table
  await expect(
    page.locator(
      selectors.byTestId(testIds.globals.tableCellValue(originalKey)),
    ),
  ).toHaveText(updatedValue);

  // Verify no full page refresh occurred
  const markerExists = await page.evaluate(() => {
    return window.testMarker === 'page-loaded';
  });
  expect(markerExists).toBe(true);
});

test('user can delete a global', async ({page}) => {
  const time = Date.now();
  const keyToDelete = `DELETE_KEY_${time}`;

  await page.goto(pathname('/sample-crud'));

  // Wait for page to load
  await expect(
    page.locator(selectors.byTestId(testIds.globals.pageContainer)),
  ).toBeVisible();

  // First, add a global to delete
  await page.click(selectors.byTestId(testIds.globals.buttonAdd));
  await expect(
    page.locator(selectors.byTestId(testIds.globals.formAddDialog)),
  ).toBeVisible();

  await page.fill(
    selectors.byTestId(testIds.globals.formKeyInput),
    keyToDelete,
  );
  await page.fill(
    selectors.byTestId(testIds.globals.formValueInput),
    `value to delete ${time}`,
  );
  await page.click(selectors.byTestId(testIds.globals.formButtonSubmit));

  // Wait for add success toast
  await expect(
    page.locator(selectors.byClassName(testIds.toast.addSuccess)),
  ).toBeVisible();

  // Verify the global exists in the table
  await expect(
    page.locator(selectors.byTestId(testIds.globals.tableRow(keyToDelete))),
  ).toBeVisible();

  // Add page refresh marker
  await page.evaluate(() => {
    window.testMarker = 'page-loaded';
  });

  // Delete the global
  await page.click(
    selectors.byTestId(testIds.globals.buttonDelete(keyToDelete)),
  );

  // Wait for delete success toast
  await expect(
    page.locator(selectors.byClassName(testIds.toast.deleteSuccess)),
  ).toBeVisible();

  // Verify the global was removed from the table
  await expect(
    page.locator(selectors.byTestId(testIds.globals.tableRow(keyToDelete))),
  ).not.toBeVisible();

  // Verify no full page refresh occurred
  const markerExists = await page.evaluate(() => {
    return window.testMarker === 'page-loaded';
  });
  expect(markerExists).toBe(true);
});
