import { test, expect } from '@playwright/test';

test('Perform all mouse actions', async ({ page }) => {

    // ==================================================
    // 1. Left Click
    // ==================================================
    await page.goto('https://demoqa.com/buttons');

    await page.locator('text=Click Me').click();

    // ==================================================
    // 2. Double Click
    // ==================================================
    await page.getByText('Double Click').dblclick();

    await expect(page.locator('#doubleClickMessage')).toContainText('You have done a double click');

    // ==================================================
    // 3. Right Click
    // ==================================================
    await page.locator('#rightClickBtn').click({
        button: 'right'
    });

    await expect(page.locator('#rightClickMessage')).toContainText('You have done a right click');

    // ==================================================
    // 4. Click with Delay
    // ==================================================
    await page.locator('text=Click Me').click({delay: 500 });

    // ==================================================
    // 5. Triple Click
    // ==================================================
    await page.locator('text=Click Me').click({clickCount: 3});

    // ==================================================
    // 6. Hover
    // ==================================================
    await page.goto('https://the-internet.herokuapp.com/hovers');

    await page.locator('.figure').first().hover();

    await expect(page.getByText('name: user1')).toBeVisible();

    // ==================================================
    // 7. Drag & Drop
    // ==================================================
    await page.goto('https://demoqa.com/droppable');

    const source = page.locator('#draggable');
    const target = page.locator('#droppable');

    await source.dragTo(target);

    await expect(target).toContainText('Dropped!');

    // ==================================================
    // 8. Mouse Move
    // ==================================================
    await page.mouse.move(300, 300);

    await page.mouse.move(500, 300, {
        steps: 20
    });

    // ==================================================
    // 9. Mouse Down
    // ==================================================
    await page.mouse.down();

    // ==================================================
    // 10. Mouse Up
    // ==================================================
    await page.mouse.up();

    // ==================================================
    // 11. Manual Drag
    // ==================================================
    await page.mouse.move(200, 200);

    await page.mouse.down();

    await page.mouse.move(500, 200);

    await page.mouse.up();

    // ==================================================
    // 12. Mouse Wheel Scroll Down
    // ==================================================
    await page.mouse.wheel(0, 1000);

    // Scroll Up
    await page.mouse.wheel(0, -500);

    // ==================================================
    // 13. Click at Position
    // ==================================================
    await page.mouse.click(400, 300);

    // ==================================================
    // 14. Double Click using Mouse API
    // ==================================================
    await page.mouse.dblclick(400, 300);

    // ==================================================
    // 15. Hold Mouse Button
    // ==================================================
    await page.mouse.move(300, 300);

    await page.mouse.down();

    await page.waitForTimeout(1000);

    await page.mouse.up();

});