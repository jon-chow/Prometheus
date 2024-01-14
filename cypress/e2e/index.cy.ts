it('titles are correct', () => {
  const page = cy.visit('http://localhost:4321');

  page.get('title').should('have.text', 'Welcome to Astro.');
  page.get('h1').should('have.text', 'Welcome to Astro');
});
