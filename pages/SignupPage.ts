import type { Locator, Page } from '@playwright/test';
import type { TestUser } from '../utils/test-users';

export class SignupPage {
  readonly accountInformationHeading: Locator;
  readonly accountCreatedHeading: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.accountInformationHeading = page.getByRole('heading', { name: 'ENTER ACCOUNT INFORMATION' });
    this.accountCreatedHeading = page.getByRole('heading', { name: 'Account Created!' });
  }

  async completeRegistration(user: TestUser): Promise<void> {
    const { registrationDetails } = user;
    const genderSelector = registrationDetails.gender === 'male' ? '#id_gender1' : '#id_gender2';

    await this.page.locator(genderSelector).check();
    await this.page.locator('#password').fill(user.password);
    await this.page.locator('#days').selectOption(registrationDetails.birthDate.day);
    await this.page.locator('#months').selectOption(registrationDetails.birthDate.month);
    await this.page.locator('#years').selectOption(registrationDetails.birthDate.year);

    if (registrationDetails.newsletter) {
      await this.page.locator('#newsletter').check();
    }
    if (registrationDetails.specialOffers) {
      await this.page.locator('#optin').check();
    }

    await this.page.locator('#first_name').fill(registrationDetails.firstName);
    await this.page.locator('#last_name').fill(registrationDetails.lastName);
    await this.page.locator('#company').fill(registrationDetails.company);
    await this.page.locator('#address1').fill(registrationDetails.address1);
    await this.page.locator('#address2').fill(registrationDetails.address2);
    await this.page.locator('#country').selectOption(registrationDetails.country);
    await this.page.locator('#state').fill(registrationDetails.state);
    await this.page.locator('#city').fill(registrationDetails.city);
    await this.page.locator('#zipcode').fill(registrationDetails.zipcode);
    await this.page.locator('#mobile_number').fill(registrationDetails.mobileNumber);
    await this.page.getByRole('button', { name: 'Create Account', exact: true }).click();
  }

  async continue(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
