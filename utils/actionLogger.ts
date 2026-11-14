import logger from './logger';

const instrumentedObjects = new WeakSet<object>();

// Locator methods that perform UI actions
const locatorActions = [
    'click',
    'dblclick',
    'tap',
    'fill',
    'clear',
    'type',
    'press',
    'pressSequentially',
    'check',
    'uncheck',
    'setChecked',
    'selectOption',
    'selectText',
    'hover',
    'focus',
    'blur',
    'dragTo',
    'scrollIntoViewIfNeeded',
    'screenshot',
    'waitFor',
    'dispatchEvent'
];

// Methods that return another Locator
const locatorFactories = [
    'locator',
    'getByRole',
    'getByText',
    'getByLabel',
    'getByPlaceholder',
    'getByTestId',
    'getByAltText',
    'getByTitle',
    'filter',
    'nth',
    'first',
    'last',
    'and',
    'or'
];

// Page methods that return a Locator
const pageLocatorFactories = [
    'locator',
    'getByRole',
    'getByText',
    'getByLabel',
    'getByPlaceholder',
    'getByTestId',
    'getByAltText',
    'getByTitle'
];

// Page methods that perform navigation or waiting
const pageActions = [
    'goto',
    'reload',
    'goBack',
    'goForward',
    'waitForURL',
    'waitForLoadState'
];

function getDescription(target: any): string {
    try {
        return target.toString();
    } catch {
        return 'Playwright element';
    }
}

function logAction(
    target: any,
    method: string,
    originalMethod: Function
) {
    const description = getDescription(target);

    return async (...args: any[]) => {
        // Do not write entered text or credentials into logs
        const detail =
            ['fill', 'type', 'pressSequentially', 'selectOption'].includes(method)
                ? ' [input value omitted]'
                : '';

        logger.info(`ACTION STARTED: ${method} | ${description}${detail}`);

        try {
            const result = await originalMethod(...args);

            logger.info(`ACTION PASSED: ${method} | ${description}`);

            return result;

        } catch (error) {
            logger.error(`ACTION FAILED: ${method} | ${description}`);

            if (error instanceof Error) {
                logger.error(`ACTION EXCEPTION: ${error.message}`);
            } else {
                logger.error(`ACTION EXCEPTION: ${String(error)}`);
            }

            throw error;
        }
    };
}

function instrumentLocator(locator: any): any {
    if (!locator || typeof locator !== 'object') {
        return locator;
    }

    if (instrumentedObjects.has(locator)) {
        return locator;
    }

    instrumentedObjects.add(locator);

    // Instrument actions such as click, fill, hover, etc.
    for (const method of locatorActions) {
        if (typeof locator[method] !== 'function') continue;

        const originalMethod = locator[method].bind(locator);

        locator[method] = logAction(
            locator,
            method,
            originalMethod
        );
    }

    // Instrument methods that create another Locator
    for (const method of locatorFactories) {
        if (typeof locator[method] !== 'function') continue;

        const originalMethod = locator[method].bind(locator);

        locator[method] = (...args: any[]) => {
            const result = originalMethod(...args);

            return instrumentLocator(result);
        };
    }

    return locator;
}

function instrumentFrameLocator(frameLocator: any): any {
    if (!frameLocator || typeof frameLocator !== 'object') {
        return frameLocator;
    }

    if (instrumentedObjects.has(frameLocator)) {
        return frameLocator;
    }

    instrumentedObjects.add(frameLocator);

    for (const method of [
        'locator',
        'getByRole',
        'getByText',
        'getByLabel',
        'getByPlaceholder',
        'getByTestId'
    ]) {
        if (typeof frameLocator[method] !== 'function') continue;

        const originalMethod = frameLocator[method].bind(frameLocator);

        frameLocator[method] = (...args: any[]) => {
            return instrumentLocator(originalMethod(...args));
        };
    }

    return frameLocator;
}

export function installActionLogger(page: any): void {

    // Capture page navigation and waiting actions
    for (const method of pageActions) {
        if (typeof page[method] !== 'function') continue;

        const originalMethod = page[method].bind(page);

        page[method] = logAction(page, method, originalMethod);
    }

    // Automatically instrument locators created from page
    for (const method of pageLocatorFactories) {
        if (typeof page[method] !== 'function') continue;

        const originalMethod = page[method].bind(page);

        page[method] = (...args: any[]) => {
            return instrumentLocator(originalMethod(...args));
        };
    }

    // Support iframe locators
    if (typeof page.frameLocator === 'function') {
        const originalFrameLocator = page.frameLocator.bind(page);

        page.frameLocator = (...args: any[]) => {
            return instrumentFrameLocator(originalFrameLocator(...args));
        };
    }
}