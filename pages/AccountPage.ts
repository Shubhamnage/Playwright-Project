import type { Dialog, Locator, Page } from '@playwright/test';

export class AccountPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  loggedInAs(name: string): Locator {
    return this.page.getByText(`Logged in as ${name}`);
  }

  get deleteAccountLink(): Locator {
    return this.page.locator('a[href="/delete_account"]');
  }

  async deleteAccount(): Promise<void> {
    const acceptConfirmation = async (dialog: Dialog): Promise<void> => {
      await dialog.accept();
    };

    this.page.on('dialog', acceptConfirmation);
    try {
      await this.deleteAccountLink.click();
    } finally {
      this.page.off('dialog', acceptConfirmation);
    }
  }

  async logout(): Promise<void> {
    await this.page.locator('a[href="/logout"]').click();
  }
}
