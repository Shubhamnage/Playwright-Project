import { expect, test } from '@playwright/test';
import { PracticeSitePage } from '../../pages/PracticeSitePage';

test('NAV-001: Navigate from Home to PlaywrightPractice', async ({ page }) => {
  const site = new PracticeSitePage(page);

  await site.openHome();
  await expect(page).toHaveTitle('Automation Testing Practice');
  await site.clickPlaywrightPracticeLink();

  await expect(page).toHaveURL(/\/p\/playwrightpractice\.html$/);
  await expect(page).toHaveTitle('Automation Testing Practice: PlaywrightPractice');
  await expect(page.getByRole('heading', { name: 'PlaywrightPractice', exact: true })).toBeVisible();
});

test('NAV-002: Navigate from Home to Hidden Elements & AJAX', async ({ page }) => {
  const site = new PracticeSitePage(page);

  await site.openHome();
  await site.clickHiddenAjaxLink();

  await expect(page).toHaveURL(/\/p\/gui-elements-ajax-hidden\.html$/);
  await expect(page).toHaveTitle('Automation Testing Practice: Hidden Elements & AJAX');
  await expect(page.getByRole('heading', { name: 'Hidden Elements & AJAX', exact: true })).toBeVisible();
});

test('NAV-003: Return Home from each practice page', async ({ page }) => {
  const site = new PracticeSitePage(page);

  await site.openPlaywrightPractice();
  await site.returnHome();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/);
  await expect(page).toHaveTitle('Automation Testing Practice');

  await site.openHiddenAjax();
  await site.returnHome();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/);
  await expect(page).toHaveTitle('Automation Testing Practice');
});
