import type { Locator, Page } from '@playwright/test';

export class HiddenAjaxPage {
  readonly hiddenElementsContainer: Locator;
  readonly inputBox2: Locator;
  readonly checkbox2: Locator;
  readonly toggleInputButton: Locator;
  readonly toggleCheckboxButton: Locator;
  readonly loadContentButton: Locator;
  readonly ajaxContent: Locator;

  constructor(page: Page) {
    this.hiddenElementsContainer = page.locator('#container');
    this.inputBox2 = this.hiddenElementsContainer.locator('#input2');
    this.checkbox2 = this.hiddenElementsContainer.locator('#checkbox2');
    this.toggleInputButton = this.hiddenElementsContainer.getByRole('button', {
      name: 'Toggle Input Box 2',
      exact: true
    });
    this.toggleCheckboxButton = this.hiddenElementsContainer.getByRole('button', {
      name: 'Toggle Checkbox 2',
      exact: true
    });
    this.loadContentButton = this.hiddenElementsContainer.getByRole('button', {
      name: 'Load AJAX Content',
      exact: true
    });
    this.ajaxContent = this.hiddenElementsContainer.getByRole('heading', {
      name: 'AJAX Content Loaded',
      exact: true
    });
  }

  async toggleInputBox2(): Promise<void> {
    await this.toggleInputButton.click();
  }

  async fillInputBox2(value: string): Promise<void> {
    await this.inputBox2.fill(value);
  }

  async toggleCheckbox2(): Promise<void> {
    await this.toggleCheckboxButton.click();
  }

  async checkCheckbox2(): Promise<void> {
    await this.checkbox2.check();
  }

  async loadAjaxContent(): Promise<void> {
    await this.loadContentButton.click();
  }
}
