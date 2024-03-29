
describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const newComment = 'This is new comment'
    const previousComment = 'This is new comment';
        const editedComment = 'This comment is edited'

     
    it('Should add a comment then eddit that and finaly delete that successfully ', () => {
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(newComment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', newComment);
        });

        cy.get('[data-testid="issue-comment"]').contains(newComment).should('be.visible')
        cy.get('[data-testid="issue-comment"]').should('have.length',2)

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(editedComment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', editedComment)
        });

        cy.get('[data-testid="issue-comment"]').contains(editedComment).should('be.visible')

        getIssueDetailsModal()
          .find('[data-testid="issue-comment"]')
          .contains('Delete')
          .click();

        cy.get('[data-testid="modal:confirm"]')
         .contains('button', 'Delete comment')
          .click()
          .should('not.exist');

        getIssueDetailsModal()
          .contains(editedComment)
          .should('not.exist')

     cy.get('[data-testid="issue-comment"]').should('have.length',1)

    })

});

describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const newComment = 'This is new comment'
    const previousComment = 'This is new comment';
        const editedComment = 'This comment is edited'

     
    it('Should add a comment then eddit that and finaly delete that successfully ', () => {
       //Shoould add a comment
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(newComment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', newComment);
        });
        
        //Added comment should be visible
        cy.get('[data-testid="issue-comment"]').contains(newComment).should('be.visible')
        cy.get('[data-testid="issue-comment"]').should('have.length',2)

        //Should edit a comment
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(editedComment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', editedComment)
        });

        //Comment should be edited and visible
        cy.get('[data-testid="issue-comment"]').contains(editedComment).should('be.visible')

        //Should delete a comment
        getIssueDetailsModal()
          .find('[data-testid="issue-comment"]')
          .contains('Delete')
          .click();

        cy.get('[data-testid="modal:confirm"]')
         .contains('button', 'Delete comment')
          .click()
          .should('not.exist');

        getIssueDetailsModal()
          .contains(editedComment)
          .should('not.exist')

        //Comment should be deleted
     cy.get('[data-testid="issue-comment"]').should('have.length',1)

    })

});
