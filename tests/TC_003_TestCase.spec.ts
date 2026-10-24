
import { test, expect } from "@playwright/test";

test.describe("@smoke Validating the scenarios", () => {
    test("Test Case 1: update profile details", async ({ page }) => {
        const email = "shubhamnage003@gmail.com";
        const password = "9403319711";
        const headline = "QA Engineer | Playwright Automation | API Testing | SQL | Jira | MDM | CI/CD | Agile | 4+ Years in Manual & Automation Testing.";

        await page.goto("https://www.naukri.com/nlogin/login?URL=https://www.naukri.com/mnjuser/homepage");
        await page.getByRole("textbox", { name: "Enter Email ID / Username" }).fill(email);
        await page.getByRole("textbox", { name: "Enter Password" }).fill(password);
        await page.getByRole("button", { name: "Login", exact: true }).click();
        await page.pause();

        await page.getByRole("button", { name: "Open profile menu" }).click();
        await page.getByRole("link", { name: "View & Update Profile" }).click();

        await page.getByRole("button", { name: "Resume headline", exact: true }).click();
        await page.getByRole("button", { name: "Edit resume headline" }).click();
        const resumeHeadlineInput = page.getByRole("textbox", { name: "Resume headline" });
        await resumeHeadlineInput.fill(headline);
        await page.getByRole("button", { name: "Save" }).click();

        const closeButton = page.locator("//div[@class='lightbox profileEditDrawer profileUpdatedProLayer model_open flipOpen']//span[@aria-label='Close']").last();
        if (await closeButton.isVisible().catch(() => false)) {
            await closeButton.click();
        }

        await page.getByRole("button", { name: "Personal details" }).click();
        await page.getByRole("button", { name: "Edit personal details" }).click();
        await page.getByRole("combobox", { name: "Date of birth - day" }).click();
        await page.getByRole("link", { name: "9", exact: true }).click();
        await page.getByRole("combobox", { name: "Date of birth - month" }).click();
        await page.getByRole("link", { name: "Mar", exact: true }).click();
        await page.getByRole("button", { name: "Save" }).click();

        await page.getByRole("button", { name: "Open profile menu" }).click();
        await page.getByRole("button", { name: "Logout" }).click();

        await expect(page).toHaveURL("https://www.naukri.com/");
    });
    test("testcase2:- Validatinng the seccond workflow ", async ({ page }) => {
        

    });


});


