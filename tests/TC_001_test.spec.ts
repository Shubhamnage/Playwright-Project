import { test, expect } from '../fixtures/baseTest';

test('Perform all mouse actions', async ({ page }) => {

    // ==================================================
    // 1. Left Click
    // ==================================================

    await page.goto('https://demoqa.com/buttons');


    await page.getByText('Click Me', { exact: true }).click();

    // ==================================================
    // 2. Double Click
    // ==================================================
    await page.locator("//button[text()='Double Click Me']").dblclick();

    await expect(page.locator("//div//p[text()='You have done a double click']")).toContainText('You have done a double click');

    // ==================================================
    // 3. Right Click
    // ==================================================
    await page.locator("//button[text()='Right Click Me']").click({ button: 'right' });

    await expect(page.locator("//div//p[text()='You have done a right click']")).toContainText('You have done a right click');

    // ==================================================
    // 4. Click with Delay
    // ==================================================
    await page.locator("//button[text()='Click Me']").click({ delay: 500 });

    // ==================================================
    // 5. Triple Click
    // ==================================================
    await page.locator("//button[text()='Click Me']").click({ clickCount: 3 });

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

    // const source = page.locator("//div[@id='draggable']");
    // const target = page.locator("//p[text()='Drop Here']/parent::div");
    await page.waitForTimeout(1000);
    const dropvalue = page.locator("//p[text()='Dropped!']");

    await page.locator("//div[@id='draggable']").dragTo(page.locator("//p[text()='Drop Here']/parent::div"));

    await expect(dropvalue).toContainText('Dropped!');

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