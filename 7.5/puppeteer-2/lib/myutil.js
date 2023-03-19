module.exports = {
  returnSelectorSeats: async function (page, row, place) {
    try {
      let selectorHoll = '[class="buying-scheme__wrapper"]';
      await page.waitForSelector(selectorHoll);
    } catch (error) {
      throw new Error(`Нет селектора на экране: ${selectorHoll}`);
    }
    argRows = await page.$$('[class="buying-scheme__row"]');
  },
};
