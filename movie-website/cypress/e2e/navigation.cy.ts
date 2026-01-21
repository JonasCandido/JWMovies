describe("Navigation to item page", () => {
  it("opens movie details page", () => {
    cy.visit("/");

    cy.get("a").eq(2).click();

    cy.get("h2").should("exist");
    cy.contains("Overview").should("exist");
    cy.contains("Runtime").should("exist");
    cy.contains("Cast").should("exist");
  });
});
