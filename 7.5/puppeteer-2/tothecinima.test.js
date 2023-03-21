const { expect } = require("chai");
const {
  clickElement,
  putText,
  clickElementDefinite,
  clickOnSelectedPlace,
  getText,
} = require("./lib/mycommands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});

describe("Позитивный тест", () => {
  it("Тестирование открытия бронирования в заданную дату и время", async () => {
    let selectForDate = '[data-time-stamp="1679691600"]';
    let selectForTime = '[data-seance-id="141"]';
    let expectText = "Train arrival";
    let expectText2 = "Начало сеанса: 09:00";

    await clickElement(page, selectForDate);
    await clickElement(page, selectForTime);
    let selectH2 = await getText(page, "h2");
    let selectTime = await getText(page, '[class="buying__info-start"]');
    expect(expectText).contain(selectH2);
    expect(expectText2).contain(selectTime);
  });
  it("Тестирование бронирования на первной странице", async () => {
    let selectSecondFilm = '[data-seance-id="139"]';
    let selectButton = '[class="acceptin-button"]';
    let acceptButton = '[class="acceptin-button"]';
    //let expectText = "Вы выбрали билеты:";   // старая версия
    let expectText = "Электронный билет";
    await clickElement(page, selectSecondFilm);
    await clickOnSelectedPlace(page, 1);
    await clickElement(page, selectButton);
    await clickElement(page, acceptButton);
    //let textFromPage = await getText(page, '[class="ticket__check-title"]');  // старая версия
    let textFromPage = await getText(page, '[class="ticket__check-title"]');
    expect(expectText).contain(textFromPage);
  });
});
describe.only("Негативный тест", () => {
  it("Выбор уже забранированного места", async () => {
    let selectFirstFilm = '[data-seance-id="139"]';
    await clickElement(page, selectFirstFilm);
    await clickOnSelectedPlace(page, 1);
    let selectButton = await page.$(
      '[class="acceptin-button"][disabled="true"]'
    );
    expect(selectButton).to.exist;
  });
});
