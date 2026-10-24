import { test, expect, chromium } from '@playwright/test';

try {
    test.describe("Validating scenarios", () => {

        test("validating the multiple URLs", async ({ request }) => {
            try {
                const URLlink: string[] = ["https://reqres.in/api/users/2", "https://reqres.in/api/users?page=2"];

                for (const url of URLlink) {
                    const response = await request.get(url);
                    expect(response.status()).toBe(200);
                    const responseBody = await response.json();
                    console.log(`Response from ${url}:`, responseBody);
                }
            }
            catch (error) {

                console.log("Error occurred while validating the URL's:", error);
                throw error;
            }
        })

        test("Updating the naukri profile", async ({ page }) => {

            try {


                const URL = "https://www.naukri.com/";
                await page.goto(URL)
                expect(page).toHaveURL(URL);
                await page.locator("//a[text()='Login']").click();
                await page.getByRole('textbox', { name: 'Email ID / Username' }).fill("shubhamnage003@gmail.com");
                await page.locator("//input[@type='password']").fill("9403319711");
                await page.locator("//button[@type='submit']").click();
                await page.locator("//button[@aria-label='Open profile menu']").click();
                await page.locator("//a[text()='View & Update Profile']").click();
                const fullname = page.locator("//div//span[@class='fullname']");
                await fullname.innerText();
                await expect(fullname).toHaveText("Shubham Nage");
                const Headline = page.locator("//div[@class='prefill typ-14Medium']");
                await Headline.allInnerTexts();
                await expect(Headline).toHaveText(`QA Engineer | Playwright Automation | API Testing | SQL | Jira | MDM | CI/CD | Agile | 4+ Years in Manual & Automation Testing`);


            }
            catch (error) {

                console.log("Facing the below error msg :- ", error);
                throw error;
            }

            // finally {
            //     await page.close();
            // }



        })


        test("validating the Table scenarios", async ({ page }) => {
            try {
                await page.goto("https://practicetestautomation.com/practice-test-table/");

                const Course_Name = page.locator("//td[@data-col='course']");
                const ID = page.locator("//td[@data-col='id']");
                const Language = page.locator("//td[@data-col='language']");
                const Level = page.locator("//td[@data-col='level']");
                const Enrollments = page.locator("//td[@headers='col_enroll']");

                for (let i = 0; i < await Course_Name.count(); i++) {
                    const value = await Course_Name.nth(i).innerText();

                    if (value === "XPath Locators") {
                        console.log(`
                    ${await ID.nth(i).textContent()}
                    ${await Language.nth(i).textContent()}
                    ${await Level.nth(i).textContent()}
                    ${await Enrollments.nth(i).textContent()}`);
                    }
                }
            } catch (error) {
                console.log("Facing the below error msg :- ", error);
                throw error;
            }
        });

        test("validating the Table scenarios with the help of locator.allTextContents()", async ({ page }) => {
            try {
                await page.goto("https://practicetestautomation.com/practice-test-table/");
                const courseNames = await page.locator("//td[@data-col='course']").allTextContents();
                const ids = await page.locator("//td[@data-col='id']").allTextContents();
                const languages = await page.locator("//td[@data-col='language']").allTextContents();
                const levels = await page.locator("//td[@data-col='level']").allTextContents();
                const enrollments = await page.locator("//td[@headers='col_enroll']").allTextContents();

                for (let i = 0; i < courseNames.length; i++) {
                    if (courseNames[i] === "XPath Locators") {
                        console.log(`
                    ${ids[i]}
                    ${languages[i]}
                    ${levels[i]}
                    ${enrollments[i]}`);
                    }
                }
            } catch (error) {
                console.log("Facing the below error msg :- ", error);
                throw error;
            }
        });


        test("validating the multiple URLs with the help of playwright", async () => {

            (async () => {
                const browser = await chromium.launch({ headless: true });
                const page = await browser.newPage();
                await page.goto('https://practicetestautomation.com/practice-test-table/');
                await browser.close();
            })();
        });


    });
} catch (error) {
    console.log("Facing the below error msg :- ", error);
    throw error;
}