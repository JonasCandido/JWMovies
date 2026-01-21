/// <reference types="cypress" />

describe("Navigation to item page", () => {
  it("opens movie details page with mocked data", () => {
    cy.visit("/");

    cy.wait("@getMovies");

    cy.get('a').eq(2).click();

    cy.wait("@getDetails");
    cy.wait("@getCredits");
    cy.wait("@getVideos");

    cy.get("h2").should("contain.text", "Integration Movie");

    cy.contains("Overview").should("exist");
    cy.contains("Integration overview").should("be.visible");

    cy.contains("Runtime").should("exist");
    cy.contains("140 minutes").should("be.visible");

    cy.contains("Cast").should("exist");
    cy.contains("Actor 1").should("be.visible");
    cy.contains("Role 1").should("be.visible");
    cy.contains("Actor 2").should("be.visible");
    cy.contains("Role 2").should("be.visible");

    cy.get('iframe[title="Integration Movie"]')
      .should("be.visible")
      .and("have.attr", "src")
      .and("include", "video123");
  });
});
