describe('Delete issue', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue=true');
      });
    });
  
    it.only('Should delete issue successfully', () => {
      //Open issue
      cy.get('[data-testid="list-issue"]')
      .contains('Try leaving a comment on this issue.')
      .click()

      //Delete issue
      cy.get('[data-testid="icon:trash"]').click()
      cy.contains('Delete issue').click()

      // Assert that the deletion confirmation dialogue is not visible
      cy.get('.deletion-confirmation-dialogue').should('not.exist')

      //Assert that the issue is deleted and no longer displayed on the Jira board
      cy.reload()
      cy.get('[data-testid="board-list:done"]').should('be.empty')

    });

    it('Should cancel deletion process successfully', () => {
        //Open issue
      cy.get('[data-testid="list-issue"]')
      .contains('Try leaving a comment on this issue.')
      .click()

      //Cancel deletion process
      cy.get('[data-testid="icon:trash"]').click()
      cy.contains('Cancel').click()

      //Assert that the deletion confirmation dialogue is not visible
      cy.get('.deletion-confirmation-dialogue').should('not.exist')

      //Assert that the issue is not deleted and is still displayed on the Jira board
      cy.reload()
      cy.get('[data-testid="board-list:done"]').contains('Try leaving a comment on this issue.').should('be.visible')

    })
});