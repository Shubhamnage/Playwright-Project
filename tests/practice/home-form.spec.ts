import { expect, test } from '@playwright/test';
import contactData from '../../test-data/practice-site.json';
import { PracticeHomePage } from '../../pages/PracticeHomePage';
import { PracticeSitePage } from '../../pages/PracticeSitePage';

test.beforeEach(async ({ page }) => {
  await new PracticeSitePage(page).openHome();
});

test('HOME-001: Enter valid contact details and retain the entered values', async ({ page }) => {
  const form = new PracticeHomePage(page);
  const { name, email, phone, address } = contactData.contact;

  await form.fillContactDetails(name, email, phone, address);

  await expect(form.nameInput).toHaveValue(name);
  await expect(form.emailInput).toHaveValue(email);
  await expect(form.phoneInput).toHaveValue(phone);
  await expect(form.addressInput).toHaveValue(address);
});

test('HOME-002: A blank name fails the observed required-field constraint', async ({ page }) => {
  const form = new PracticeHomePage(page);

  await expect(form.nameInput).toHaveAttribute('required', '');
  await expect.poll(() => form.nameInput.evaluate((input: HTMLInputElement) => input.checkValidity())).toBe(false);
});

test('HOME-004: Select either gender radio option', async ({ page }) => {
  const form = new PracticeHomePage(page);

  await form.selectGender('male');
  await expect(form.maleRadio).toBeChecked();
  await expect(form.femaleRadio).not.toBeChecked();

  await form.selectGender('female');
  await expect(form.femaleRadio).toBeChecked();
  await expect(form.maleRadio).not.toBeChecked();
});

test('HOME-005: Select and deselect independent day checkboxes', async ({ page }) => {
  const form = new PracticeHomePage(page);

  await form.selectDays(['sunday', 'monday']);
  await expect(form.sundayCheckbox).toBeChecked();
  await expect(form.mondayCheckbox).toBeChecked();

  await form.selectDays(['monday']);
  await expect(form.sundayCheckbox).not.toBeChecked();
  await expect(form.mondayCheckbox).toBeChecked();
});

test('HOME-006: Change the country selection', async ({ page }) => {
  const form = new PracticeHomePage(page);

  await form.selectCountry('Canada');

  await expect(form.countrySelect).toHaveValue('canada');
});

test('HOME-007: Select and clear multiple colors', async ({ page }) => {
  const form = new PracticeHomePage(page);

  await form.selectColors(['Red', 'Blue']);
  expect((await form.selectedColorLabels()).map((label) => label.trim())).toEqual(['Red', 'Blue']);

  await form.selectColors(['Blue']);
  expect((await form.selectedColorLabels()).map((label) => label.trim())).toEqual(['Blue']);
});

test('HOME-008: Select the first and last animal options', async ({ page }) => {
  const form = new PracticeHomePage(page);

  const selectedLabels = (await form.selectAnimalBoundaryOptions()).map((label) => label.trim());

  expect(selectedLabels).toHaveLength(2);
  expect(selectedLabels[0]).not.toBe(selectedLabels[1]);
});

test('HOME-010: Set an ordered date range using native date inputs', async ({ page }) => {
  const form = new PracticeHomePage(page);

  await form.setDateRange(contactData.dateRange.start, contactData.dateRange.end);

  await expect(form.startDateInput).toHaveValue(contactData.dateRange.start);
  await expect(form.endDateInput).toHaveValue(contactData.dateRange.end);
});
