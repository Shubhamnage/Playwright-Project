import { test, expect } from '../fixtures/baseTest';
import { ok } from "assert";
import { count } from "console";
//import 'dotenv'import { config } from "dotenv";
import * as dotenv from 'dotenv';
dotenv.config();
try {

    test.describe("Validating few scenarios", async () => {

        test("TC01:-Validating the mutiple click button and skip button @regression", async ({ page }) => {

            await page.goto("https://www.automationexercise.com");
            await expect(page).toHaveTitle('Automation Exercise');
            // 1. ROUTING FOR UI: Block Google Ad scripts so they never render on the UI
            await page.route('**/*googleads*', route => route.abort());

            //   await page.pause();
            //await page.waitForTimeout(2000);
            await page.getByRole('link', { name: 'Home' }).click();

            //handling the add using below code 
            const closeButton = page.locator('iframe[name="aswift_3"]').contentFrame().getByRole('button', { name: 'Close ad' });
            if (await closeButton.isVisible()) {
                page.waitForTimeout(2000);
                await closeButton.click()
            } else {
                console.log("Close button is not visible");
            }
            //used to click multiple elemt or Hanlde mutiple ement 
            const PageMenu = page.locator("//div[@class='shop-menu pull-right']//following-sibling::ul//li");
            const count = await PageMenu.count();

            for (let i = 0; i < count; i++) {
                const Menu = await PageMenu.nth(i).innerText();
                // if we need to skip elemt that time we can used this contine 
                if (Menu.includes("Video Tutorials")) {
                    console.log("Skiped:-", Menu);
                    continue;
                }
                await PageMenu.nth(i).click();
            }

        });
        test('TC002:-Handleing the alert Pop-up ', async ({ page }) => {

            await page.goto("https://testautomationpractice.blogspot.com/");
            await expect(page).toHaveTitle('Automation Testing Practice')
            await expect(page).toHaveURL(process.env.URL!)
            //await page.pause()

            const SimpleAlert = await page.getByRole('button', { name: 'Simple Alert' });
            SimpleAlert.scrollIntoViewIfNeeded();
            //handle 3 Alert pop up window 
            page.on('dialog', async (dailog) => {

                if (dailog.type() === "prompt") {

                    dailog.accept('Shubham')
                }
                else {
                    console.log(dailog.message());
                    dailog.accept();
                }
            })
            await SimpleAlert.click();
            await page.getByRole('button', { name: 'Confirmation Alert' }).click();
            await page.getByRole('button', { name: 'Prompt Alert' }).click();
            const msg = page.getByText('Hello Shubham! How are you today?', { exact: true });
            // const value = await msg.innerText();
            // console.log(value);
            await expect(page.locator("//p[@id='demo']")).toHaveText('Hello Shubham! How are you today?');
        });
        test("TC003:-Validating few scenarios ", async ({ page }) => {
            await page.goto("https://testautomationpractice.blogspot.com/");
            // await page.getByRole('button', { name: 'PlaywrightPractice' }).click();

            await page.getByRole('checkbox', { name: 'Sunday' }).scrollIntoViewIfNeeded();
            const days = page.locator("//label[text()='Days:']//following-sibling::div/input")
            const count = await days.count();
            for (let i = 0; i < count; i++) {
                await days.nth(i).check();
            }
            for (let j = count - 1; j >= 0; j--) {
                await days.nth(j).uncheck();

            }
            await page.getByRole("combobox", { name: 'Country:' }).selectOption({ label: 'India' });


        })
        test("TC004:-Validating below scenarios ", async ({ page }) => {
            await test.step("Handling the daynamic element", async () => {
                await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");
                // Dynamic Button
                await page.getByRole('button', { name: 'START' }).click();
            });
            await test.step("Handling Mouse Hover", async () => {
                // Mouse Hover
                const Maction = await page.getByRole('button', { name: 'Point Me' });
                await Maction.scrollIntoViewIfNeeded();
                await Maction.hover();
                const devices = await page.locator("//div[@class='dropdown']//div[@class='dropdown-content']//a");
                const Count = await devices.count();
                for (let i = 0; i < Count; i++) {
                    await devices.nth(i).hover();
                }
            })
            // Double Click
            await test.step("Handling Double Click", async () => {
                const Field1 = await page.locator("//input[@id='field1']");

                const Copy_text = await page.getByRole('button', { name: 'Copy Text' });

                await Field1.click();
                await Field1.clear();
                await Field1.fill("Shubham");
                await page.keyboard.press('Control+A');
                await page.keyboard.press('Control+C');
                await Copy_text.dblclick();
            });

            // Drag and drop
            await test.step("Handling Drag and drop", async () => {

                const Drag1 = await page.getByText('Drag me to my target', { exact: true });
                const DragTo = await page.getByText('Drop here', { exact: true });
                await Drag1.dragTo(DragTo);
            });

            //drop-down
            await test.step('Handle Scrolling Dropdown', async () => {

                // await page.getByText('Scrolling DropDown', { exact: true })
                //     .scrollIntoViewIfNeeded();

                // //    await page.waitForTimeout(1000);

                // await page.getByPlaceholder('Select an item').click();

                // await page.getByText('Item 6', { exact: true }).click();

                await page.getByText('Scrolling DropDown', { exact: true }).scrollIntoViewIfNeeded();

                await page.getByPlaceholder('Select an item').click();

                await page.getByText('Item 6', { exact: true }).click();

            });






        });
        test('TC005:-Set both slider values from variables', async ({ page }) => {

            await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

            const sliders = page.locator("//div[@id='slider-range']//span");
            await expect(sliders).toHaveCount(2);

            const value1 = 100;
            const value2 = 350;
            const sliderMinValue = 0;
            const sliderMaxValue = 500;
            expect(value1).toBeLessThanOrEqual(value2);
            expect(value1).toBeGreaterThanOrEqual(sliderMinValue);
            expect(value2).toBeLessThanOrEqual(sliderMaxValue);

            const slider = page.locator('#slider-range');
            const minSlider = sliders.nth(0);
            const maxSlider = sliders.nth(1);
            const amount = page.locator('#amount');
            const displayedValues = (await amount.inputValue()).match(/\d+/g);
            expect(displayedValues).not.toBeNull();
            expect(displayedValues).toHaveLength(2);

            const currentMin = Number(displayedValues![0]);
            const currentMax = Number(displayedValues![1]);
            const setHandleValue = async (
                handle: typeof minSlider,
                valueIndex: number,
                targetValue: number
            ) => {
                const sliderBox = await slider.boundingBox();
                const handleBox = await handle.boundingBox();
                expect(sliderBox).not.toBeNull();
                expect(handleBox).not.toBeNull();

                const startX = handleBox!.x + handleBox!.width / 2;
                const centerY = handleBox!.y + handleBox!.height / 2;
                const targetX = sliderBox!.x
                    + ((targetValue - sliderMinValue) / (sliderMaxValue - sliderMinValue))
                    * sliderBox!.width;
                await page.mouse.move(startX, centerY);
                await page.mouse.down();
                await page.mouse.move(targetX, centerY, { steps: 3 });
                await page.mouse.up();

                const updatedValues = (await amount.inputValue()).match(/\d+/g);
                expect(updatedValues).not.toBeNull();
                expect(updatedValues).toHaveLength(2);
                let currentValue = Number(updatedValues![valueIndex]);

                await handle.focus();
                while (currentValue !== targetValue) {
                    const direction = currentValue < targetValue ? 'ArrowRight' : 'ArrowLeft';
                    await handle.press(direction);
                    const values = (await amount.inputValue()).match(/\d+/g);
                    expect(values).not.toBeNull();
                    expect(values).toHaveLength(2);
                    const nextValue = Number(values![valueIndex]);
                    expect(nextValue).not.toBe(currentValue);
                    currentValue = nextValue;
                }
            };

            if (value1 > currentMax) {
                await setHandleValue(maxSlider, 1, value2);
            }
            await setHandleValue(minSlider, 0, value1);
            await setHandleValue(maxSlider, 1, value2);

            await expect(amount).toHaveValue(`$${value1} - $${value2}`);
            console.log('Final slider value:', await amount.inputValue());

        });
        test("TC006:- Validating the table scenarios ", async ({ page }) => {
            await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");
            await page.getByText('Static Web Table', { exact: true }).scrollIntoViewIfNeeded();
      

        })

    });
} catch (error) {
    console.log("Error Visible :- ", error)
}
