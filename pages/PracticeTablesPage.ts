import type { Locator, Page } from '@playwright/test';

export class PracticeTablesPage {
  readonly staticTable: Locator;
  readonly dynamicTable: Locator;
  readonly productTable: Locator;
  readonly productPagination: Locator;

  constructor(page: Page) {
    this.staticTable = page.getByRole('table').filter({ hasText: 'BookName' });
    this.dynamicTable = page.locator('#taskTable');
    this.productTable = page.locator('#productTable');
    this.productPagination = page.locator('.pagination');
  }

  async staticHeaders(): Promise<string[]> {
    return this.staticTable.locator('tr').first().locator('th, td').allTextContents();
  }

  async productRowsText(): Promise<string> {
    return this.productTable.innerText();
  }

  async dynamicRowCount(): Promise<number> {
    return this.dynamicTable.locator('tr').count();
  }

  async dynamicCellCounts(): Promise<number[]> {
    return Promise.all(
      (await this.dynamicTable.locator('tr').all()).map((row) => row.locator('th, td').count())
    );
  }

  bookRow(bookName: string): Locator {
    return this.staticTable.getByRole('row', { name: new RegExp(bookName) });
  }

  async goToProductPage(pageNumber: number): Promise<void> {
    await this.productPagination.getByText(String(pageNumber), { exact: true }).click();
  }
}
