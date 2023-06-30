describe('Transmission Filter Test', () => {
  it('shows only the cars that match the selected filter', () => {
    cy.viewport(1900,660)

    // Acceder y logearse en la App
    cy.visit('http://localhost:4200/')
    cy.get('#mat-input-0').type('Julio')
    cy.get('#mat-input-1').type('Julio123')
    cy.get('#login-button').click()

    cy.wait(2000)

    //Probar el filtro de Transmision
    // MANUAL 
    cy.get('#mat-mdc-checkbox-6-input').click()
    cy.wait(2000)
    //cy.get('.mat-drawer-content').children().should('not.contain', 'Transmission: Automatic')
    cy.get('.mat-drawer-content')
  .children()
  .not(':first-child')
  .each(($carro) => {
    cy.wrap($carro).should('not.contain', 'Transmission: Automatic');
});
cy.wait(2000)

    // AUTOMATICO
    cy.get('#mat-mdc-checkbox-7-input').click()
    cy.wait(2000)
    cy.get('.mat-drawer-content')
    .children()
    .not(':first-child')
    .each(($carro) => {
      cy.wrap($carro).should('not.contain', 'Transmission: Manual');
  });

  })
})