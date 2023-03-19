module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Селектор не кликабельный: ${selector}`);
    }
  },
  clickOnSelectedPlace: async function (page, place) {
    await page.waitForSelector('[class="buying-scheme__wrapper"]'); // ждем появления предсатвления зала
    const seatSelector = await page.$$(
      '[class="buying-scheme__row"] [class*="buying-scheme__chair"]'
    ); // выбираем селектор мест
    try {
      await seatSelector[place - 1].click(); // нажимаем на выбранное место
    } catch (error) {
      throw new Error(`Селектор не кликабельный: ${seatSelector[place - 1]}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (el) => el.textContent);
    } catch (error) {
      throw new Error(`Текст недоступен для селектора: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Невозможно ввести текст для селектора: ${selector}`);
    }
  },
};
