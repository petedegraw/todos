describe('Todos from local storage update UI', () => {
  beforeEach(() => {
    cy.visit('localhost:5000');
    let lsAll =
      '{"1":{"id":1,"done":false,"text":"check email"},"2":{"id":2,"done":false,"text":"feed the dog"},"3":{"id":3,"done":false,"text":"pay the bill"}}';
    localStorage.setItem('todos', lsAll);
  });

  it('displays the todos from local storage', () => {
    cy.get('#todos ul li')
      .should('have.length', 3)
      .last()
      .within(() => {
        cy.get('span').should('have.text', 'pay the bill');
      });
  });
});

describe('Todos are added to local storage', () => {
  beforeEach(() => {
    cy.visit('localhost:5000');

    const newItems = ['check email', 'feed the dog', 'pay the bill'];

    newItems.forEach((item) => {
      cy.get('input[type="text"]').type(`${item}{enter}`);
    });
  });

  it('can add a todo item to local storage', async () => {
    let lsAll =
      '{"1":{"id":1,"done":false,"text":"check email"},"2":{"id":2,"done":false,"text":"feed the dog"},"3":{"id":3,"done":false,"text":"pay the bill"}}';
    expect(localStorage.getItem('todos')).to.eq(lsAll);
  });
});

describe('Removed todos are updated in local storage', () => {
  beforeEach(() => {
    cy.visit('localhost:5000');

    const newItems = ['check email', 'feed the dog', 'pay the bill'];

    newItems.forEach((item) => {
      cy.get('input[type="text"]').type(`${item}{enter}`);
    });

    cy.get('[data-id="1"] > .delete').click();
  });

  it('can remove a todo item', () => {
    let lsMinusFirst = '{"2":{"id":2,"done":false,"text":"feed the dog"},"3":{"id":3,"done":false,"text":"pay the bill"}}';
    expect(localStorage.getItem('todos')).to.eq(lsMinusFirst);
  });
});

describe('Completed todos are updated in local storage', () => {
  beforeEach(() => {
    cy.visit('localhost:5000');
    let lsAll =
      '{"1":{"id":1,"done":false,"text":"check email"},"2":{"id":2,"done":false,"text":"feed the dog"},"3":{"id":3,"done":false,"text":"pay the bill"}}';
    localStorage.setItem('todos', lsAll);
    cy.get('#todos ul li').first().click();
  });

  it('can complete a todo item', () => {
    let lsCompleted =
      '{"1":{"id":1,"done":true,"text":"check email"},"2":{"id":2,"done":false,"text":"feed the dog"},"3":{"id":3,"done":false,"text":"pay the bill"}}';
    expect(localStorage.getItem('todos')).to.eq(lsCompleted);
  });
});

describe('Deleted todos are updated in local storage', () => {
  beforeEach(() => {
    cy.visit('localhost:5000');
    let lsAll =
      '{"1":{"id":1,"done":false,"text":"check email"},"2":{"id":2,"done":false,"text":"feed the dog"},"3":{"id":3,"done":false,"text":"pay the bill"}}';
    localStorage.setItem('todos', lsAll);
    cy.get('#deleteTodos').click();
  });

  it('can remove all todo items', () => {
    expect(localStorage.getItem('todos')).to.eq('{}');
  });
});
