describe("My First Test", () => {
  it("should go to homepage", () => {
    cy.visit("http://localhost:3000").title().should("eq", "Log In | RAH");
  });
});
