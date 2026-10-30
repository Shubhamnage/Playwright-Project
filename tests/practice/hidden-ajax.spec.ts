import { expect, test } from '@playwright/test';
import { HiddenAjaxPage } from '../../pages/HiddenAjaxPage';
import { PracticeSitePage } from '../../pages/PracticeSitePage';

test.beforeEach(async ({ page }) => {
  await new PracticeSitePage(page).openHiddenAjax();
});

test('AJAX-001 / AJAX-005: Reveal, interact with, and hide the second input', async ({ page }) => {
  const hiddenAjax = new HiddenAjaxPage(page);

  await expect(hiddenAjax.inputBox2).toBeHidden();
  await hiddenAjax.toggleInputBox2();
  await expect(hiddenAjax.inputBox2).toBeVisible();
  await hiddenAjax.fillInputBox2('visible test value');
  await expect(hiddenAjax.inputBox2).toHaveValue('visible test value');

  await hiddenAjax.toggleInputBox2();
  await expect(hiddenAjax.inputBox2).toBeHidden();
});

test('AJAX-002: Reveal and hide the second checkbox', async ({ page }) => {
  const hiddenAjax = new HiddenAjaxPage(page);

  await expect(hiddenAjax.checkbox2).toBeHidden();
  await hiddenAjax.toggleCheckbox2();
  await expect(hiddenAjax.checkbox2).toBeVisible();
  await hiddenAjax.checkCheckbox2();
  await expect(hiddenAjax.checkbox2).toBeChecked();

  await hiddenAjax.toggleCheckbox2();
  await expect(hiddenAjax.checkbox2).toBeHidden();
});

test('AJAX-003: Load asynchronous content and wait for nonempty content', async ({ page }) => {
  const hiddenAjax = new HiddenAjaxPage(page);

  await hiddenAjax.loadAjaxContent();
  await expect(hiddenAjax.ajaxContent).toBeVisible();
});
