/// <reference types="cypress" />

describe("Home page", () => {
  it("renders movie rows with mocked movies", () => {
    cy.visit("/");

    cy.contains("JWMovies").should("be.visible");

    cy.contains("Experience Incredible Journeys").should("be.visible");
    cy.contains("Feel the Beat of Your Heart").should("be.visible");
    cy.contains("Worlds in Other Dimension").should("be.visible");

    cy.contains("Integration Movie").should("be.visible");

    cy.get('img[alt="Integration Movie"]')
      .should("be.visible")
      .and("have.attr", "src")
      .and("include", "/test.jpg");

    cy.get('a[href="/1"]').should("exist");
  });
});
