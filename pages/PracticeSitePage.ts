import type { Locator, Page } from '@playwright/test';

export const PRACTICE_SITE_URL = 'https://testautomationpractice.blogspot.com/';

export class PracticeSitePage {
  readonly page: Page;
  readonly playwrightPracticeLink: Locator;
  readonly hiddenAjaxLink: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.playwrightPracticeLink = page.getByRole('link', { name: 'PlaywrightPractice', exact: true });
    this.hiddenAjaxLink = page.getByRole('link', { name: 'Hidden Elements & AJAX', exact: true });
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true }).first();
  }

  async openHome(): Promise<void> {
    await this.page.goto(PRACTICE_SITE_URL, { waitUntil: 'domcontentloaded' });
  }

  async openPlaywrightPractice(): Promise<void> {
    await this.page.goto(`${PRACTICE_SITE_URL}p/playwrightpractice.html`, {
      waitUntil: 'domcontentloaded'
    });
  }

  async openHiddenAjax(): Promise<void> {
    await this.page.goto(`${PRACTICE_SITE_URL}p/gui-elements-ajax-hidden.html`, {
      waitUntil: 'domcontentloaded'
    });
  }

  async clickPlaywrightPracticeLink(): Promise<void> {
    await this.playwrightPracticeLink.click();
  }

  async clickHiddenAjaxLink(): Promise<void> {
    await this.hiddenAjaxLink.click();
  }

  async returnHome(): Promise<void> {
    await this.homeLink.click();
  }
}
