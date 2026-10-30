import { test, expect } from "@playwright/test";

try {


    test.describe("@smoke Validating the scenarios", async () => {

        test.beforeEach("Login site URl", async ({ page }) => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page).toHaveURL("https://www.saucedemo.com/");

        });

        test("Login scenarios", async ({ page }) => {
            await page.pause();

            //extract the data from side
            const Login_credentials = await page.locator("//div[@class='login_credentials']").innerText();
            console.log("Some Value =", Login_credentials);
            //separt the data from using the below line code
            const LoginValue: any = Login_credentials.split('\n').find(line => line.trim() === "standard_user");
            console.log("Logine credentials :-", LoginValue);
            await page.getByRole('textbox', { name: 'Username' }).fill(LoginValue);

            //password Action 
            const loginPassword = await page.locator("//div[@data-test='login-password']").innerText();
            console.log(loginPassword);
            const PassWordValue: any = loginPassword.split('\n').find(line1 => line1.trim() === 'secret_sauce');
            console.log("password credentials :-", PassWordValue);

            await page.getByRole('textbox', { name: 'Password' }).fill(PassWordValue);
            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");


        });
        test("Verify navigation to the inventory page", async ({ page }) => {



        });


        // test.afterAll("Closing screen", async ({ page }) => {
        //     await page.close();

        // });


    });
} catch (error) {
    console.log("facing some errro :-", error);


}