import { test, expect } from "@playwright/test";
import userData from "../testdata/userData.json";
import dotenv from 'dotenv';

dotenv.config();
const baseURL = process.env.Demo_BaseURL!;

test.describe("craeting the test cases", async () => {
    test("Validating the Swag Labs", async ({ page }) => {


        console.log("Step 1 Navigate to the URL")
        await page.goto('https://www.saucedemo.com/');
        const AcceptedUernameare = await page.locator("//div[@class='login_credentials']").innerText();

        console.log("Step 2:- Login page")
        const StanderUer = AcceptedUernameare.split('\n').find(user => user.trim() === 'standard_user')!;
        console.log(StanderUer)
        // Split the text into an array using new line (\n)
        // Find the username "standard_user"
        // The "!" tells TypeScript that this value will definitely exist
        const Passwordforallusers = await page.locator("//div[@class='login_password']").innerText();
        const secret_sauce = Passwordforallusers.split("\n").find(user => user.trim() === "secret_sauce")!;
        console.log(secret_sauce);

        const username = await page.locator("//input[@id='user-name']")
        username.fill(StanderUer);
        await expect(username).toHaveValue('standard_user')

        const password = await page.locator("//input[@id='password']")
        password.fill(secret_sauce);
        //validating the value is there 
        expect(password).toHaveValue('secret_sauce')
        await page.locator("//input[@id='login-button']").click();

        console.log("Step 4:- adding the product")

        console.log("product1")
        const product1 = await page.locator("//div[text()='Sauce Labs Backpack']").innerText();
        console.log(product1);
        const Product1_price = await page.locator("//div[text()='29.99']").innerText();
        console.log(Product1_price);
        await expect(page.locator("//div[text()='Sauce Labs Backpack']")).toBeVisible();
        await page.locator("//button[@data-test='add-to-cart-sauce-labs-backpack']").click();

        console.log("Product2 ")
        const product2 = await page.locator("//div[text()='Sauce Labs Bike Light']").innerText();
        console.log(product2);
        const Product2_price = await page.locator("//div[text()='9.99']").innerText();
        console.log(Product2_price);
        await page.locator("//button[@data-test='add-to-cart-sauce-labs-bike-light']").click();

        console.log("product3 ")
        const Product3 = await page.locator("//div[text()='Sauce Labs Bolt T-Shirt']").innerText()
        console.log(Product3)
        const Product3_price = await page.locator("//div[text()='Sauce Labs Bolt T-Shirt']/ancestor::div[@class='inventory_item']//div[@class='inventory_item_price']").innerText();
        console.log(Product3_price);

        await page.locator("//button[@data-test='add-to-cart-sauce-labs-bolt-t-shirt']").click();

        console.log("Step 5:- Product add to the card")
        await page.locator("//div[@class='shopping_cart_container']").click();

        await expect(page.locator("//div[text()='Sauce Labs Backpack']")).toHaveText(product1);
        await expect(page.locator("//div[text()='29.99']")).toHaveText(Product1_price)

        await expect(page.locator("//div[text()='Sauce Labs Bike Light']")).toHaveText(product2);
        await expect(page.locator("//div[text()='9.99']")).toHaveText(Product2_price)

        await expect(page.locator("//div[text()='Sauce Labs Bolt T-Shirt']")).toHaveText(Product3);
        await expect(page.locator("//div[text()='15.99']")).toHaveText(Product3_price)

        await page.locator("//button[@data-test='checkout']").click();

        console.log("Step 6:- filling the customer details")
        await page.locator("//input[@name='firstName']").fill(userData.customer.firstName);
        await page.locator("//input[@name='lastName']").fill(userData.customer.lastName);
        await page.locator("//input[@name='postalCode']").fill(userData.customer.zipCode);
        await page.locator("//input[@name='continue']").click();

        console.log("Step 7:- confime the order ");

        await page.locator("//button[@name='finish']").click();
        await page.locator("//button[@name='back-to-products']").click();

        console.log("Step 8:- login out");

        await page.locator("//button[@id='react-burger-menu-btn']").click();
        await page.locator("//a[@id='logout_sidebar_link']").click();

        await page.close();

    })

    test("Validating Demo Qa test cases", async ({ page }) => {
        console.log("Step 1:- Nevigate to the URL")
        await page.goto(baseURL);
        await expect(page).toHaveURL("https://demoqa.com");

        // await page.locator("//div//h5[text()='Alerts, Frame & Windows']").click();
        await page.locator("//div//h5[text()='Forms']").click();
        await page.locator("//div//span[text()='Practice Form']").click();
        await page.locator("//div[@class='css-19bb58m']//input[@id='react-select-3-input']").click();

        await page.locator("//div[@class='css-19bb58m']//input[@id='react-select-3-input']").click();

        //Get all dropdown options
        const options = page.locator("//div[contains(@id,'react-select-3-option')]");
        // Store all values
        const stateList = await options.allInnerTexts();
        // Print all values
        console.log(stateList);
        // Print one by one
        for (const state of stateList) {
            console.log(state);
        }
        // Select Haryana
        const selectedState = stateList.find(state => state === "Rajasthan");
        await page.getByText(selectedState!).click();

    });

    

  
});