describe('Price Filter Test', () => {
  it('shows only the cars that match the selected filter', () => {
    cy.viewport(1900,660)
    // Acceder y logearse en la App
    cy.visit('http://localhost:4200/')
    cy.get('#mat-input-0').type('Julio')
    cy.get('#mat-input-1').type('Julio123')
    cy.get('#login-button').click()

    cy.wait(2000)

    //Probar el filtro de Precios

    //Carros con precios menores a 60
    cy.get('#mat-mdc-checkbox-1-input').click()
    cy.wait(3000)
    cy.get('.mat-drawer-content')
    .children()
    .not(':first-child')
    .each(($carro) => {
      cy.wrap($carro)
        .find('.rentInformation > .rent-price')
        .should(($precio) => {
          const monto = parseFloat($precio.text().replace('$', ''));
          expect(monto).to.be.lessThan(60);
        });
  });


      //Carros con precios menores a 160
      cy.get('#mat-mdc-checkbox-2-input').click()
      cy.wait(3000)
      cy.get('.mat-drawer-content')
      .children()
      .not(':first-child')
      .each(($carro) => {
        cy.wrap($carro)
          .find('.rentInformation > .rent-price')
          .should(($precio) => {
            const monto = parseFloat($precio.text().replace('$', ''));
            expect(monto).to.be.lessThan(160);
          });
    });

          //Carros con precios menores a 300
          cy.get('#mat-mdc-checkbox-3-input').click()
          cy.wait(3000)
          cy.get('.mat-drawer-content')
          .children()
          .not(':first-child')
          .each(($carro) => {
            cy.wrap($carro)
              .find('.rentInformation > .rent-price')
              .should(($precio) => {
                const monto = parseFloat($precio.text().replace('$', ''));
                expect(monto).to.be.lessThan(300);
              });
        });

              //Carros con precios menores a 500
      cy.get('#mat-mdc-checkbox-4-input').click()
      cy.wait(3000)
      cy.get('.mat-drawer-content')
      .children()
      .not(':first-child')
      .each(($carro) => {
        cy.wrap($carro)
          .find('.rentInformation > .rent-price')
          .should(($precio) => {
            const monto = parseFloat($precio.text().replace('$', ''));
            expect(monto).to.be.lessThan(500);
          });
    });
          //Carros con precios menores a 650
          cy.get('#mat-mdc-checkbox-5-input').click()
          cy.wait(3000)
          cy.get('.mat-drawer-content')
          .children()
          .not(':first-child')
          .each(($carro) => {
            cy.wrap($carro)
              .find('.rentInformation > .rent-price')
              .should(($precio) => {
                const monto = parseFloat($precio.text().replace('$', ''));
                expect(monto).to.be.lessThan(650);
              });
        });



  })
})