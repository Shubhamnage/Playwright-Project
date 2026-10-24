import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly loginHeading: Locator;
  readonly signupHeading: Locator;
  private readonly loginForm: Locator;
  private readonly signupForm: Locator;

  constructor(page: Page) {
    this.loginForm = page.locator('form[action="/login"]');
    this.signupForm = page.locator('form[action="/signup"]');
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginForm.locator('input[name="email"]').fill(email);
    await this.loginForm.locator('input[name="password"]').fill(password);
    await this.loginForm.getByRole('button', { name: 'Login', exact: true }).click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupForm.locator('input[name="name"]').fill(name);
    await this.signupForm.locator('input[name="email"]').fill(email);
    await this.signupForm.getByRole('button', { name: 'Signup', exact: true }).click();
  }

  getLoginError(): Locator {
    return this.loginForm.getByText('Your email or password is incorrect!', { exact: true });
  }

  getSignupError(): Locator {
    return this.signupForm.getByText('Email Address already exist!', { exact: true });
  }
}
