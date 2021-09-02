const copy = require('../fixtures/copy');

describe('Todo app display', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
    cy.fixture('copy.json').as('copy');
  });

  it('displays a heading', () => {
    cy.fixture('copy').should((copy) => {
      cy.get('.heading > :nth-child(2)').contains(copy.heading);
    });
  });

  it('displays a form with an input and submit button', () => {
    cy.get('form').within(() => {
      cy.get('input').should('have.attr', 'type', 'text');
      cy.get('button').should('have.attr', 'type', 'submit');
    });
    cy.get('label').should('have.text', copy.label);
    cy.get('button[type="submit"]').contains(copy.submit);
  });

  it('displays a delete all button when a todo item is present', () => {
    const newItem = 'check email';

    cy.get('#deleteTodos').should('not.exist');

    cy.get('input[type="text"]').type(`${newItem}{enter}`);

    cy.get('#todos ul li')
      .should('have.length', 1)
      .last()
      .within(() => {
        cy.get('span').should('have.text', newItem);
      });

    cy.get('#deleteTodos').should('exist');
    cy.get('#deleteTodos').should('have.text', copy.deleteAll);
  });
});

describe('Todo app interactions', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
    cy.fixture('copy.json').as('copy');
  });

  it('can add a todo item', () => {
    const newItem = 'check email';

    cy.get('input[type="text"]').type(`${newItem}{enter}`);

    cy.get('#todos ul li')
      .should('have.length', 1)
      .last()
      .within(() => {
        cy.get('span').should('have.text', newItem);
      });
  });

  it('can remove a todo item', () => {
    const newItem = 'check email';

    cy.get('input[type="text"]').type(`${newItem}{enter}`);

    cy.get('#todos ul li')
      .should('have.length', 1)
      .last()
      .within(() => {
        cy.get('span').should('have.text', newItem);
      });

    cy.get('#todos ul li').first().get('button.delete').click();

    cy.get('#todos ul li').should('have.length', 0);
  });

  it('can complete a todo item', () => {
    const newItem = 'check email';

    cy.get('input[type="text"]').type(`${newItem}{enter}`);

    cy.get('#todos ul li')
      .should('have.length', 1)
      .last()
      .within(() => {
        cy.get('span').should('have.text', newItem);
      });

    cy.get('#todos ul li').first().click();

    cy.get('#todos ul li').should('have.class', 'todo_li--completed');
  });

  it('can remove all todo items', () => {
    const newItems = ['check email', 'feed the dog', 'pay the bill'];

    newItems.forEach((item) => {
      cy.get('input[type="text"]').type(`${item}{enter}`);
    });

    cy.get('#todos ul li')
      .should('have.length', 3)
      .last()
      .within(() => {
        cy.get('span').should('have.text', newItems[newItems.length - 1]);
      });

    cy.get('#deleteTodos').contains(copy.deleteAll);
    cy.get('#deleteTodos').click();

    cy.get('#todos ul li').should('have.length', 0);
  });
});
