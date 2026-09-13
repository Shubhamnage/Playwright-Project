import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.att.com/');
  await page.locator("//li//button[@data-menu='Shop']").click();

  await page.locator("//li//a[@data-category='Devices & accessories']").click();
  await page.locator("(//li//a[@id='Phones-link'])[1]").click();
  const Iphone = await page.locator("//a[@id='_productcard_acc_sku54217v4']");
  await Iphone.innerText();
  console.log(Iphone);
  await expect(page.locator("//a[@id='_productcard_acc_sku54217v4']")).toHaveText('')





  // Expect a title "to contain" a substring.
  //   await expect(page).toHaveTitle(/Playwright/);
  // });

  // test('get started link', async ({ page }) => {
  //   await page.goto('https://playwright.dev/');

  //   // Click the get started link.
  //   await page.getByRole('link', { name: 'Get started' }).click();

  //   // Expects page to have a heading with the name of Installation.
  //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
