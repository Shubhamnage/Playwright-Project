import type { Page } from '@playwright/test';
import testData from '../test-data/automationexercise.json';

export class HomePage {
  constructor(private readonly page: Page) {}

  async navigateToHome(): Promise<void> {
    await this.page.goto(testData.application.baseUrl, { waitUntil: 'domcontentloaded' });
  }

  async navigateToLogin(): Promise<void> {
    await this.page.getByRole('link', { name: /Signup \/ Login/ }).click();
  }
}
