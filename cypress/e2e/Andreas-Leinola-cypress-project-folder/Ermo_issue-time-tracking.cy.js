describe("ASSIGNMENT 2: ADD AUTOMATION TESTS FOR TIME TRACKING FUNCTIONALITY", () => {
  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  //////////////////////////////////////////////////////////////////////////////////////////
  it("Time Estimation Functionality:", () => {
    cy.visit("/");
    cy.contains(
      '[data-testid="list-issue"]',
      "You can use rich text with images in issue descriptions."
    )
      .should("be.visible")
      .click();
    //Adding estimation
    cy.get('[placeholder="Number"]').should("be.visible").clear().type(69);

    //Asserting that the estimation is added and visible
    cy.get("div").contains(69).should("be.visible");

    //Editing the estimation
    cy.get('[placeholder="Number"]').should("be.visible").clear().type(420);

    //Asserting that the updated value us visible
    cy.get("div").contains("420h estimated").should("be.visible");

    //Removing the estimation
    cy.get('[placeholder="Number"]').should("be.visible").clear();

    //Asserting that the value is removed
    cy.get("div").contains("420h estimated").should("not.exist");
  });
});
////////////////////////////////////////////////////////////////////////////////////////////
const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
const getIssueTimeTrackingModal = () =>
  cy.get('[data-testid="modal:tracking"]');
const timeSpent = "Time spent (hours)";
const timeRemaining = "Time remaining (hours)";
const spentTime = "99";
const remainingTime = "4";
it("Time Logging Functionality:", () => {
  cy.visit("/");
  cy.contains(
    '[data-testid="list-issue"]',
    "You can use rich text with images in issue descriptions."
  )
    .should("be.visible")
    .click();

  //estimated
  cy.get('[placeholder="Number"]').should("be.visible").clear().type(420);
  cy.get("div").contains("420h estimated").should("be.visible");
  //click on Timetracking
  cy.get('[data-testid="icon:stopwatch"]').should("be.visible").click();

  //Time spent (hours)
  cy.contains(timeSpent);
  cy.get('input[placeholder="Number"][value="4"]').clear().type(99);

  //Time remaining
  cy.contains(timeRemaining);
  cy.get('input[placeholder="Number"][value=""]').clear().type(12);

  //Done
  cy.contains("button", "Done").click();

  //Spent and remaining time must be visible on issue
  cy.contains("div", "99h logged").should("be.visible");
  cy.contains("div", "12h remaining").should("be.visible");

  //delete tracked time
  cy.get('[data-testid="icon:stopwatch"]').should("be.visible").click();
  cy.contains(timeSpent);
  cy.get('input[placeholder="Number"][value="99"]').clear();
  cy.contains(timeRemaining);
  cy.get('input[placeholder="Number"][value="12"]').clear();

  //Done
  cy.contains("button", "Done").click();

  //Remove "Original estimated hours"
  cy.get('[placeholder="Number"]').should("be.visible").clear();

  //close the issue windown

  cy.get('[data-testid="icon:close"]').eq(0).click();
});
