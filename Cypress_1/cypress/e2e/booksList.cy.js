//const faker = require("faker-js");

beforeEach(() => {
  cy.visit("/");
});

let book = "Гарри Поттер";
context("Тестирование логина", () => {
  it("Ввод логина и пароля", () => {
    cy.login("test@test.com", "test");
    cy.visibleText("Добро пожаловать test@test.com");
  });

  it("Не входит с пустым логином", () => {
    cy.login("", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Не входит с путсым паролем", () => {
    cy.login("test@test.com", "");
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});

context("Добавление книги в избранное", () => {
  it("Добавлние новой книги с добавлением в избранное", () => {
    cy.login("test@test.com", "test");
    cy.visibleText("Добро пожаловать test@test.com");
    cy.get('[class="btn btn-warning"]').click();
    cy.visibleText("Book description");
    cy.putText('[id="title"]', book);
    cy.putText('[id="description"]', "Книга о Гарри Поттере");
    cy.putText('[id="authors"]', "Джоан Роалинг");
    cy.get('[id="favorite"]').dblclick();
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.visibleText("Delete from favorite");
  });

  it("Проверка наличия книги в избранном при переходе по ссылке 'Favorits'", () => {
    cy.login("test@test.com", "test");
    cy.visibleText("Добро пожаловать test@test.com");
    cy.contains("Favorites").click();
    cy.wait(2000);
    cy.contains(book).should("contain", "Delete from favorite");
  });
  it("Удаление ВСЕХ книг из 'Favorits'", () => {
    cy.login("test@test.com", "test");
    cy.visibleText("Добро пожаловать test@test.com");
    cy.contains("Favorites").click();
    cy.wait(2000);
    cy.get('[class="btn btn-secondary"]').each((el) => {
      cy.wrap(el).click();
    });
    cy.visibleText("Please add some book to favorit on home page!");
  });
});
