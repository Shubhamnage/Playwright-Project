import type { Locator, Page } from '@playwright/test';

export class PlaywrightLocatorExamplesPage {
  readonly primaryActionButton: Locator;
  readonly primaryActionText: Locator;
  readonly usernameByLabel: Locator;
  readonly fullNameByPlaceholder: Locator;
  readonly submitButtons: Locator;
  readonly missingButton: Locator;
  readonly logoByAltText: Locator;
  readonly homeLinkByTitle: Locator;
  readonly userProfileByTestId: Locator;

  constructor(page: Page) {
    this.primaryActionButton = page.getByRole('button', { name: 'Primary Action', exact: true });
    this.primaryActionText = page.getByText('Primary Action', { exact: true });
    this.usernameByLabel = page.getByLabel('Username:', { exact: true });
    this.fullNameByPlaceholder = page.getByPlaceholder('Enter your full name', { exact: true });
    this.submitButtons = page.getByRole('button', { name: 'Submit', exact: true });
    this.missingButton = page.getByRole('button', { name: 'No such practice button', exact: true });
    this.logoByAltText = page.getByAltText('logo image', { exact: true });
    this.homeLinkByTitle = page.getByTitle('Home page link', { exact: true });
    this.userProfileByTestId = page.getByTestId('user-profile-card');
  }
}
