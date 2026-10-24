import { expect, test, type Page } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { createInvalidLoginEmail, createTestUser, invalidLoginPassword, type TestUser } from '../utils/test-users';

test.setTimeout(180_000);

test.beforeEach(async ({ page }) => {
  const adClose = page.getByText('Close', { exact: true });
  await page.addLocatorHandler(adClose, async () => {
    await adClose.click();
  });
});

async function openLoginPage(page: Page): Promise<LoginPage> {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await expect(page).toHaveTitle('Automation Exercise');
  await homePage.navigateToLogin();

  const loginPage = new LoginPage(page);
  await expect(loginPage.loginHeading).toBeVisible();
  return loginPage;
}

async function expectLoggedIn(page: Page, user: TestUser): Promise<void> {
  const accountPage = new AccountPage(page);
  await expect(accountPage.loggedInAs(user.name)).toBeVisible();
  await expect(accountPage.deleteAccountLink).toBeVisible();
}

async function registerAccount(page: Page, user: TestUser): Promise<void> {
  const loginPage = await openLoginPage(page);
  await expect(loginPage.signupHeading).toBeVisible();
  await loginPage.signup(user.name, user.email);

  const signupPage = new SignupPage(page);
  await expect(signupPage.accountInformationHeading).toBeVisible();
  await signupPage.completeRegistration(user);
  await expect(signupPage.accountCreatedHeading).toBeVisible();
  await signupPage.continue();

  // Continue can be interrupted by a third-party interstitial; returning home restores the app flow.
  await new HomePage(page).navigateToHome();
  await expectLoggedIn(page, user);
}

async function deleteCurrentAccount(page: Page): Promise<void> {
  await new AccountPage(page).deleteAccount();
  await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
}

async function logOut(page: Page): Promise<void> {
  await new AccountPage(page).logout();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
}

test.describe('Automation Exercise Test Cases', () => {
  test('Test Case 1: Register User', async ({ page }) => {
    const user = createTestUser();
    await registerAccount(page, user);
    await deleteCurrentAccount(page);
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const user = createTestUser();
    await registerAccount(page, user);
    await logOut(page);

    const loginPage = new LoginPage(page);
    await loginPage.login(user.email, user.password);
    await expectLoggedIn(page, user);
    await deleteCurrentAccount(page);
  });

  test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    const loginPage = await openLoginPage(page);
    await loginPage.login(createInvalidLoginEmail(), invalidLoginPassword);

    await expect(loginPage.getLoginError()).toBeVisible();
    await expect(loginPage.loginHeading).toBeVisible();
  });

  test('Test Case 4: Logout User', async ({ page }) => {
    const user = createTestUser();
    await registerAccount(page, user);
    await logOut(page);

    const loginPage = new LoginPage(page);
    await loginPage.login(user.email, user.password);
    await expectLoggedIn(page, user);
    await logOut(page);

    const loginAgainPage = new LoginPage(page);
    await loginAgainPage.login(user.email, user.password);
    await expectLoggedIn(page, user);
    await deleteCurrentAccount(page);
  });

  test('Test Case 5: Register User with existing email', async ({ page }) => {
    const user = createTestUser();
    await registerAccount(page, user);
    await logOut(page);

    const loginPage = new LoginPage(page);
    await expect(loginPage.signupHeading).toBeVisible();
    await loginPage.signup(user.name, user.email);

    await expect(loginPage.getSignupError()).toBeVisible();

    const loginAgainPage = new LoginPage(page);
    await loginAgainPage.login(user.email, user.password);
    await expectLoggedIn(page, user);
    await deleteCurrentAccount(page);
  });
});
