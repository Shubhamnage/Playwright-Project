import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // Location of test files
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only() in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Reporter
  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    // Read URL from .env
    baseURL: process.env.BASE_URL,

    // Run in headed mode
    headless: false,

    // Required for browser maximization
    viewport: null,

    // Launch browser maximized
    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 300
    },

    // Ignore SSL certificate errors
    ignoreHTTPSErrors: true,

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on failure
    video: 'retain-on-failure',

    // Capture trace on failure
    trace: 'retain-on-failure',

    // Timeouts
    actionTimeout: 30000,
    navigationTimeout: 30000
  },

  // Chrome project
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium'
      }
    }
  ],

  // Store test artifacts
  outputDir: 'test-results'
});