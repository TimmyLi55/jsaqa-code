// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (login, password) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(`${login}{enter}`);
  cy.get("#pass").type(`${password}{enter}`);
  //cy.contains("Submit").click();
});

Cypress.Commands.add("visibleText", (text) => {
  return cy.contains(text).should("be.visible", { setTimeout: 3000 });
});

Cypress.Commands.add("putText", (selector, text) => {
  cy.get(selector).type(text, { delay: 100 });
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
