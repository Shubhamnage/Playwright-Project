import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import { PracticeSitePage } from '../../pages/PracticeSitePage';
import { PracticeTablesPage } from '../../pages/PracticeTablesPage';
import { UploadFilesWidget } from '../../pages/UploadFilesWidget';

const fixturePath = (fileName: string): string => resolve(process.cwd(), 'test-data', fileName);

test.beforeEach(async ({ page }) => {
  await new PracticeSitePage(page).openHome();
});

test('TABLE-001: Verify static table headers and a representative row', async ({ page }) => {
  const tables = new PracticeTablesPage(page);

  await expect(tables.staticTable).toBeVisible();
  expect((await tables.staticHeaders()).map((text) => text.trim())).toEqual([
    'BookName',
    'Author',
    'Subject',
    'Price'
  ]);
  await expect(tables.bookRow('Learn Selenium')).toContainText('Amit');
});

test('TABLE-002: Verify dynamic metrics table structure without fixed metric values', async ({ page }) => {
  const tables = new PracticeTablesPage(page);
  const headers = tables.dynamicTable.locator('tr').first().locator('th, td');
  await expect(tables.dynamicTable).toBeVisible();
  await expect(headers).toHaveCount(5);
  expect(await tables.dynamicRowCount()).toBeGreaterThan(1);
  expect(await tables.dynamicCellCounts()).toEqual(
    Array.from({ length: await tables.dynamicRowCount() }, () => 5)
  );
});

test('TABLE-003: Change product table pages and return to page one', async ({ page }) => {
  const tables = new PracticeTablesPage(page);
  const firstPageRows = await tables.productRowsText();

  await tables.goToProductPage(2);
  await expect(tables.productTable).toBeVisible();
  await expect.poll(() => tables.productRowsText()).not.toBe(firstPageRows);

  await tables.goToProductPage(1);
  await expect.poll(() => tables.productRowsText()).toBe(firstPageRows);
});

test('UPLOAD-001: Select a single file and verify its filename', async ({ page }) => {
  const upload = new UploadFilesWidget(page);

  await upload.selectSingleFile(fixturePath('practice-upload-one.txt'));

  await expect(upload.singleFileInput).toHaveValue(/practice-upload-one\.txt$/);
});

test('UPLOAD-002: Select multiple files and verify both filenames', async ({ page }) => {
  const upload = new UploadFilesWidget(page);

  await upload.selectMultipleFiles([
    fixturePath('practice-upload-one.txt'),
    fixturePath('practice-upload-two.txt')
  ]);

  await expect(upload.multipleFilesInput).toHaveValue(/practice-upload-one\.txt$/);
  await expect.poll(() => upload.selectedMultipleFileCount()).toBe(2);
});
