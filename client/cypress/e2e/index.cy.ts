/// <reference types="Cypress" />

it('titles are correct', () => {
  const page = cy.visit('/');

  page.get('title').should('have.text', 'Prometheus — Fire Music!');
});
