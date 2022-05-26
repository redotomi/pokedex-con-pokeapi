/// <reference types="cypress" />

const URL = "http://127.0.0.1:5500/index.html";
const TARJETAS_PAGINA = 20;

context('PokéDex con Pokeapi', () => {
  before(() => {
    cy.visit(URL);
  });

  describe('Comprueba la existencia de todos los comoponentes', () => {
    it('Se asegura de que la imagen/título sea visible', () => {
      cy.get('.logo').find('.logo-pokedex').should('be.visible');
    });

    it('Se asegura de que haya solo un boton visible en la primera página', () => {
      cy.get('.navegacion').find('.anterior').should('not.be.visible');
      cy.get('.navegacion').find('.siguiente').should('be.visible');
    })

    it('Se asegura de que haya 20 tarjetas en la primera pagina', () => {
      cy.get('.pokemon-tarjetas').find('.tarjeta').should('have.length', TARJETAS_PAGINA);
    });

    it('Se asegura que el popup no sea visible', () => {
      cy.get('body').find('#popup').should('not.be.visible');
    });



    describe('Comprueba interacción con el contenido', () => {
      it('Se asegura de que el popup se abra al hacer click sobre una tarjeta', () => {
        for(let i=1; i<TARJETAS_PAGINA;i++){
          cy.get('.pokemon-tarjetas').find('.tarjeta').eq(i).click();
          cy.get('body').find('#popup').should('be.visible');
          cy.get('.popup-header').find('button').click();
        }
        
      });

      it('Se asegura de que el popup se cierre al clickear fuera del ppup', () => {
        cy.get('.pokemon-tarjetas').find('.tarjeta').eq(0).click();
        cy.get('body').find('#popup').should('be.visible')
        cy.get('body').click(10, 10);
        cy.get('body').find('#popup').should('not.be.visible');
      });

      describe('Se asegura de que el cambio de pagina funcione correctamente', () => {
        it('Cambia de pagina', () => {
          cy.get('.navegacion').find('.siguiente').click();
          cy.get('.pokemon-tarjetas').find('.tarjeta').should('have.length', TARJETAS_PAGINA);
        });

        it('Se asegura de que ambos botones de cambio de pagina sean visibles', () => {
          cy.get('body').find('.navegacion').should('be.visible');
        });

        it('Se asegura de que el popup se abra al hacer click sobre una tarjeta', () => {
          for(let i=1; i<TARJETAS_PAGINA;i++){
            cy.get('.pokemon-tarjetas').find('.tarjeta').eq(i).click();
            cy.get('body').find('#popup').should('be.visible');
            cy.get('.popup-header').find('button').click();
          }
        });

        it('Se asegura que al clickear el titulo regrese al inicio', () => {
          cy.get('.logo').find('.logo-pokedex').click();
          cy.get('.navegacion').find('.anterior').should('not.be.visible');
          cy.get('.navegacion').find('.siguiente').should('be.visible');
        });

      });

    });
  });


});
