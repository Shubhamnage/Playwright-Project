import { expect, test } from '@playwright/test';
import { PracticeSitePage } from '../../pages/PracticeSitePage';
import { PracticeWidgetsPage } from '../../pages/PracticeWidgetsPage';

test.beforeEach(async ({ page }) => {
  await new PracticeSitePage(page).openHome();
});

test('WIDGET-003: Handle the simple JavaScript alert', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  const dialog = await widgets.handleDialog(widgets.alertButton, 'accept');

  expect(dialog.type).toBe('alert');
  await expect(widgets.alertButton).toBeVisible();
});

test('WIDGET-004: Accept and dismiss the confirmation dialog', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  const accepted = await widgets.handleDialog(widgets.confirmButton, 'accept');
  const dismissed = await widgets.handleDialog(widgets.confirmButton, 'dismiss');

  expect(accepted.type).toBe('confirm');
  expect(dismissed.type).toBe('confirm');
});

test('WIDGET-005: Enter text into and cancel the prompt dialog', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  const accepted = await widgets.handleDialog(widgets.promptButton, 'accept', 'Playwright test');
  const dismissed = await widgets.handleDialog(widgets.promptButton, 'dismiss');

  expect(accepted.type).toBe('prompt');
  expect(dismissed.type).toBe('prompt');
});

test('WIDGET-006: Open a new browser tab and preserve the original page', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);
  const originalUrl = page.url();

  const newTab = await widgets.openNewTab();
  await newTab.waitForLoadState('domcontentloaded');

  expect(new URL(newTab.url()).protocol).toMatch(/^https?:$/);
  await newTab.close();
  await expect(page).toHaveURL(originalUrl);
});

test('WIDGET-008: Reveal the hover menu items', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  await widgets.hoverPointMe();

  await expect(widgets.mobilesMenuItem).toBeVisible();
  await expect(widgets.laptopsMenuItem).toBeVisible();
});

test('WIDGET-009: Copy the source text into the target input', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  await widgets.doubleClickCopyButton();

  await expect(widgets.copiedTextInput).toHaveValue('Hello World!');
});

test('WIDGET-010: Drag the source into the drop target', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  await widgets.dragSourceToTarget();

  await expect(widgets.dropTarget).toContainText('Dropped!');
});

test('WIDGET-011: Render the price range slider and its current value', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  await expect(widgets.slider).toBeVisible();
  await expect(widgets.sliderAmount).toHaveValue('$75 - $300');
});

test('WIDGET-012: Render the SVG examples', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  expect(await widgets.svgElements.count()).toBeGreaterThan(0);
  await expect(widgets.svgElements.first()).toBeVisible();
});

test('SHADOW-001: Locate visible content inside the Shadow DOM', async ({ page }) => {
  const widgets = new PracticeWidgetsPage(page);

  await expect(widgets.shadowMobiles).toBeVisible();
  await expect(widgets.shadowBlogLink).toHaveAttribute('href', 'https://www.pavantestingtools.com/');
});

test('WIDGET-015: Verify footer navigation and visitor display', async ({ page }) => {
  const site = new PracticeSitePage(page);
  const visitorsHeading = page.getByRole('heading', { name: 'Visitors', exact: true });

  await expect(site.hiddenAjaxLink).toHaveAttribute(
    'href',
    'https://testautomationpractice.blogspot.com/p/gui-elements-ajax-hidden.html'
  );
  await expect(visitorsHeading).toBeVisible();

  await site.clickHiddenAjaxLink();
  await expect(page).toHaveURL(/\/p\/gui-elements-ajax-hidden\.html$/);
});
