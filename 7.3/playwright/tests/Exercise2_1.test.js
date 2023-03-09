const { test, expect } = require("@playwright/test");
const { login, pass } = require("../user");
debugger;
test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "sign_in.png" });
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(login);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(pass);
  await page.screenshot({ path: "sign_in_full.png" });
  await page.getByTestId("login-submit-btn").click();
  await page.waitForTimeout(10000);
  await expect(page.url()).toBe("https://netology.ru/profile");
  const profileHeader = page.getByRole("heading", {
    name: "Мои курсы и профессии",
  });
  await expect(profileHeader).toBeVisible();
  await page.screenshot({ path: "sign_in_finish.png" });
});
