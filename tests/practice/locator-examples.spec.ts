import { expect, test } from '@playwright/test';
import { PlaywrightLocatorExamplesPage } from '../../pages/PlaywrightLocatorExamplesPage';
import { PracticeSitePage } from '../../pages/PracticeSitePage';

test.beforeEach(async ({ page }) => {
  await new PracticeSitePage(page).openPlaywrightPractice();
});

test('PW-LOC-001: Locate the primary action by role and accessible name', async ({ page }) => {
  const examples = new PlaywrightLocatorExamplesPage(page);

  await expect(examples.primaryActionButton).toBeVisible();
  await expect(examples.primaryActionButton).toHaveCount(1);
});

test('PW-LOC-003: Locate unique visible text exactly', async ({ page }) => {
  const examples = new PlaywrightLocatorExamplesPage(page);

  await expect(examples.primaryActionText).toBeVisible();
  await expect(examples.primaryActionText).toHaveCount(1);
});

test('PW-LOC-004: Resolve the username textbox by its associated label', async ({ page }) => {
  const examples = new PlaywrightLocatorExamplesPage(page);

  await expect(examples.usernameByLabel).toBeVisible();
  await expect(examples.usernameByLabel).toHaveCount(1);
});

test('PW-LOC-005: Resolve the full-name textbox by its placeholder', async ({ page }) => {
  const examples = new PlaywrightLocatorExamplesPage(page);

  await expect(examples.fullNameByPlaceholder).toBeVisible();
  await expect(examples.fullNameByPlaceholder).toHaveCount(1);
});

test('PW-LOC-006: Resolve elements by alt text and title', async ({ page }) => {
  const examples = new PlaywrightLocatorExamplesPage(page);

  await expect(examples.logoByAltText).toBeVisible();
  await expect(examples.homeLinkByTitle).toBeVisible();
  await expect(examples.logoByAltText).toHaveCount(1);
});

test('PW-LOC-007: Resolve the user profile by test ID', async ({ page }) => {
  const examples = new PlaywrightLocatorExamplesPage(page);

  await expect(examples.userProfileByTestId).toBeVisible();
  await expect(examples.userProfileByTestId).toHaveCount(1);
});

test('PW-LOC-008: Detect missing and repeated button names without clicking ambiguously', async ({ page }) => {
  const examples = new PlaywrightLocatorExamplesPage(page);

  await expect(examples.missingButton).toHaveCount(0);
  expect(await examples.submitButtons.count()).toBeGreaterThan(1);
});
