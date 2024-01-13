/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.'
  const deleteButton = '[data-testid="icon:trash"]'
  const deleteButtonName ="Delete issue"
  const cancelDeletionButtonName = "Cancel"
  const confirmationPopup = '[data-testid="modal:confirm"]'
  const backlogList = '[data-testid="board-list:backlog"]'
  const issueDetailModal = '[data-testid="modal:issue-details"]'

  it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton
      cy.get(deleteButton).click();
      cy.get(confirmationPopup).should('be.visible');
     
    IssueModal.confirmDeletion
      cy.get(confirmationPopup).within(() => {
          cy.contains(deleteButtonName).click();
      });
      cy.get(confirmationPopup).should('not.exist');
      cy.get(backlogList).should('be.visible');

    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle) 
      cy.get(issueDetailModal).should('not.exist');
      cy.reload();
      cy.contains(issueTitle).should('not.exist');
         
  });

  it.only('Should cancel deletion process successfully', () => {
    IssueModal.clickDeleteButton
      cy.get(deleteButton).click();
      cy.get(confirmationPopup).should('be.visible');
  
    IssueModal.cancelDeletion
      cy.get(confirmationPopup).within(() => {
         cy.contains(cancelDeletionButtonName).click();
      });
      cy.get(confirmationPopup).should('not.exist');
      cy.get(issueDetailModal).should('be.visible');
  });
});