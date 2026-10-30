import type { Locator, Page } from '@playwright/test';

export class PracticeWidgetsPage {
  readonly page: Page;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly newTabButton: Locator;
  readonly pointMeButton: Locator;
  readonly mobilesMenuItem: Locator;
  readonly laptopsMenuItem: Locator;
  readonly copyTextButton: Locator;
  readonly copiedTextInput: Locator;
  readonly dragSource: Locator;
  readonly dropTarget: Locator;
  readonly slider: Locator;
  readonly sliderAmount: Locator;
  readonly svgElements: Locator;
  readonly shadowHost: Locator;
  readonly shadowMobiles: Locator;
  readonly shadowBlogLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertButton = page.getByRole('button', { name: 'Simple Alert', exact: true });
    this.confirmButton = page.getByRole('button', { name: 'Confirmation Alert', exact: true });
    this.promptButton = page.getByRole('button', { name: 'Prompt Alert', exact: true });
    this.newTabButton = page.getByRole('button', { name: 'New Tab', exact: true });
    this.pointMeButton = page.getByRole('button', { name: 'Point Me', exact: true });
    this.mobilesMenuItem = page.getByRole('link', { name: 'Mobiles', exact: true });
    this.laptopsMenuItem = page.getByRole('link', { name: 'Laptops', exact: true });
    this.copyTextButton = page.getByRole('button', { name: 'Copy Text', exact: true });
    this.copiedTextInput = page.locator('#field2');
    this.dragSource = page.locator('#draggable');
    this.dropTarget = page.locator('#droppable');
    this.slider = page.locator('#slider-range');
    this.sliderAmount = page.locator('#amount');
    this.svgElements = page.locator('svg');
    this.shadowHost = page.locator('#shadow_host');
    this.shadowMobiles = this.shadowHost.getByText('Mobiles', { exact: true });
    this.shadowBlogLink = this.shadowHost.getByRole('link', { name: 'Blog', exact: true });
  }

  async handleDialog(
    button: Locator,
    action: 'accept' | 'dismiss',
    promptText?: string
  ): Promise<{ type: string; message: string }> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = button.click();
    const dialog = await dialogPromise;
    const result = { type: dialog.type(), message: dialog.message() };

    if (action === 'accept') {
      await dialog.accept(promptText);
    } else {
      await dialog.dismiss();
    }

    await clickPromise;
    return result;
  }

  async openNewTab(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.newTabButton.click();
    return popupPromise;
  }

  async doubleClickCopyButton(): Promise<void> {
    await this.copyTextButton.dblclick();
  }

  async hoverPointMe(): Promise<void> {
    await this.pointMeButton.hover();
  }

  async dragSourceToTarget(): Promise<void> {
    await this.dragSource.dragTo(this.dropTarget);
  }
}
