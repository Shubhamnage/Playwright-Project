import { test as base, expect } from '@playwright/test';
import logger from '../utils/logger';
import { installActionLogger } from '../utils/actionLogger';

export const test = base;

test.beforeEach(async ({ page }, testInfo) => {

    logger.info('==========================================');
    logger.info(`UI TEST STARTED: ${testInfo.title}`);
    logger.info(`BROWSER: ${testInfo.project.name}`);
    logger.info(`WORKER: ${testInfo.workerIndex}`);
    logger.info(`RETRY: ${testInfo.retry}`);

    // Automatically capture Playwright actions
    installActionLogger(page);

    // Capture main page navigation
    page.on('framenavigated', frame => {
        if (frame === page.mainFrame()) {
            logger.info(`UI NAVIGATION: ${frame.url()}`);
        }
    });

    // Capture uncaught JavaScript errors
    page.on('pageerror', error => {
        logger.error(`UI JAVASCRIPT ERROR: ${error.message}`);
    });
});

test.afterEach(async ({ }, testInfo) => {

    if (testInfo.status === 'passed') {
        logger.info(`UI TEST PASSED: ${testInfo.title}`);
    } else if (testInfo.status === 'failed') {
        logger.error(`UI TEST FAILED: ${testInfo.title}`);
    } else {
        logger.warn(`UI TEST STATUS: ${testInfo.status}`);
    }

    logger.info(`EXECUTION TIME: ${testInfo.duration} ms`);

    if (testInfo.error) {
        logger.error(
            `ERROR DETAILS: ${testInfo.error.stack || testInfo.error.message}`
        );
    }

    logger.info('==========================================');
});

export { expect };