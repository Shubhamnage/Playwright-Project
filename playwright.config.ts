
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
    ['html', { open: 'never' }],
    ['list']
  ],

  // Store test artifacts
  outputDir: 'test-results',

  use: {

    // Read URL from .env
    baseURL: process.env.BASE_URL,

    // Headless in CI, headed locally
    headless: !!process.env.CI,

    // Browser viewport
    viewport: process.env.CI
      ? { width: 1280, height: 720 }
      : null,

    // Browser launch options
    launchOptions: {
      args: process.env.CI ? [] : ['--start-maximized'],
      slowMo: process.env.CI ? 0 : 300
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

  // Browser projects
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome'
      }
    }
  ],

});
