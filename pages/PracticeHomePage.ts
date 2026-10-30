import type { Locator, Page } from '@playwright/test';

export class PracticeHomePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly sundayCheckbox: Locator;
  readonly mondayCheckbox: Locator;
  readonly countrySelect: Locator;
  readonly colorsSelect: Locator;
  readonly animalsSelect: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;

  constructor(page: Page) {
    this.nameInput = page.getByPlaceholder('Enter Name');
    this.emailInput = page.getByPlaceholder('Enter EMail');
    this.phoneInput = page.getByPlaceholder('Enter Phone');
    this.addressInput = page.getByLabel('Address:');
    this.maleRadio = page.getByLabel('Male', { exact: true });
    this.femaleRadio = page.getByLabel('Female', { exact: true });
    this.sundayCheckbox = page.getByLabel('Sunday', { exact: true });
    this.mondayCheckbox = page.getByLabel('Monday', { exact: true });
    this.countrySelect = page.getByLabel('Country:', { exact: true });
    this.colorsSelect = page.getByLabel('Colors:', { exact: true });
    this.animalsSelect = page.getByLabel('Sorted List:', { exact: true });
    this.startDateInput = page.locator('#start-date');
    this.endDateInput = page.locator('#end-date');
  }

  async fillContactDetails(name: string, email: string, phone: string, address: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.addressInput.fill(address);
  }

  async selectGender(gender: 'male' | 'female'): Promise<void> {
    await (gender === 'male' ? this.maleRadio : this.femaleRadio).check();
  }

  async selectDays(days: Array<'sunday' | 'monday'>): Promise<void> {
    for (const [day, checkbox] of [
      ['sunday', this.sundayCheckbox],
      ['monday', this.mondayCheckbox]
    ] as const) {
      if (days.includes(day)) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
    }
  }

  async selectCountry(label: string): Promise<void> {
    await this.countrySelect.selectOption({ label });
  }

  async selectColors(labels: string[]): Promise<void> {
    await this.colorsSelect.selectOption(labels.map((label) => ({ label })));
  }

  async setDateRange(start: string, end: string): Promise<void> {
    await this.startDateInput.fill(start);
    await this.endDateInput.fill(end);
  }

  async selectAnimalBoundaryOptions(): Promise<string[]> {
    const options = this.animalsSelect.locator('option');
    const optionCount = await options.count();

    if (optionCount < 2) {
      throw new Error(`Expected at least two animal options, found ${optionCount}`);
    }

    const firstValue = await options.first().getAttribute('value');
    const lastValue = await options.last().getAttribute('value');

    if (firstValue === null || lastValue === null) {
      throw new Error('Animal options must expose values to select them reliably');
    }

    await this.animalsSelect.selectOption([firstValue, lastValue]);
    return this.animalsSelect.locator('option:checked').allTextContents();
  }

  async selectedColorLabels(): Promise<string[]> {
    return this.colorsSelect.locator('option:checked').allTextContents();
  }
}
