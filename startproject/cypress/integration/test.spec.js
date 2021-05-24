/// <reference types="cypress" />

describe("test", () => {
    it("test", () => {
        cy.visit("https://samhammer.de");
        cy.get("body").should("be.visible").click({ force: true })
    })
}); 