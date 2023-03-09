const { test, expect } = require("@playwright/test");
const { login, pass } = require("../user");
debugger;
test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "sign_in_2.png" });
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("login@gmmm.ru");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("Qwerty");
  await page.screenshot({ path: "sign_in_fill_2.png" });
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toBeVisible();
  await page.screenshot({ path: "sign_in_error.png" });
});
