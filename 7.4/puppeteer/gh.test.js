const jestConfig = require("./jest.config");

let page;

afterEach(() => {
  page.close();
}, 10000);

describe("Github team page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }, 10000);
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    //await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 50000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 50000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 50000);
});

describe("Github marketplace page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/marketplace");
  }, 10000);
  test("Проверка открытия страницы'", async () => {
    const title = await page.title();
    expect(title).toEqual(
      "GitHub Marketplace · to improve your workflow · GitHub"
    );
  }, 50000);
  test("Переход к бесплатным модулям'", async () => {
    let filter = await page.$('[class="MarketplaceDetails details-reset"]');
    await filter.click();
    let freeApp = await page.$(
      "body > div.logged-out.env-production.page-responsive.color-bg-subtle > div.application-main > main > div.MarketplaceBody > div.container-lg.p-responsive.clearfix > nav > details > ul > li:nth-child(1) > a"
    );
    await freeApp.click();
    await page.waitForTimeout(2000);
    expect(page.url()).toBe("https://github.com/marketplace/category/free");
  }, 50000);
  test("Ввод и поиск на странице", async () => {
    //const searchSelector = await page.$();
    await page.type('[type="search"]', "JS");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(2000);
    await page.waitForSelector('div p [class="text-bold"]');
    let result = await page.$eval(
      '[class="text-bold"]',
      (el) => el.textContent
    );
    expect(result).toContain("286 results");
  }, 50000);
});
