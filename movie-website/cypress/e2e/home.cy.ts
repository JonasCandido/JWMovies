describe("Home page", () => {
  it("renders movie rows", () => {
    cy.visit("/");

    cy.contains("JWMovies").should("be.visible");

    cy.contains("Experience Incredible Journeys").should("be.visible");
    cy.contains("Feel the Beat of Your Heart").should("be.visible");
    cy.contains("Worlds in Other Dimension").should("be.visible");
  });
});
