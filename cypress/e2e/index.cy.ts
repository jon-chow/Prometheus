it('titles are correct', () => {
  const page = cy.visit('/');

  page.get('title').should('have.text', 'Welcome to Astro.');
});
