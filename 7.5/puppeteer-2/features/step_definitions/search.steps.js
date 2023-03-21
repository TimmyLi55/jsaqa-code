const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {
  putText,
  getText,
  clickElement,
  clickOnSelectedPlace,
} = require("../../lib/mycommands.js");
const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("пользователь находится на странице {string}", async function (string) {
  return await this.page.goto(`https://netology.ru${string}`, {
    setTimeout: 60000,
  });
});

When("поиск {string} в поисковой строке", async function (string) {
  return await putText(this.page, "input", string);
});

Then("пользователь видит предложенный курс {string}", async function (string) {
  const actual = await getText(this.page, "a[data-name]");
  const expected = await string;
  expect(actual).contains(expected);
});

Given(
  "пользователь открывает главную страницу {string}",
  async function (string) {
    return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
      setTimeout: 10000,
    });
  }
);

When("выбор дня недели {string}", async function (day) {
  let selectForDate = await this.page.$x(`//*[contains(text(), '${day}')]`);
  return await selectForDate[0].click();
});

When("выбор фильма по времени {string}", async function (timeBegin) {
  let selectForTime = await this.page.$x(
    `//*[contains(text(), '${timeBegin}')]`
  );
  return await selectForTime[0].click();
});

Then(
  "пользователь видит места для бронирования фильма {string} и {string}",
  async function (filmName, timeBegin) {
    let selectH2 = await getText(this.page, "h2");
    let selectTime = await getText(this.page, '[class="buying__info-start"]');
    expect(filmName).to.contain(selectH2);
    expect(timeBegin).to.contain(selectTime);
  }
);

When(
  "выбор места № {string} в первом ряду и нажатие забронировать",
  async function (string) {
    let selectButton = '[class="acceptin-button"]';
    await clickOnSelectedPlace(this.page, string);
    return await clickElement(this.page, selectButton);
  }
);

Then(
  "пользователь видит страницу бронирования выбранного места с тесктом {string}",
  async function (string) {
    let textFromPage = await getText(
      this.page,
      '[class="ticket__check-title"]'
    );
    expect(string).contain(textFromPage);
  }
);
Then("нажатие на кнопку {string}", async function (string) {
  let button = await this.page.$x(`//*[contains(text(), '${string}')]`);
  await clickElement(this.page, button);
});

When("выбор места № {string} в первом ряду", async function (string) {
  let selectButton = '[class="acceptin-button"]';
  await clickOnSelectedPlace(this.page, string);
  return await clickElement(this.page, selectButton);
});

Then("кнопка Забронировать серая", async function () {
  let selectButton = await this.page.$(
    '[class="acceptin-button"][disabled="true"]'
  );
  expect(selectButton).to.exist;
});
