import type { Locator, Page } from '@playwright/test';

export class UploadFilesWidget {
  readonly singleFileInput: Locator;
  readonly multipleFilesInput: Locator;
  readonly singleUploadButton: Locator;
  readonly multipleUploadButton: Locator;

  constructor(page: Page) {
    this.singleFileInput = page.locator('#singleFileInput');
    this.multipleFilesInput = page.locator('#multipleFilesInput');
    this.singleUploadButton = page.getByRole('button', { name: 'Upload Single File', exact: true });
    this.multipleUploadButton = page.getByRole('button', { name: 'Upload Multiple Files', exact: true });
  }

  async selectedMultipleFileCount(): Promise<number> {
    return this.multipleFilesInput.evaluate((input) => (input as HTMLInputElement).files?.length ?? 0);
  }

  async selectSingleFile(filePath: string): Promise<void> {
    await this.singleFileInput.setInputFiles(filePath);
  }

  async selectMultipleFiles(filePaths: string[]): Promise<void> {
    await this.multipleFilesInput.setInputFiles(filePaths);
  }
}
