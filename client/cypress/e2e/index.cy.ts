/// <reference types="Cypress" />

it('titles are correct', () => {
  const page = cy.visit('/');
  cy.viewport('macbook-15');

  page.get('title').should('have.text', 'Prometheus — Fire Music!');
});
